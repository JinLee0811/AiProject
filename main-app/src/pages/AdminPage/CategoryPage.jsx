import { useState } from 'react';
import {
  useGetCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '../../API/CategoryApi';
import styled from 'styled-components';

function CategoriesPage() {
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  const { data: categories, isLoading } = useGetCategories();

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingId) {
      await updateCategory.mutateAsync(editingId, { name });
      setEditingId(null);
    } else {
      await createCategory.mutateAsync({ name });
      setName('');
    }
  };

  const handleEdit = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    setName(category.name);
    setEditingId(category.id);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('정말로 삭제하십니까?')) {
      await deleteCategory.mutateAsync(categoryId);
    }
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormLabel>
            카테고리 등록:
            <FormInput type='text' value={name} onChange={handleNameChange} />
            <Button type='submit'>{editingId ? 'Save' : '등록'}</Button>
          </FormLabel>
        </form>
      </FormContainer>
      <CategoryList>
        {/* {categories.map((category) => (
          <CategoryItem key={category.id}>
            <CategoryName>{category.name}</CategoryName>
            <div>
              <Button onClick={() => handleEdit(category.id)}>수정</Button>
              <Button onClick={() => handleDelete(category.id)}>삭제</Button>
            </div>
          </CategoryItem>
        ))} */}
        <CategoryItem>
          <CategoryName>영양제</CategoryName>
          <div>
            <Button>수정</Button>
            <Button>삭제</Button>
          </div>
        </CategoryItem>
        <CategoryItem>
          <CategoryName>독극물</CategoryName>
          <div>
            <Button>수정</Button>
            <Button>삭제</Button>
          </div>
        </CategoryItem>
      </CategoryList>
    </div>
  );
}

const FormContainer = styled.div`
  margin-bottom: 20px;
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
  margin: 0;
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
