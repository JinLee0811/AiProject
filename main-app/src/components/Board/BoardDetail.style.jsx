import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  background-color: white;
  border-radius: 5px;
  height: 100%;
  padding: 30px;
  margin: 32px;
  color: #555555;
  font-weight: bold;
  .buttons {
    margin-left: 600px;
    button {
      margin-right: 3px;
      padding: 5px 10px;
      background-color: #759783;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 5px;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      :hover {
        background-color: green;
      }
    }
  }
  h1.title {
    font-size: 30px;
    width: 100%;
    margin-left: 150px;
    margin-bottom: 50px;
  }
  .information {
    display: flex;
    margin-left: 130px;
    font-size: 16px;
    color: #759783;
    font-weight: bold;
  }
  p.nickname {
    font-size: 16px;
    margin-bottom: 20px;
  }
  p.time {
    margin-left: 370px;
  }
  h2.content {
    font-size: 17px;
    width: 600px;
    height: 90px;
    margin-top: 40px;
    margin-left: 110px;
  }
  p.comment {
    color: grey;
    font-weight: bold;
    margin-left: 90px;
  }
`;
export const DetailImage = styled.img`
  height: 500px;
  width: 500px;
  margin: 0 auto;
  border-radius: 8px;
  label {
    margin-left: 13px;
  }
`;
export const Like = styled.button``;
