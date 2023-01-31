import SimpleModal from '@/components/Modals/SimpleModal/SimpleModal';
import routes from '@/routes';
import { emailRegex } from '@/utils/checkEmail';
import { pwdRegex } from '@/utils/checkPassword';
import { Default } from '@/utils/mediaQuery';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db';
import { useNavigate } from 'react-router-dom';

import * as S from './styles';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [emailValidation, setEmailValidation] = useState<boolean>(true);
  const [pwdValidation, setPwdValidation] = useState<boolean>(true);
  const [pwdConfirmValidation, setPwdConfirmValidation] =
    useState<boolean>(true);
  const [nicknameValidation, setNicknameValidation] = useState<boolean>(true);

  const { add } = useIndexedDB('user');
  const navigate = useNavigate();

  function handleSubmit() {
    if (
      emailValidation &&
      pwdValidation &&
      pwdConfirmValidation &&
      nicknameValidation
    ) {
      patchSignUp();
    }
  }

  const patchSignUp = async () => {
    try {
      const response = await axios.post('/sign-up', email);
      if (response.status === 200) {
        handleSignUp();
        console.log(response.data.message);
        handleModal();
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        console.log(error.response.data.message);

        /* TODO:  모달창으로 이메일 중복 알림 및 처리*/
      }
    }
  };

  const handleSignUp = () => {
    add({ email: email, password: password, nickname: nickname }).then(
      (event) => {
        console.log('ID Generated: ', event);
        setTimeout(() => navigate(routes.LOGIN), 1000);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const handleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const emailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(emailRegex)) {
      setEmailValidation(true);
    } else {
      setEmailValidation(false);
    }
  };

  const pwdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(pwdRegex)) {
      setPwdValidation(true);
    } else {
      setPwdValidation(false);
    }
  };

  const pwdConfirmInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== password) {
      setPwdConfirmValidation(false);
    } else {
      setPwdConfirmValidation(true);
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.match(pwdRegex)) {
      setPwdValidation(true);
    } else {
      setPwdValidation(false);
    }
  };

  const handleChangePasswordConfirm = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirm(e.target.value);
  };

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (e.target.value.length >= 2 && e.target.value.length <= 8) {
      setNicknameValidation(true);
    } else {
      setNicknameValidation(false);
    }
  };

  return (
    <S.Container>
      {isOpenModal && (
        <SimpleModal onClickToggleModal={handleModal}>
          회원가입이 완료되었습니다! 💖
        </SimpleModal>
      )}
      <Default>
        <S.LeftWrapper>
          <S.CoverImg />
        </S.LeftWrapper>
      </Default>
      <S.RightWrapper>
        <S.Header>
          <Default>
            <S.HeaderWrapper>
              <S.BackBtn>
                <S.BackImg />
                <span>Back</span>
              </S.BackBtn>
              <p>
                <span>I have an account!</span>
                <S.Sspan
                  onClick={() => {
                    navigate(routes.LOGIN);
                  }}
                >
                  Login
                </S.Sspan>
              </p>
            </S.HeaderWrapper>
          </Default>
        </S.Header>

        <S.Content>
          <S.Title>Sign Up</S.Title>

          <S.SignUpForm>
            <label>Email</label>
            <S.InputEmail
              type="text"
              placeholder="Type here"
              onChange={handleChangeEmail}
              onBlur={emailInput}
            ></S.InputEmail>
            <S.Warning>
              <p hidden={emailValidation}>이메일 형식을 확인해주세요.</p>
            </S.Warning>

            <label>Password</label>
            <S.InputPwd
              type="password"
              onChange={handleChangePassword}
              onBlur={pwdInput}
            ></S.InputPwd>
            <S.Warning>
              <p hidden={pwdValidation}>
                영어/숫자/특수문자를 조합하여 8자리 이상 입력해주세요.
              </p>
            </S.Warning>

            <label>Password Confirm</label>
            <S.InputPwd
              type="password"
              onChange={handleChangePasswordConfirm}
              onBlur={pwdConfirmInput}
            ></S.InputPwd>
            <S.Warning>
              <p hidden={pwdConfirmValidation}>
                입력한 비밀번호와 일치하지 않습니다.
              </p>
            </S.Warning>

            <label>Nickname</label>
            <S.InputNickname
              type="text"
              onChange={handleChangeNickname}
            ></S.InputNickname>
            <S.Warning>
              <p hidden={nicknameValidation}>
                2자리 이상, 8자리 이하로 입력해주세요.
              </p>
            </S.Warning>

            <S.SubmitBtn
              type="submit"
              color="gradient"
              radius="circle"
              onClick={handleSubmit}
              width={160}
            >
              Done
            </S.SubmitBtn>
          </S.SignUpForm>
        </S.Content>
      </S.RightWrapper>
    </S.Container>
  );
}
