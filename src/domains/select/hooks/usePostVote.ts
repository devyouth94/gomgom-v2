import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'app/instance';
import type { VoteReturnData } from 'lib/constants/types';

interface Arg {
  selectKey: number;
  selectedNumber: number;
}

const postVote = async ({ selectKey, selectedNumber }: Arg) => {
  const { data } = await instance.post(`/select/vote/${selectKey}`, {
    choice: selectedNumber,
  });

  return {
    msg: data.msg,
    ok: data.ok,
    vote: {
      1: data.result[1] || 0,
      2: data.result[2] || 0,
      3: data.result[3] || 0,
      4: data.result[4] || 0,
    },
    result: { total: data.result.total, isVote: data.result.isVote || 0 },
  };
};

const usePostVote = ({ selectKey, selectedNumber }: Arg) => {
  const queryClient = useQueryClient();

  return useMutation<VoteReturnData>(() => postVote({ selectKey, selectedNumber }), {
    onSuccess: (data) => {
      queryClient.setQueryData(['vote', selectKey], data);
    },
  });
};

export default usePostVote;
