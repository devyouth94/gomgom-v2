import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import instance from 'app/instance';
import type { CommentItemProps } from 'lib/constants/types';

interface Arg {
  commentKey: number;
  comment: string;
}

const postRecomment = async ({ commentKey, comment }: Arg) => {
  const { data } = await instance.post<{ result: CommentItemProps }>(`/recomment/${commentKey}`, {
    comment,
  });

  return data.result;
};

const usePostRecomment = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { selectKey } = useParams();
  const queryClient = useQueryClient();

  return useMutation(postRecomment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', Number(selectKey)]);
      setState((prev) => !prev);
    },
  });
};

export default usePostRecomment;
