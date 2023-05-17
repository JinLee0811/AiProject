import styled from 'styled-components';

export const CommentContainer = styled.div`
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
  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  form input {
    padding: 12px 25px;
    margin-bottom: 14px;
    width: 700px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
    border: grey;
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
    margin-left: 44px;

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
    margin-left: 680px;
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
    margin-left: 630px;
    background-color: #759783;
    :hover {
      background-color: green;
      color: white;
    }
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

export const HeartIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url(${(
    props //${} 안에 javascript문법 넣는방식 isLiked가 뭐냐에 따라 그림바뀜
  ) => (props.isLiked ? '/red-heart.svg' : '/empty-heart.svg')});
  background-size: cover;
`;

export const RedHeartIcon = () => <HeartIcon isLiked={true} />;
export const EmptyHeartIcon = () => <HeartIcon isLiked={false} />;
export const CommentList = styled.div`
  // width: 800px;
  // height: 100px;
  // padding: 12px;
  // color: rgb(43, 43, 43);
  // box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
  // border: grey;
  // border-radius: 6px;
`;
export const CommentItem = styled.div``;
export const CommentContent = styled.div`
  color: #759783;
  padding: 10px;
  margin-bottom: 8px;
  padding: 12px 25px;
  width: 700px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
  border: grey;
  border-radius: 8px;
`;
export const FirstForm = styled.form`
  margin-bottom: 30px;
`;
export const Nickname = styled.label`
  width: 60px;
  color: #759783;
  span {
    margin-right: 3px;
  }
`;
export const SecondForm = styled.div``;
export const CommentEDU = styled.div`
  margin-bottom: 20px;
  label {
    color: #759783;
    margin-left: 15px;
    font-size: 15px;
  }
  .replyComment {
    margin-left: 65%;
  }
`;
export const ReplyForm = styled.div`
  margin-left: 50px;
  width: 600px;
  input[type='text'] {
    width: 650px;
  }
`;
export const ReplyCommentContent = styled.div`
  color: #759783;
  padding: 10px;
  margin-bottom: 8px;
  padding: 12px 25px;
  width: 650px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
  border: solid green;
  border-radius: 8px;
`;
