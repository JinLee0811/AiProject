import React from 'react';
import styled from 'styled-components';

const Login = () => {
  return (
    <LoginWrapper>
      <Loginform>
        <h1>로그인</h1>
        <InputWrapper>
          <label>이메일</label>
          <br />
          <input
            type='email'
            // required
            // value={email}
            placeholder='이메일을 입력하세요'
          />
        </InputWrapper>
        <InputWrapper>
          <label>비밀번호</label>
          <br />
          <input
            type='password'
            // required
            // value={password}
            placeholder='비밀번호를 입력하세요'
          />
        </InputWrapper>
        <button>로그인</button>
        <GotoSignup>회원가입</GotoSignup>
      </Loginform>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loginform = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 600px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  button {
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    margin-top: 40px;
  }
`;
const InputWrapper = styled.div``;
const GotoSignup = styled.div`
  color: green;
  margin-top: 20px;
`;

export default Login;
