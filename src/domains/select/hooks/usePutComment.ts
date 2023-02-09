import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import instance from 'app/instance';
import type { CommentItemProps } from 'lib/constants/types';

interface Arg {
  commentKey: number;
  comment: string;
}

const putComment = async ({ commentKey, comment }: Arg) => {
  const { data } = await instance.put<{ result: CommentItemProps }>(`/comment/${commentKey}`, {
    comment,
  });

  return data.result;
};

const usePutComment = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { selectKey } = useParams();
  const queryClient = useQueryClient();

  return useMutation(putComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', Number(selectKey)]);
      setState((prev) => !prev);
    },
  });
};

export default usePutComment;
