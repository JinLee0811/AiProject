import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #767676;
  animation: ${spin} 1s ease-in-out infinite;
`;

export default Loading;
