import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import instance from 'app/instance';
import type { RecommentItemProps } from 'lib/constants/types';

interface Arg {
  recommentKey: number;
  comment: string;
}

const putRecomment = async ({ recommentKey, comment }: Arg) => {
  const { data } = await instance.put<{ result: RecommentItemProps }>(
    `/recomment/${recommentKey}`,
    {
      comment,
    },
  );

  return data.result;
};

const usePutRecomment = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { selectKey } = useParams();
  const queryClient = useQueryClient();

  return useMutation(putRecomment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', Number(selectKey)]);
      setState((prev) => !prev);
    },
  });
};

export default usePutRecomment;
