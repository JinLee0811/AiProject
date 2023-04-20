import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const BoardDetail = () => {
  const location = useLocation();
  const { title, content, like, image, nickname, views } = location.state;
  return (
    <Container>
      <FormContainer>
        <h1 className="title">{title}</h1>
        <h2 className="content">{content}</h2>
        <h2 className="image">{image}</h2>
        <p className="nickname">{nickname}</p>
        <Section>
          <p className="views">{views}</p>
          <p className="like">{like}</p>
        </Section>
      </FormContainer>
    </Container>
  );
};

export default BoardDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const FormContainer = styled.div`
display: flex;
flex-direction: column;
background-color: #f5fffa;
padding: 2rem;
border-radius: 5px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
height: 600px;

  h1.title {
    width: 200px;
    padding: 12px 25px;
  }
  h2.content {
    width: 800px;
    height: 200px;
    padding: 12px 25px;
    margin-bottom: 14px;
    width: 800px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }
  h2.image {
    height: 300px;
    padding: 12px 25px;
    margin-bottom: 14px;
    width: 800px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }
  p.nickname {
    width:45px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;
const Section = styled.div`
  display: flex;
  }
  p.views {
    padding: 0 50px 0 0;
    margin-right: 25px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  p.like {
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
`;
