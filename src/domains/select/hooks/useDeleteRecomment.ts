import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import instance from 'app/instance';
import type { RecommentItemProps } from 'lib/constants/types';

const deleteRecomment = async (recommentKey: number) => {
  const { data } = await instance.delete<{ result: RecommentItemProps }>(
    `/recomment/${recommentKey}`,
  );

  return data.result;
};

const useDeleteRecomment = () => {
  const { selectKey } = useParams();
  const queryClient = useQueryClient();

  return useMutation(deleteRecomment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', Number(selectKey)]);
    },
  });
};

export default useDeleteRecomment;
