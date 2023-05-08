import React from 'react';
import styled from 'styled-components';

const ButtonComponent = ({ InputName }) => {
  return <Button>{InputName}</Button>;
};

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4ba888;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  :hover {
    background-color: #759783; //#4ba888
  }
`;

export default ButtonComponent;
