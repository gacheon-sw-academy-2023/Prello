import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import { modalSelector } from '@/recoil/atom/modalSelector';
import { userSelector } from '@/recoil/atom/userSelector';
import request from '@/utils/api';
import { CreateWorkspaceProps } from '@/utils/types';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import * as S from './CreateWorkspaceWorkspaceModal.style';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const CreateWorkspaceModal = ({
  fetchWorkspaces,
}: CreateWorkspaceProps) => {
  const [modal, setModal] = useRecoilState(modalSelector);
  const [user, setUser] = useRecoilState(userSelector);
  const [errorText, setErrorText] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [inviteBtnStatus, setInviteBtnStatus] = useState<boolean>(true);
  const [emailList, setEmailList] = useState<string[]>([]);

  const handleModal = () => {
    const data = {
      isOpen: !modal.isOpen,
    };
    setModal(data);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeSummary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummary(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
    setInviteBtnStatus(false);
  };

  const handleInvite = () => {
    if (newEmail !== '' && !emailList.includes(newEmail)) {
      setEmailList(emailList.concat(newEmail));
      setInviteBtnStatus(true);
      setNewEmail('');
    }
  };

  const handleDelete = (emailToDelete: string) => () => {
    setEmailList((emails) => emails.filter((email) => email !== emailToDelete));
  };

  const handleCreate = () => {
    if (name.length === 0 || summary.length === 0) {
      setErrorText('?????????????????? ?????? ??? ????????? ??????????????????!');
    } else {
      fetchCreate();
    }
  };

  const fetchCreate = async () => {
    const info = {
      owner: user.email,
      name: name,
      summary: summary,
      memberInfo: emailList,
    };
    await request.post('/api/v1/workspaces', info).then((res) => {
      handleModal();
      fetchWorkspaces();
    });
  };

  return (
    <Modal size="lg" onClickToggleModal={handleModal}>
      <S.MainWrapper>
        <S.colWrapper ratio={75}>
          <S.StyledInput
            type="text"
            value={name}
            placeholder="?????????????????? ????????? ??????????????????."
            onChange={handleChangeName}
            className="main"
            data-testid="workspace-name"
          ></S.StyledInput>
          <S.StyledInput
            type="text"
            value={summary}
            placeholder="????????? ??????????????????."
            onChange={handleChangeSummary}
            className="sub"
            data-testid="workspace-summary"
          ></S.StyledInput>
        </S.colWrapper>
      </S.MainWrapper>
      <S.SubWrapper>
        <S.StyledText>?????? ????????????</S.StyledText>
        <S.StyledText className="sub">
          ????????? ????????? ???????????? ???????????????.
        </S.StyledText>
        <S.InviteWrapper>
          <S.StyledEmailInput
            type="text"
            value={newEmail}
            onChange={handleChangeEmail}
            data-testid="workspace-invite-member"
          ></S.StyledEmailInput>
          <S.InviteBtn onClick={handleInvite} disabled={inviteBtnStatus}>
            ????????????
          </S.InviteBtn>
        </S.InviteWrapper>
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            listStyle: 'none',
            flexWrap: 'wrap',
            p: 0.5,
            m: 0,
          }}
        >
          {emailList.map((data) => {
            return (
              <ListItem key={data}>
                <Chip
                  sx={{ backgroundColor: '#E9F8F9', p: 1 }}
                  label={data}
                  onDelete={handleDelete(data)}
                />
              </ListItem>
            );
          })}
        </Paper>
        <S.BtnWrapper>
          <Button
            width={50}
            radius={'rounded'}
            color={'primary'}
            shadow={true}
            onClick={handleCreate}
          >
            ?????????????????? ??????
          </Button>
          <S.StyledText className="error">{errorText}</S.StyledText>
        </S.BtnWrapper>
      </S.SubWrapper>
    </Modal>
  );
};

export default CreateWorkspaceModal;
