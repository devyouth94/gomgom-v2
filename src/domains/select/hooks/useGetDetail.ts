import { useQuery } from '@tanstack/react-query';

import instance from 'app/instance';
import type { DetailItemProps } from 'lib/constants/types';

type Data = {
  msg: string;
  result: DetailItemProps;
};

const getDetail = async (selectKey: number) => {
  const { data } = await instance.get<Data>(`/select/${selectKey}`);

  return data;
};

const useGetDetail = (selectKey: number) => {
  return useQuery(['detail', selectKey], () => getDetail(selectKey));
};

export default useGetDetail;
