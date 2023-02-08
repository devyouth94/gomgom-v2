import { useQuery } from '@tanstack/react-query';

import instance from 'app/instance';
import type { MyInfo } from 'lib/constants/types';
import { userStorage } from 'lib/utils/storage';

const getMyInfo = async () => {
  const { data } = await instance.get<{ result: MyInfo }>('/my');

  return data.result;
};

const useGetMyInfo = () => {
  return useQuery(['myInfo'], getMyInfo, { retry: 0, enabled: !!userStorage.getToken('access') });
};

export default useGetMyInfo;
