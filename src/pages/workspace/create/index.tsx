import React, { PropsWithChildren, useState } from 'react';
import * as S from './styles';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@/components/Button/Button';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}
interface ChipData {
  key: number;
  label: string;
}
const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function CreateWorkspace({
  onClickToggleModal,
}: PropsWithChildren<ModalDefaultType>) {
  const [name, setName] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [chipData, setChipData] = useState<readonly ChipData[]>([
    { key: 0, label: 'test@gmail.com' },
    { key: 1, label: 'test2@gmail.com' },
    { key: 2, label: 'test3@gmail.com' },
    { key: 3, label: 'test4@gmail.com' },
    { key: 4, label: 'test5@gmail.com' },
  ]);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeSummary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummary(e.target.value);
  };

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key),
    );
  };

  return (
    <S.ModalContainer>
      <S.DialogBox>
        <S.MainWrapper>
          <S.colWrapper ratio={15}>
            <div>임시</div>
          </S.colWrapper>
          <S.colWrapper ratio={75}>
            <S.StyledInput
              type="text"
              value={name}
              placeholder="워크스페이스 이름을 입력해주세요."
              onChange={handleChangeName}
              className="main"
            ></S.StyledInput>
            <S.StyledInput
              type="text"
              value={summary}
              placeholder="설명을 입력해주세요."
              onChange={handleChangeSummary}
              className="sub"
            ></S.StyledInput>
          </S.colWrapper>
          <S.colWrapper ratio={10}>
            <img
              src="assets/images/main/button.png"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();

                if (onClickToggleModal) {
                  onClickToggleModal();
                }
              }}
            ></img>
          </S.colWrapper>
        </S.MainWrapper>
        <S.SubWrapper>
          <S.StyledText>멤버 초대하기</S.StyledText>
          <S.StyledText className="sub">
            초대할 팀원의 이메일을 적어주세요.
          </S.StyledText>
          <S.InviteWrapper>
            <S.StyledEmailInput></S.StyledEmailInput>
            <S.InviteBtn>초대 이메일 전송</S.InviteBtn>
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
            {chipData.map((data) => {
              return (
                <ListItem key={data.key}>
                  <Chip
                    sx={{ backgroundColor: '#E9F8F9', p: 1 }}
                    label={data.label}
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
            >
              워크스페이스 생성
            </Button>
          </S.BtnWrapper>
        </S.SubWrapper>
      </S.DialogBox>
      <S.Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </S.ModalContainer>
  );
}