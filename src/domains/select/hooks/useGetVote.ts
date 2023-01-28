import { useQuery } from '@tanstack/react-query';

import instance from 'app/instance';
import type { VoteResultProps, VoteReturnData } from 'lib/constants/types';

const getVote = async (selectKey: number) => {
  const { data } = await instance.get<VoteResultProps>(`/select/vote/${selectKey}`);

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

const useGetVote = (selectKey: number) => {
  return useQuery<VoteReturnData>(['vote', selectKey], () => getVote(selectKey));
};

export default useGetVote;
