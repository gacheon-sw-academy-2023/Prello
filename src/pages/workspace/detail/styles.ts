import Button from '@/components/Button/Button';
import styled from '@emotion/styled';
type ImageProps = {
  img: string;
  width: string;
  height: string;
};
type ItemProps = {
  center: boolean;
  color: string;
};
type TitleProps = {
  margin: string;
};
export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f6f7;
`;
export const Wrapper = styled.div`
  width: 100%;
  background-color: #f5f6f7;
  display: flex;
  padding-top: 65px;
`;

export const MobileWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: #f5f6f7;
  align-items: center;
  padding-top: 65px;
`;
// 구분선
export const Line = styled.div<TitleProps>`
  width: 100%;
  height: 0.5px;
  margin-left: ${(props) => props.margin};
  background-color: #71717190;
`;

// 왼쪽 바 div
export const LeftContainer = styled.div`
  width: 20%;
  min-height: 100vh;
  padding: 20px 30px;
`;
export const LeftContent = styled.div`
  display: flex;
  width: 100%;
  margin: 15px 0px;
  padding-left: 10px;
  border-radius: 0.5rem;
  &:hover {
    background-color: #d7d7d7;
  }
`;

export const LeftContentNotHover = styled(LeftContent)`
  pointer-events: none;
`;
export const TitleInput = styled.input`
  width: 92%;
  height: fit-content;
  font-size: 20px;
  font-weight: 600;
  font-family: 'LINESeedKR-Bd';
  color: #4f4e4e;
  background-color: #ffe7ee;
  border: none;
  ::placeholder {
    color: #bdbdbd;
  }
`;
export const MembersWrapper = styled.div`
  width: 100%;
  height: 60vh;
  overflow: auto;
  padding-left: 10px;
`;
export const MemberWrapper = styled.div`
  width: 100%;
  display: flex;
  padding-top: 10px;
`;

// 이미지
export const Image = styled.div<ImageProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-size: cover;
  background-image: url(${(props) => props.img});
`;
export const ProfileName = styled.p`
  font-size: 15px;
  font-family: 'LINESeedKR-Rg';
  padding: 13px 10px 7px 10px;
  color: #4f4e4e;
`;

//오른쪽 화면
export const RightContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  padding: 30px;
  margin-left: 250px;
`;
export const MobileRightContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  padding: 30px;
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 30px;
`;

export const WorkspaceImage = styled.div`
  width: 90px;
  height: 80px;
  background-size: cover;
  background-image: url('src/assets/workspace/sample-workspace-image.png');
`;

export const InfoContents = styled.div`
  width: 100%;
  padding-left: 15px;
`;
export const ExplainText = styled.p`
  font-size: 16px;
  font-family: 'LINESeedKR-Rg';
  margin: 20px 10px 7px 0;
  color: #4f4e4e;
`;

// 보드 아이템
export const BoardContainer = styled.div`
  width: 100%;
  padding: 20px 0;
`;
export const Item = styled.div<ItemProps>`
  display: flex;
  align-items: ${(props) => (props.center ? 'center' : 'left')};
  justify-content: ${(props) => (props.center ? 'center' : 'left')};
  flex-direction: column;
  background-color: ${(props) => props.color};
  width: 100%;
  height: 200px;
  border-radius: 0.5rem;
  margin: 10px 0;
  padding: 20px 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;
export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
export const Icon = styled.div<ImageProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-size: cover;
  background-image: url(${(props) => props.img});
  margin: 7px 10px 10px 0;
`;

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 95px;
`;
export const SaveBtn = styled(Button)`
  width: 60px;
`;
