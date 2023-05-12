import React, { useState, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useGetNutrition } from '../../API/NutritionApi';
import { useGetCategories } from '../../API/CategoryApi';
import { categoryAtom } from '../../Atoms/CategoryAtom';
import {
  nutritionAtom,
  selectedNutritionAtom,
} from '../../Atoms/NutritionAtom';

const NutritionList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useAtom(categoryAtom);
  const [nutritionList, setNutritionList] = useAtom(nutritionAtom);
  const setSelectedNutrition = useSetAtom(selectedNutritionAtom);

  const { data: fetchedNutrition } = useGetNutrition({
    onError: (error) => console.log(error.message),
  }); // 데이터 get

  const { data: fetchedCategories } = useGetCategories({
    onError: (error) => console.log(error.message),
  }); // 데이터 get

  useEffect(() => {
    if (fetchedNutrition) {
      setNutritionList(fetchedNutrition);
    }
  }, [fetchedNutrition, setNutritionList]);

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories);
    }
  }, [fetchedCategories, setCategories]);

  const filteredNutritions = selectedCategory
    ? nutritionList.filter((nutrition) =>
        nutrition.categories.find(
          (category) => category.id === selectedCategory.id
        )
      )
    : nutritionList;

  return (
    <>
      <Container>
        <CategoryButtons>
          <CategoryButton
            onClick={() => setSelectedCategory(null)}
            active={!selectedCategory}>
            전체
          </CategoryButton>
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              active={selectedCategory && selectedCategory.id === category.id}>
              {category.name}
            </CategoryButton>
          ))}
        </CategoryButtons>
        <ProductsContainer>
          {filteredNutritions.map((nutrition) => (
            <Product key={nutrition.id}>
              <StyledLink to={`/nutrition/detail/${nutrition.id}`}>
                <ProductImage src={nutrition.image} alt={nutrition.name} />
                <ProductName>{nutrition.name}</ProductName>
                <ProductShortText>
                  {nutrition.short_description}
                </ProductShortText>
                <ProductShortText>{nutrition.categories.name}</ProductShortText>
              </StyledLink>
            </Product>
          ))}
        </ProductsContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const CategoryButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 12px;
  margin-bottom: 10px;
`;
const CategoryButton = styled.button`
  margin-right: 8px;
  margin-bottom: 10px;
  height: 32px;
  padding: 0 16px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: ${({ active }) => (active ? '#009A3E' : '#F2F2F2')};
  color: ${({ active }) => (active ? '#FFFFFF' : '#4D4D4D')};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ active }) => (active ? '#009A3E' : '#BDBDBD')};
  }
`;
const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-gap: clamp(10px);
`;

const Product = styled.div`
  margin: 10px;
  padding: 2px;
  border: none;
  background-color: #fff;
`;
const ProductImage = styled.img`
  width: 250px;
  height: 200px;
  border-radius: 10px;
`;

const ProductName = styled.div`
  font-weight: bold;
  margin-top: 7px;
`;

const ProductShortText = styled.div`
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  color: #000;
  flex-direction: column;
  display: flex;
  align-items: center;
  text-decoration: none solid rgb(66, 66, 66);
  color: #424242;
`;

export default NutritionList;
