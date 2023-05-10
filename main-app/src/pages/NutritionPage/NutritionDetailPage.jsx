import React from 'react';
import styled from 'styled-components';
import { useAtomValue } from 'jotai';
import { selectedNutritionAtom } from '../../Atoms/NutritionAtom';

const NutritionDetailPage = () => {
  const selectedNutrition = useAtomValue(selectedNutritionAtom);

  return (
    <>
      <Container>
        <ProductImage src={selectedNutrition.image} />

        <ProductDescription>
          <SmallText>CropDoctor</SmallText>
          <CategoryName>
            #{' '}
            {selectedNutrition.categories
              .map((category) => category.name)
              .join('  #')}
          </CategoryName>
          <Title>🌱{selectedNutrition.name}</Title>
          <h4>
            ✔️ {selectedNutrition.short_description}
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
          <ButtonContainer>
            <Button>구매하기</Button>
            <Button>장바구니</Button>
          </ButtonContainer>
        </ProductDescription>
      </Container>
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

const Button = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  background-color: #eee;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

export default NutritionDetailPage;
