import React from 'react';
import styled from 'styled-components';

const SignUpPage = () => {
  return (
    <>
      <SignUpWrapper>
        <SignUpForm>
          <h1>회원가입</h1>
          <label>이름</label>
          <InputWrapper>
            <input
              type='name'
              // required
              // valued={name}
              placeholder='이름을 입력해주세요'
            />
          </InputWrapper>
          <label>닉네임</label>
          <InputWrapper>
            <input
              type='nickname'
              // required
              // value={nickname}
              placeholder='닉네임을 입력해주세요'
            />
          </InputWrapper>
          <label>이메일</label>
          <InputWrapper>
            <input
              type='email'
              // required
              // value={email}
              placeholder='이메일을 입력해주세요'
            />
          </InputWrapper>
          <label>비밀번호</label>
          <InputWrapper>
            <input
              type='password'
              // required
              // minLength="8"
              // value={password}
              placeholder='비밀번호를 입력해주세요(8자 이상)'
            />
          </InputWrapper>
          <label>비밀번호 확인</label>
          <InputWrapper>
            <input
              type='password'
              // required
              // minLength="8"
              // value={password}
              // value={passwordConfirm}
              placeholder='비밀번호를 입력해주세요(8자 이상)'
              // ref={pwRef}
            />
          </InputWrapper>
          <button>회원가입</button>
          <GotoLogin>
            <a>이미 계정이 있나요?</a>
          </GotoLogin>
        </SignUpForm>
      </SignUpWrapper>
    </>
  );
};

const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SignUpForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 600px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  label {
    text-align: left;
  }
  button {
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    margin-top: 80px;
  }
`;
const InputWrapper = styled.div``;
const GotoLogin = styled.div`
  color: green;
  margin-top: 20px;
  font-size: 15px;
`;

export default SignUpPage;
