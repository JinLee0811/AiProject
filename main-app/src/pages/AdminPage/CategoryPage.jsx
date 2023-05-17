import { useState, useEffect } from 'react';
import {
  useGetCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '../../API/CategoryApi';
import styled from 'styled-components';

function CategoriesPage() {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

  const { data: fetchedCategories } = useGetCategories({
    onError: (error) => console.log(error.message),
  }); // 데이터 get

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories);
    }
  }, [fetchedCategories, setCategories]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      alert('카테고리 이름을 입력해주세요.');
      return;
    }
    try {
      await createCategory.mutate({ name });
      setName('');
      alert('등록되었습니다.');
    } catch (error) {
      console.error(error);
      alert('카테고리 등록에 실패했습니다.');
    }
  };
  const handleEdit = async (categoryId, categoryIndex) => {
    const categoryName = categories.find(
      (category) => category.id === categoryId
    )?.name;
    const editedName = prompt(
      '수정할 카테고리 이름을 입력하세요',
      categoryName
    );
    if (editedName && editedName !== categoryName) {
      try {
        await updateCategory.mutate({ id: categoryId, name: editedName });
        setCategories((prevCategories) =>
          prevCategories.map((category, index) =>
            index === categoryIndex
              ? { ...category, name: editedName }
              : category
          )
        );
        alert('수정되었습니다.');
      } catch (error) {
        console.error(error);
        alert('카테고리 수정에 실패했습니다.');
      }
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('정말로 삭제하십니까?')) {
      await deleteCategory.mutateAsync(categoryId);
    }
  };

  return (
    <ContainerBox>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormLabel>
            카테고리 등록:
            <FormInput type='text' value={name} onChange={handleNameChange} />
            <Button type='submit'>등록하기</Button>
          </FormLabel>
        </form>
      </FormContainer>
      <CategoryList>
        {categories.map((category, index) => (
          <CategoryItem key={category.id}>
            <CategoryName>{category.name}</CategoryName>
            <div>
              <Button onClick={() => handleEdit(category.id, index)}>
                수정
              </Button>
              <Button onClick={() => handleDelete(category.id)}>삭제</Button>
            </div>
          </CategoryItem>
        ))}
      </CategoryList>
    </ContainerBox>
  );
}

const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const FormContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin: 0 auto;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: 600;
`;

const FormInput = styled.input`
  padding: 5px;
  font-size: 16px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  height: 35px;
  width: 70px;
  margin-left: 5px;
  font-weight: bold;
  text-align: center;
  background-color: #759783;
  font-size: 15px;
  letter-spacing: -0.6px;
  text-decoration: none solid rgb(128, 128, 128);
  vertical-align: middle;
  word-spacing: 0px;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: green;
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
`;

const CategoryItem = styled.li`
  display: flex;
  align-items: center;
  width: 500px;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const CategoryName = styled.span`
  font-size: 16px;
  flex-grow: 1;
`;

export default CategoriesPage;
