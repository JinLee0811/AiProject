import styled from 'styled-components';

export const CommentContainer = styled.div`
  margin-left: 50px;
  button {
    padding: 10px 20px;
    background-color: #4ba888;
    color: white;
    font-family: 'Spoqa Han Sans Neo';
    font-weight: bold;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    :hover {
      background-color: #759783;
    }
  }
  label {
    border: none;
    cursor: pointer;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-left: 50px;
  }
  form input {
    padding: 12px 25px;
    margin-bottom: 14px;
    width: 650px;
    border: 1px solid green;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
    border-radius: 8px;
  }
`;
export const Reply = styled.div`
  p {
    padding: 12px 25px;
    margin-bottom: 14px;
    width: 800px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
    border: grey;
    border-radius: 8px;
    background-color: white;
  }
`;
export const ReplyContainer = styled.div``;
export const Comment = styled.div`
  p {
    margin-left: 34px;
    padding: 12px;
    color: rgb(43, 43, 43);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
    border: grey;
    border-radius: 6px;
  }
  .commentText {
  }
`;
export const CommentManage = styled.div`
  .write {
    margin-left: 630px;
    background-color: #759783;
    :hover {
      background-color: green;
      color: white;
    }
  }
`;
export const ReplyCommentManage = styled.div`
  .replyWrite {
    width: 65px;
    margin-left: 600px;
    background-color: #759783;
  }
`;
export const CommentEdit = styled.div`
  display: flex;
  button {
    background-color: white;
    color: grey;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 11px;
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    :hover {
      background-color: green;
      color: white;
    }
  }
`;

export const CommentItem = styled.div``;
export const CommentContent = styled.div`
  color: #575555;
  font-weight: 300px;
  margin-top: 8px;
  margin-bottom: 1px;
  padding: 12px 25px;
  width: 700px;
  border: 1px solid #d8d8d8;
  border-radius: 8px;
`;
export const FirstForm = styled.form`
  margin-bottom: 5px;
`;
export const Nickname = styled.span`
  width: 400px;
  margin-bottom: 30px;
  color: #62b585;
  span {
    margin-right: 3px;
  }
`;
export const Nickname1 = styled.span`
  width: 400px;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #328253;
  span {
    margin-right: 3px;
  }
`;
export const SecondForm = styled.div``;
export const CommentEDU = styled.div`
  margin-bottom: 20px;
  label {
    color: #8f8e8e;
    margin-left: 5px;
    font-size: 15px;
    :hover {
      color: #759783;
    }
  }
  .replyComment {
    margin-left: 65%;
  }
`;
export const ReplyForm = styled.div`
  margin-left: 5px;
  width: 600px;
  input[type='text'] {
    width: 650px;
  }
  input[value='${(props) => props.replyinput}'] {
    margin-left: 10px;
    box-shadow: 0 0 2px rgba(0, 128, 0, 0.4);
  }
`;
export const ReplyCommentContent = styled.div`
  color: #759783;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 8px;
  padding: 12px 25px;
  width: 650px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
  border: grey;
  border-radius: 8px;
`;
export const Time = styled.span`
  width: 400px;
  font-size: 11px;
  margin-left: 10px;
  margin-bottom: 30px;
  color: #aca4a4;
  span {
    margin-right: 3px;
  }
`;
