import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import instance from 'app/instance';
import type { CommentItemProps } from 'lib/constants/types';

type Data = {
  result: CommentItemProps[];
};

const getComment = async (selectKey: number) => {
  const { data } = await instance.get<Data>(`/comment/${selectKey}`);

  return data.result;
};

const useGetComment = () => {
  const navigate = useNavigate();
  const { selectKey } = useParams();

  return useQuery(['comment', Number(selectKey)], () => getComment(Number(selectKey)), {
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

export default useGetComment;
