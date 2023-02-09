import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import instance from 'app/instance';
import type { CommentItemProps } from 'lib/constants/types';

const deleteComment = async (commentKey: number) => {
  const { data } = await instance.delete<{ result: CommentItemProps }>(`/comment/${commentKey}`);

  return data.result;
};

const useDeleteComment = () => {
  const { selectKey } = useParams();
  const queryClient = useQueryClient();

  return useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', Number(selectKey)]);
    },
  });
};

export default useDeleteComment;
