import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SERVER } from '../../API/AxiosApi';

const NutritionList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState(null);
  const [nutritions, setNutritions] = useState(null);

  // Fetch categories and nutritions on component mount
  useEffect(() => {
    async function fetchCategories() {
      const { data } = await SERVER.get('/tonics/categories');
      setCategories(data);
    }

    async function fetchNutritions() {
      const { data } = await SERVER.get('/tonics');
      setNutritions(data);
    }

    fetchCategories();
    fetchNutritions();
  }, []);

  const filteredNutritions = selectedCategory
    ? nutritions?.filter((nutrition) => nutrition.category === selectedCategory)
    : nutritions;

  return (
    <Container>
      <CategorySelector
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}>
        <option value=''>전체 조회</option>
        {categories &&
          categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
      </CategorySelector>
      <ProductsContainer>
        {filteredNutritions?.map((nutrition) => (
          <Product key={nutrition.id}>
            <StyledLink to={`/products/${nutrition.id}`}>
              <ProductImage src={nutrition.imageUrl} alt={nutrition.name} />
              <ProductName>{nutrition.name}</ProductName>
              <ProduceShortText>{nutrition.description}</ProduceShortText>
            </StyledLink>
          </Product>
        ))}
      </ProductsContainer>
    </Container>
  );
};

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
