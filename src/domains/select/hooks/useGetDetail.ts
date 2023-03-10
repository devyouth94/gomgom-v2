import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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

const useGetDetail = () => {
  const navigate = useNavigate();
  const { selectKey } = useParams();

  return useQuery(['detail', Number(selectKey)], () => getDetail(Number(selectKey)), {
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
