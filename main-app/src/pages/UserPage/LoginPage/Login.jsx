import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Auth } from '../../../API/authApi';
import LogoPng from '../../../components/image/Logo.png';
import { isLoggedInAtom, isAdminAtom } from '../../../Atoms/TokenAtom';

const LoginForm = () => {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const { login, error, setError } = Auth(); // error 상태값과 setError 함수 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login({ email, password });
      setIsLoggedIn(true);
    } catch (error) {
      setError(error); // error 상태값에 에러 메시지 저장
    }
  };

  return (
    <LoginFormContainer>
      <StyledLink to='/'>
        <LogoContainer>
          <LogoImage src={LogoPng} />
          <Logo>CropDoctor</Logo>
        </LogoContainer>
      </StyledLink>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor='email'>이메일:</Label>
        <Input
          type='email'
          id='email'
          name='email'
          value={email}
          placeholder='이메일'
          onChange={handleEmailChange}
        />

        <Label htmlFor='password'>비밀번호:</Label>
        <Input
          type='password'
          id='password'
          name='password'
          placeholder='비밀번호 4자 이상'
          value={password}
          onChange={handlePasswordChange}
        />
        <ErrorDiv>{error && error}</ErrorDiv>
        <Button type='submit'>로그인</Button>
        <LastDiv>
          <CheckboxLabel>
            <input type='checkbox' id='remember-me' name='remember-me' />
            이메일 저장
          </CheckboxLabel>
          <SignupLink href='/signup'>회원가입</SignupLink>
        </LastDiv>
      </Form>
    </LoginFormContainer>
  );
};

const ErrorDiv = styled.div`
  color: red;
`;
const LoginFormContainer = styled.div`
  height: 85vh;
  margin: 0 auto;
  max-width: 400px;
  display: flex;
  font-size: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;
const LogoImage = styled.img`
  height: 55px;
  width: 55px;
  margin-right: 0px;
`;
const Logo = styled.h1`
  font-size: 2.3rem;
  font-weight: bold;
  color: green;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
`;

const Input = styled.input`
  font-size: 17px;
  letter-spacing: -0.6px;
  line-height: 18px;
  text-indent: 18px;
  color: #808080;
  text-decoration: none solid rgb(128, 128, 128);
  background-color: white;
  display: inline-block;
  height: 50px;
  width: 400px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  cursor: text;
`;

const CheckboxLabel = styled.label`
  margin-top: 5px;
  font-weight: 500;
  display: inline;
  align-items: center;
  margin-bottom: 10px;
  font-size: 15px;
  line-height: 22px;
  text-align: left;
  word-spacing: 0px;
  color: #222624;
  height: auto;
  width: auto;
  cursor: pointer;
`;

const Button = styled.button`
  display: inline-block;
  height: 50px;
  width: 400px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0 0;
  background-color: #759783;
  font-size: 15px;
  letter-spacing: -0.6px;
  text-decoration: none solid rgb(128, 128, 128);
  vertical-align: middle;
  word-spacing: 0px;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: green;
  }
`;

const SignupLink = styled.a`
  margin-left: 230px;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
  height: 22px;
  width: 400px;
  color: #808080;
  text-decoration: none solid rgb(77, 77, 77);
  position: relative;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`;

const LastDiv = styled.div`
  font-size: 12px;
  text-align: left;
  height: 22px;
  width: 400px;
  margin: 10px 0 0;
  color: #4d4d4d;
  text-decoration: none solid rgb(77, 77, 77);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default LoginForm;
