import { serverWithToken, serverWithoutToken } from '../config/AxiosRequest';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const USER_QUERY_KEY = 'userProfile';
export const USER_MUTATION_KEY = 'userProfileMutation';

export const useUser = () => {
  const queryClient = useQueryClient();

  const getUserProfile = async () => {
    const access_token = localStorage.getItem('access_token');

    const { data } = await serverWithToken.get('/user/profile');

    return data;
  };

  const updateUserProfile = async (updatedProfile) => {
    const access_token = localStorage.getItem('access_token');

    const { data } = await serverWithToken.patch(
      '/user/profile',
      updatedProfile
    );

    return data;
  };

  const deleteUserProfile = async () => {
    const access_token = localStorage.getItem('access_token');

    await serverWithToken.delete('/user/profile', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  };

  const { data: userProfile } = useQuery(USER_QUERY_KEY, getUserProfile);

  const userMutation = useMutation(updateUserProfile, {
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(USER_QUERY_KEY, updatedProfile);
    },
  });

  const deleteUser = useMutation(deleteUserProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(USER_QUERY_KEY);
    },
  });

  const updateUserNickname = async (nickname) => {
    const access_token = localStorage.getItem('access_token');

    const { data } = await serverWithToken.patch(
      '/user/profile/nickname',
      { nickname },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    queryClient.setQueryData(USER_QUERY_KEY, data);
  };

  const updateUserProfileImage = async (profileImage) => {
    const access_token = localStorage.getItem('access_token');

    const formData = new FormData();
    formData.append('profileImage', profileImage);

    const { data } = await serverWithToken.patch('/user/profile/image');

    queryClient.setQueryData(USER_QUERY_KEY, data);
  };

  return {
    userProfile,
    updateUserProfile: userMutation.mutate,
    deleteUserProfile: deleteUser.mutate,
    updateUserNickname,
    updateUserProfileImage,
  };
};
