import { useState } from 'react';
import styled from 'styled-components';
import { serverWithToken } from '../../config/AxiosRequest';

const PasswordChangeForm = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert('입력하신 두 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (window.confirm('정말 비밀번호를 변경하시겠습니까?')) {
      try {
        const response = await serverWithToken.put('/user/password', {
          password,
          passwordConfirm,
        });
        alert('비밀번호가 성공적으로 변경되었습니다.');
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  return (
    <Wrapper>
      <Title>비밀번호 변경</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor='password'>변경할 비밀번호</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor='passwordConfirm'>변경할 비밀번호 확인</label>
          <input
            type='password'
            id='passwordConfirm'
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
        </FormGroup>
        <Button type='submit'>변경하기</Button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
    font-size: 1rem;
  }

  input {
    width: 300px;
    height: 30px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const Button = styled.button`
  display: inline-block;
  align-items: center;
  margin-top: 10px;
  width: 315px;
  height: 40px;
  background-color: #759783;
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: green;
  }
`;

export default PasswordChangeForm;
