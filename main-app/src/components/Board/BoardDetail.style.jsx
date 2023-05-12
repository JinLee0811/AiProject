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
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  height: 100hv;
  overflow: auto;
  margin: 32px;
  font-family: 'Spoqa Han Sans Neo';
  color: #555555;
  font-weight: bold;
  .buttons {
    margin-left: 80%;
    button {
      margin-right: 10px;
      padding: 10px 20px;
      background-color: #759783;
      color: white;
      font-family: 'Spoqa Han Sans Neo';
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
    font-size: 20px;
    width: 800px;
    padding: 12px 25px;
  }
  .information {
    display: flex;
    padding: 0 25px 0px 25px;
    border-bottom: 1px solid rgb(210, 210, 210);
    font-size: 16px;
    color: #759783;
    font-weight: bold;
  }
  p.nickname {
    font-size: 16px;
  }
  p.time {
    margin-left: 700px;
  }
  h2 {
    padding: 12px 25px;
    margin-bottom: 14px;
    width: 800px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }
  h2.content {
    font-size: 16px;
    overflow: auto;
    width: 800px;
    height: 200px;
  }
  h2.image {
    height: 200px;
  }
  p.comment {
    border-bottom: 1px solid rgb(210, 210, 210);
    border-top: 1px solid rgb(210, 210, 210);
    padding: 10px 25px;
    color: #759783;
    font-weight: bold;
  }
`;
export const DetailImage = styled.img`
  height: 180px;
  width: 180px;
  margin: 20px;
`;
