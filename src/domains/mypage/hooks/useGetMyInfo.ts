import { useQuery } from '@tanstack/react-query';

import instance from 'app/instance';
import type { MyInfo } from 'lib/constants/types';

const getMyInfo = async () => {
  const { data } = await instance.get<{ result: MyInfo }>('/my');

  return data.result;
};

const useGetMyInfo = () => {
  return useQuery(['myInfo'], getMyInfo, { retry: 0 });
};

export default useGetMyInfo;
