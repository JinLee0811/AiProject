import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useGetCategories } from '../../API/CategoryApi';

const products = [
  {
    id: 1,
    name: 'Product 1',
    category: 'Category 1',
    imageUrl: 'https://via.placeholder.com/150',
    price: 10,
  },
  {
    id: 2,
    name: 'Product 2',
    category: 'Category 2',
    imageUrl: 'https://via.placeholder.com/150',
    price: 20,
  },
  {
    id: 3,
    name: 'Product 3',
    category: 'Category 3',
    imageUrl: 'https://via.placeholder.com/150',
    price: 30,
  },
  {
    id: 4,
    name: 'Product 4',
    category: 'Category 1',
    imageUrl: 'https://via.placeholder.com/150',
    price: 40,
  },
  {
    id: 5,
    name: 'Product 5',
    category: 'Category 2',
    imageUrl: 'https://via.placeholder.com/150',
    price: 50,
  },
  {
    id: 6,
    name: 'Product 6',
    category: 'Category 3',
    imageUrl: 'https://via.placeholder.com/150',
    price: '영양제와 관련된 성분',
  },
];

function NutritionList() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <Container>
      <CategorySelector
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}>
        <option value=''>전체 조회</option>
        <option value='Category 1'>Category 1</option>
        <option value='Category 2'>Category 2</option>
        <option value='Category 3'>Category 3</option>
      </CategorySelector>
      <ProductsContainer>
        {filteredProducts.map((product) => (
          <Product key={product.id}>
            <StyledLink to={`/products/${product.id}`}>
              <ProductImage src={product.imageUrl} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <ProduceShortText>{product.price}</ProduceShortText>
            </StyledLink>
          </Product>
        ))}
      </ProductsContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  height: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const CategorySelector = styled.select`
  width: 150px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 25px;
`;

const Product = styled.div`
  display: flex;
  margin: 5px;
  flex-direction: column;
  padding: 15px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
`;

const ProductName = styled.div`
  font-weight: bold;
`;

const ProduceShortText = styled.div`
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default NutritionList;
