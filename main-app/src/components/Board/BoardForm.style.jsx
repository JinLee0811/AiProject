import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Spoqa Han Sans Neo';
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #759783;
  font-weight: bold;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  height: 650px;
  width: 800px;
  overflow: auto;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .textarea {
    height: 200px;
    width: 700px;
    padding: 0.5rem;
    border-radius: 3px;
    border: none;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  }
  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    label {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    input {
      padding: 0.5rem;
      border-radius: 3px;
      border: none;
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
      width: 200px;
    }
    .DropBorder {
      width: 400px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #555555;
      font-weight: bold;
      border: 2px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 20px;
      max-width: 500px;
    }
  }

  button[type='submit'] {
    padding: 10px 20px;
    background-color: #759783;
    color: white;
    font-weight: bold;
    margin-bottom: 0;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    :hover {
      background-color: green;
    }
  }
`;
export const CheckBox = styled.select`
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #759783;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 90%;
`;
export const Dropzone = styled.div``;
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 250px;
  margin-bottom: 1rem;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;
