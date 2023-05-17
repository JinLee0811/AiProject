import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Spoqa Han Sans Neo';
  color: #555555;
  .buttons {
    display: flex;
    margin-top: 25px;
    margin-left: 320px;
    button {
      margin-right: 10px;
    }
  }
  button {
    padding: 10px 20px;
    background-color: #759783;
    color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-family: 'Spoqa Han Sans Neo';
    font-weight: bold;
    :hover {
      background-color: green;
    }
  }
  .banner {
    width: 850px;
    margin-left: 30px;
  }
`;
export const BannerImage = styled.img`
  width: 600px;
  height: 250px;
  margin-top: 10px;
  margin-left: 30px;
  border-radius: 5px;
`;
export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  margin-top: 10px;
  font-weight: bold;
  p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 10px;
  }
  .time {
    font-size: 13px;
    margin-left: 90%;
    margin-bottom: 0px;
    margin-top: 0px;
  }
  li {
    padding: 20px 25px;
    margin-bottom: 30px;
    width: 500px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }
  .comment {
    font-size: 13px;
    color: #759783;
    font-weight: bold;
  }
  .Detail {
    width: 100px;
    margin-left: auto;
  }
  .image {
    font-size: 30px;
  }
  .nickname {
    font-size: 13px;
    color: #759783;
    margin-bottom: 0;
  }
`;
export const Infor = styled.div`
  display: flex;
  .material-symbols-outlined {
    color: #759783;
  }
`;
export const ListImage = styled.img`
  display: flex;
  width: 400px;
  height: 350px;
  margin: 0 auto;
`;
