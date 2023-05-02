import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { atom, useAtom } from 'jotai';

export const nutritionAtom = atom([]);

// GET Hook
export const useGetNutrition = () => {
  return useQuery('nutrition', async () => {
    const { data } = await axios.get('/admin/nutrition');
    return data;
  });
};

// POST Hook
export const useCreateNutrition = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newNutrition) => {
      const { data } = await axios.post('/admin/nutrition', newNutrition);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('nutrition');
      },
    }
  );
};

// DELETE Hook
export const useDeleteNutrition = () => {
  const queryClient = useQueryClient();
  const [nutrition, setNutrition] = useAtom(nutritionAtom);

  const deleteNutritionMutation = useMutation(
    async (id) => {
      const { data } = await axios.delete(`/admin/nutrition/${id}`);
      return data;
    },
    {
      onSuccess: (data, variables) => {
        setNutrition(
          nutrition.map((nutri) => {
            if (nutri.id === variables[0]) {
              return {
                ...nutri,
                deletedAt: new Date(),
              };
            }
            return nutri;
          })
        );
        queryClient.invalidateQueries('nutrition');
        alert(data.message);
      },
    }
  );

  return deleteNutritionMutation;
};
