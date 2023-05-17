import React from 'react';
import styled from 'styled-components';
import { useGetTonicDetail } from '../../API/NutritionApi';
import { useParams } from 'react-router-dom';

const NutritionDetailPage = () => {
  const { tonicId } = useParams();

  const { data: tonic } = useGetTonicDetail(tonicId, {
    onError: (error) => console.log(error.message),
  });
  console.log(tonic);

  return (
    <>
      {tonic && (
        <Container>
          <ProductImage src={tonic.image} />
          <ProductDescription>
            <SmallText>CropDoctor</SmallText>
            <CategoryName>
              # {tonic.categories.map((category) => category.name).join('  #')}
            </CategoryName>
            <Title>🌱{tonic.name}</Title>
            <h4>
              ✔️ {tonic.short_description}
              <br />
              ✔️ 혜택가 : 18,180원
              <br />
              ✔️ 브랜드 : 유일
              <br />
              ✔️ 제조사 : 유일
              <br />
              ✔️ 규격 : 500ml
              <br />
            </h4>
            <Banner src='https://cdn.shopify.com/s/files/1/0047/9730/0847/files/nurserylive-app-home-page-banner-plants-v3_9a4542b8-e6b2-4c88-8c5a-0dc0993fac5f_670x400.jpg?v=1636743230' />
          </ProductDescription>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  height: 70vh;
  margin: 10px;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 30px;
`;

const ProductImage = styled.img`
  width: 500px;
  height: 500px;
  margin-right: 20px;
`;

const CategoryName = styled.div`
  font-size: 17px;
  padding-bottom: 5px;
  font-weight: bold;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
`;

const ProductDescription = styled.div`
  display: flex;
  width: 300px;
  height: 400px;
  flex-direction: column;
  margin-left: 30px;
  padding: 30px;
  border: 1px solid black;
`;

const SmallText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: green;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 30px;
`;

const Banner = styled.img`
  width: 300px;
  height: 100px;
  border: none;
  border-radius: 5px;
  background-color: #eee;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

export default NutritionDetailPage;
