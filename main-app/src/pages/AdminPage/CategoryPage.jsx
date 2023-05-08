import { useState } from 'react';
import {
  useGetCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '../../API/CategoryApi';

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type='text' value={name} onChange={handleNameChange} />
        </label>
        <button type='submit'>{editingId ? 'Save' : 'Create'}</button>
      </form>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => handleEdit(category.id)}>Edit</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;
