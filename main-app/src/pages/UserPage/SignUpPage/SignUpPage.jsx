import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoPng from '../../../components/image/Logo.png';
import { serverWithoutToken } from '../../../config/AxiosRequest';
import { useMutation } from 'react-query';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  function emailCheck(email) {
    const regex = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const validateForm = ({ nickname, email, password, passwordConfirm }) => {
    if (emailCheck(email) === false) {
      return '이메일 형식이 올바르지 않습니다.';
    }
    if (nickname.length < 2) {
      return '두글자 이상의 닉네임을 설정해주세요.';
    }
    if (password.length < 4) {
      return '비밀번호는 4글자 이상이어야합니다.';
    }
    if (password !== passwordConfirm) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return true;
  };

  // mutation 써서 post 하기
  const signUpMutation = useMutation(
    (userData) => serverWithoutToken.post('/user/signUp', userData),
    {
      onSuccess: () => {
        navigate('/login');
        alert('회원가입에 성공했습니다!');
      },
      onError: (error) => {
        console.log(error);
        alert(error.response.data.message);
      },
    }
  );

  // 벨리데이션 후 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    const validated = validateForm(inputs);
    if (typeof validated === 'string') {
      alert(validated);
      return;
    }
    signUpMutation.mutate(inputs);
  };

  return (
    <Container>
      <StyledLink to='/'>
        <LogoContainer>
          <LogoImage src={LogoPng} />
          <Logo>CropDoctor</Logo>
          <Logo1>회원가입</Logo1>
        </LogoContainer>
      </StyledLink>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor='email'>이메일</Label>
        <Input
          type='email'
          name='email'
          value={inputs.email}
          placeholder='이메일'
          onChange={handleChange}
          required
        />

        <Label htmlFor='nickname'>닉네임</Label>
        <Input
          type='text'
          name='nickname'
          value={inputs.nickname}
          placeholder='별명을 정해보세요'
          onChange={handleChange}
          required
        />
        <Label htmlFor='password'>비밀번호</Label>
        <Input
          type='password'
          name='password'
          value={inputs.password}
          onChange={handleChange}
          placeholder='비밀번호'
          required
        />
        <Input
          type='password'
          name='passwordConfirm'
          value={inputs.passwordConfirm}
          placeholder='비밀번호 확인'
          onChange={handleChange}
          required
        />
        <LastDiv>
          <CheckboxLabel>
            <input
              type='checkbox'
              id='remember-me'
              name='remember-me'
              // checked={rememberMe}
              // onChange={handleRememberMeChange}
            />
            작물을 사랑하시나요?
          </CheckboxLabel>
          <SignupLink href='/login'>이미 아이디가 있다면?</SignupLink>
        </LastDiv>
        <Button type='submit'>회원가입 완료</Button>
      </Form>
    </Container>
  );
};

// 스타일을 적용할 컴포넌트를 정의합니다.
const Container = styled.div`
  height: 95vh;
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
  margin-bottom: 15px;
`;
const LogoImage = styled.img`
  height: 55px;
  width: 55px;
  margin-right: 0px;
  margin-left: 0px;
`;
const Logo = styled.h1`
  font-size: 2.3rem;
  font-weight: bold;
  color: green;
  margin: 0;
`;
const Logo1 = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: -0.9px;
  text-indent: 18px;
  color: #759683;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Label = styled.label`
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
`;

const Input = styled.input`
  font-size: 15px;
  font-weight: 400;
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
const LastDiv = styled.div`
  font-size: 12px;
  text-align: left;
  height: 22px;
  width: 400px;
  margin-bottom: 10px;
  color: #4d4d4d;
  text-decoration: none solid rgb(77, 77, 77);
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
  margin-left: 100px;
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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default SignUpForm;
