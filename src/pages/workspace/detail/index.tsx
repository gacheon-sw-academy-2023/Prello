import { MobileHeader } from '@/components/MobileHeader/MobileHeader';
import InviteModal from '@/components/Modals/InviteModal/InviteModal';
import SideBar from '@/components/SideBar/SideBar';
import { SubHeader } from '@/components/SubHeader/SubHeader';
import { SubTitle } from '@/components/SubTitle/SubTitle.styles';
import WorkspaceImg from '@/components/WorkspaceImg/WorkspaceImg';
import Inform from '@/pages/util';
import { modalSelector } from '@/recoil/atom/modalSelector';
import { Default, Mobile } from '@/utils/mediaQuery';
import { IWorkspace } from '@/utils/types';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import DetailSkeleton from './skeleton';
import * as S from './styles';

interface IBoard {
  id: number;
  name: string;
  workspaceId: number;
}

export default function WorkspaceDetail() {
  const navigate = useNavigate();
  const { workspaceId } = useParams() as { workspaceId: string };
  const [modal, setModal] = useRecoilState(modalSelector);
  const [workspace, setWorkpsace] = useState<IWorkspace>();
  const [workspaceName, setWorkspaceName] = useState<string>('');
  const [workspaceSummary, setWorkspaceSummary] = useState<string>('');
  const [isTitleExsit, setIsTitleExsit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [newItem, setNewItem] = useState<boolean>(false);
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleModal = () => {
    const data = {
      isOpen: !modal.isOpen,
    };
    setModal(data);
  };

  const handleNavigate = (param: string) => {
    navigate(`/workspace-setting/${param}`);
  };
  const handleCreate = () => {
    setNewItem(true);
  };

  const fetchCreate = async () => {
    let info = {
      workspaceId: workspaceId,
      name: title,
    };
    if (title.length > 0) {
      try {
        const response = await axios.post('/board/create', info);
        if (response.status === 200) {
          console.log('저장완료', info);
        }
      } catch (error) {
        setError(true);
        throw error;
      }
      setTitle('');
      setNewItem(false);
      fetchBoardList();
    }
  };
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.length > 0) {
      setIsTitleExsit(true);
    } else {
      setIsTitleExsit(false);
    }
  };
  const fetchWorkspaceInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/workspace/detail', {
        params: {
          workspaceId: workspaceId,
        },
      });
      if (response.status === 200) {
        setWorkspaceName(response.data.name);
        setWorkspaceSummary(response.data.summary);
        setWorkpsace(response.data);
      }
    } catch (error) {
      setError(true);
      throw error;
    }
    setLoading(false);
  };
  const fetchBoardList = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/board/list', {
        params: {
          workspaceId: workspaceId,
        },
      });
      if (response.status === 200) {
        setBoards(response.data);
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkspaceInfo();
    fetchBoardList();
  }, []);

  if (error)
    return (
      <Inform message="알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요!"></Inform>
    );

  return (
    <S.Container>
      <Default>
        <SubHeader
          divider={true}
          children="Workspace"
          profileImg="/assets/authorization/pimfy_profile.png"
        />
      </Default>
      <Mobile>
        <MobileHeader profileImg="/assets/authorization/pimfy_profile.png" />
      </Mobile>
      {modal.isOpen && (
        <InviteModal
          workspaceId={workspaceId}
          fetchWorkspaces={fetchWorkspaceInfo}
        ></InviteModal>
      )}

      <S.Wrapper>
        <SideBar
          memberInfo={workspace?.memberInfo}
          onModal={handleModal}
          onNavigate={() => handleNavigate(workspaceId)}
        />
        {loading ? (
          <DetailSkeleton />
        ) : (
          <S.RightContainer>
            <S.InfoContainer>
              <WorkspaceImg
                radius="none"
                image="/assets/authorization/pimfy_profile.png"
              />
              <S.InfoContents>
                <SubTitle size="md">{workspaceName}</SubTitle>
                <S.ExplainText>{workspaceSummary}</S.ExplainText>
              </S.InfoContents>
            </S.InfoContainer>
            <S.Line margin="0"></S.Line>
            <S.BoardContainer>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                  <S.Item
                    center={true}
                    color={'#fffcff'}
                    onClick={handleCreate}
                  >
                    <S.Image
                      width={'50px'}
                      height={'50px'}
                      img={'/assets/workspace/sample-add-icon.png'}
                    ></S.Image>
                  </S.Item>
                </Grid>
                {boards.map((board) => (
                  <Grid item xs={12} sm={6} md={4} key={board.id}>
                    <S.Item center={false} color={'#ffe7ee'}>
                      <S.TitleInput
                        value={board.name}
                        disabled={true}
                      ></S.TitleInput>
                    </S.Item>
                  </Grid>
                ))}
                {newItem && (
                  <Grid item xs={12} sm={6} md={4}>
                    <S.Item center={false} color={'#ffe7ee'}>
                      <S.TitleInput
                        placeholder="보드 이름을 입력해주세요"
                        defaultValue={title}
                        onChange={handleChangeTitle}
                      ></S.TitleInput>
                      <S.BtnWrapper>
                        <S.SaveBtn
                          color="primary"
                          onClick={fetchCreate}
                          disable={!isTitleExsit}
                        >
                          생성하기
                        </S.SaveBtn>
                      </S.BtnWrapper>
                    </S.Item>
                  </Grid>
                )}
              </Grid>
            </S.BoardContainer>
          </S.RightContainer>
        )}
      </S.Wrapper>
    </S.Container>
  );
}
