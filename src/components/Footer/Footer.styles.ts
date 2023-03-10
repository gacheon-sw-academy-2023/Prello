import styled from '@emotion/styled';
import { WrapperProps, FooterImageProps } from './Footer.types';

export const FooterContainer = styled.div`
  background-color: rgba(252, 164, 190, 0.25);
`;

export const ColWrapper = styled.div<WrapperProps>`
  display: flex;
  height: ${(props) => props.ratio}%;
  margin-left: 5%;
`;

export const RowWrapper = styled.div<WrapperProps>`
  display: flex;
  width: ${(props) => props.ratio}%;
  height: 100%;

  h1 {
    margin-top: 30px;
    font-size: 30px;
    color: black;
    font-family: 'Rubik Bubbles', cursive;
  }

  span {
    font-size: 14px;
    padding-right: 30px;
    font-family: 'LINESeedKR-Rg';
  }
`;

export const MRowWrapper = styled(RowWrapper)`
  display: inline-block;
  justify-content: center;
  text-align: center;
  align-items: center;

  h1 {
    font-size: 20px;
    color: black;
    font-family: 'Rubik Bubbles', cursive;
    margin-bottom: 20px;
  }
`;

export const CopyrightWrapper = styled(RowWrapper)`
  align-items: center;
  margin-top: 5%;
  margin-bottom: 30px;
`;

export const MCopyrightWrapper = styled(CopyrightWrapper)`
  justify-content: space-between;
  text-align: center;
  width: fit-content;
  margin: auto;
  padding-top: 30px;
`;

export const TextWrapper = styled(RowWrapper)`
  display: inline-block;
  margin-right: 5%;
  width: fit-content;

  h2 {
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 700;
    font-family: 'LINESeedKR-Bd';
  }

  p {
    margin-top: 5px;
    font-family: 'LINESeedKR-Rg';
  }
`;

export const ImageWrapper = styled(RowWrapper)`
  justify-content: space-between;
  align-items: center;
  margin-left: 15%;
  /* margin-right: 5%; */
  margin-top: 5%;
`;

export const FooterImage = styled.img<FooterImageProps>`
  width: 20px;
  height: 20px;
  margin-right: 30px;
  content: url(${(props) => props.img});
`;
