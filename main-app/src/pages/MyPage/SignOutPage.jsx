import { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useDeleteUser } from '../../API/UserApi';
import { Auth } from '../../API/authApi';
const WithdrawForm = () => {
  const [password, setPassword] = useState('');
  const locate = useLocation();
  const { logout, error } = Auth();
  const { mutate: deleteUser } = useDeleteUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!window.confirm('정말 회원 탈퇴하시겠습니까?')) {
      return;
    }

    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const result = await deleteUser(password);
      if (result.success) {
        alert('이용해주셔서 감사합니다!');
      } else {
        alert(result.message || '회원 탈퇴에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('회원 탈퇴에 실패했습니다.');
    }
  };
  return (
    <Wrapper>
      <Title>회원 탈퇴</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type='submit'>탈퇴하기</Button>
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
  margin-bottom: 20px;

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
  margin-top: 20px;
  width: 200px;
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

export default WithdrawForm;
