import { useState } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

const App = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Dropzone onDrop={handleDrop} accept='image/*' multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <FileUploader {...getRootProps()}>
              <input {...getInputProps()} />
              {file ? (
                <Image src={URL.createObjectURL(file)} alt='uploaded file' />
              ) : (
                'Drag and drop or click to select file'
              )}
            </FileUploader>
          )}
        </Dropzone>
        <Input type='submit' value='Predict' disabled={!file} />
      </form>
      <Result>{result}</Result>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const Result = styled.div`
  margin: 20px;
  font-size: 18px;
  background-color: aliceblue;
`;

const FileUploader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  border: 2px dashed #2ecc71;
  border-radius: 5px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

export default App;
