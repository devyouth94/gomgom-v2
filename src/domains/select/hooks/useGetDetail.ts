import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import instance from 'app/instance';
import type { DetailItemProps } from 'lib/constants/types';
import { useNavigate } from 'react-router-dom';

type Data = {
  msg: string;
  result: DetailItemProps;
};

const getDetail = async (selectKey: number) => {
  const { data } = await instance.get<Data>(`/select/${selectKey}`);

  return data;
};

const useGetDetail = (selectKey: number) => {
  const navigate = useNavigate();

  return useQuery(['detail', selectKey], () => getDetail(selectKey), {
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data as { errMsg?: string }).errMsg;
        if (message?.includes('존재하지')) {
          navigate('/select', { replace: true });
        }
      }
    },
  });
};

export default useGetDetail;
