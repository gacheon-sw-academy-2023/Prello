import SignUp from '@/pages/authorization/sign-up';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

describe('SignUp Test', () => {
  it('Rendering Test', () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <SignUp></SignUp>
        </RecoilRoot>
      </BrowserRouter>,
    );

    const email = screen.getByTestId('email');
    expect(email).toBeInTheDocument();
    expect(email).toHaveAttribute('placeholder', 'Type here');

    const password = screen.getByTestId('password');
    expect(password).toBeInTheDocument();
    expect(password).toHaveAttribute('placeholder', 'Type here');

    const passwordConfirm = screen.getByTestId('passwordConfirm');
    expect(passwordConfirm).toBeInTheDocument();
    expect(passwordConfirm).toHaveAttribute('placeholder', 'Type here');

    const nickname = screen.getByTestId('nickname');
    expect(nickname).toBeInTheDocument();
    expect(nickname).toHaveAttribute('placeholder', 'Type here');

    const submit = screen.getByTestId('submit');
    expect(submit).toBeInTheDocument();
  });

  it('Input Test', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <RecoilRoot>
          <SignUp></SignUp>
        </RecoilRoot>
      </BrowserRouter>,
    );

    const email = screen.getByTestId('email');
    await user.type(email, 'test@gmail.com');
    expect((email as HTMLInputElement).value).toBe('test@gmail.com');

    const password = screen.getByTestId('password');
    await user.type(password, 'Qwer1234!');
    expect((password as HTMLInputElement).value).toBe('Qwer1234!');

    const passwordConfirm = screen.getByTestId('passwordConfirm');
    await user.type(passwordConfirm, 'Qwer1234!');
    expect((passwordConfirm as HTMLInputElement).value).toBe('Qwer1234!');

    const nickname = screen.getByTestId('nickname');
    await user.type(nickname, 'pimfy');
    expect((nickname as HTMLInputElement).value).toBe('pimfy');
  });

  it('Button Enable Test', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <RecoilRoot>
          <SignUp></SignUp>
        </RecoilRoot>
      </BrowserRouter>,
    );

    const email = screen.getByTestId('email');
    const password = screen.getByTestId('password');
    const passwordConfirm = screen.getByTestId('passwordConfirm');
    const nickname = screen.getByTestId('nickname');
    const submit = screen.getByTestId('submit');

    await user.type(email, 'test@gmail.com');
    await user.type(password, 'Qwer1234!');
    await user.type(passwordConfirm, 'Qwer1234!');
    await user.type(nickname, 'pimfy');

    expect(submit).toBeEnabled();
  });

  it('Button Disable Test', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <RecoilRoot>
          <SignUp></SignUp>
        </RecoilRoot>
      </BrowserRouter>,
    );

    const email = screen.getByTestId('email');
    const password = screen.getByTestId('password');
    const passwordConfirm = screen.getByTestId('passwordConfirm');
    const nickname = screen.getByTestId('nickname');
    const submit = screen.getByTestId('submit');

    expect(submit).toBeDisabled();

    await user.type(email, 'test@gmail.com');
    await user.type(password, 'Qwer1234!');
    await user.type(passwordConfirm, 'Qwer1234!');
    await user.type(nickname, 'pimfy');

    await user.clear(email);
    expect(submit).toBeDisabled();

    await user.type(email, 'test@gmail.com');
    await user.clear(password);
    expect(submit).toBeDisabled();

    await user.type(password, 'Qwer1234!');
    await user.clear(passwordConfirm);
    expect(submit).toBeDisabled();

    await user.type(passwordConfirm, 'Qwer1234!');
    await user.clear(nickname);
    expect(submit).toBeDisabled();
  });

  it('Button Click Test', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <RecoilRoot>
          <SignUp></SignUp>
        </RecoilRoot>
      </BrowserRouter>,
    );

    const email = screen.getByTestId('email');
    const password = screen.getByTestId('password');
    const passwordConfirm = screen.getByTestId('passwordConfirm');
    const nickname = screen.getByTestId('nickname');
    const submit = screen.getByTestId('submit');

    await user.type(email, 'test@gmail.com');
    await user.type(password, 'Qwer1234!');
    await user.type(passwordConfirm, 'Qwer1234!');
    await user.type(nickname, 'pimfy');

    user.click(submit);
  });
});
