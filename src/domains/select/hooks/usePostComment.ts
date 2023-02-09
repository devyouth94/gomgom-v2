import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import instance from 'app/instance';
import type { CommentItemProps } from 'lib/constants/types';

interface Arg {
  selectKey: number;
  comment: string;
}

const postComment = async ({ selectKey, comment }: Arg) => {
  const { data } = await instance.post<{ result: CommentItemProps }>(`/comment/${selectKey}`, {
    comment,
  });

  return data.result;
};

const usePostComment = () => {
  const { selectKey } = useParams();
  const queryClient = useQueryClient();

  return useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', Number(selectKey)]);
    },
  });
};

export default usePostComment;
