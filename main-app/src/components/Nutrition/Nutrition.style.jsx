import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Spoqa Han Sans Neo';
  color: #555555;
`;
export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1200px;
  margin-top: 10px;
  font-weight: bold;
  .Detail {
    width: 80px;
    padding: 10px 10px;
    background-color: #4ba888;
    color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-family: 'Spoqa Han Sans Neo';
    font-weight: bold;
    :hover {
      background-color: #759783;
    }
  }
  p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 10px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 1200px;
  }
  li {
    padding: 20px 25px;
    margin: 22px;
    width: 300px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
    border-radius: 8px;
    border: 1.5px solid #4ba888;
    display: flex;
    flex-direction: column;
  }
  .image {
    font-size: 30px;
  }
`;
