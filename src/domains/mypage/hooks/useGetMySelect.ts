import { useLocation } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

import instance from 'app/instance';
import type { SelectItemProps } from 'lib/constants/types';

const CONTENT_SIZE = 5;
type Result = {
  result: SelectItemProps[];
};

const getMyPostVoted = async ({ pageParam = 1 }) => {
  const { data } = await instance.get<Result>('my/select', {
    params: { page: pageParam },
  });

  return {
    result: data.result,
    nextPage: pageParam + 1,
    isLastPage: data.result.length < CONTENT_SIZE,
  };
};

const getMyVoted = async ({ pageParam = 1 }) => {
  const { data } = await instance.get<Result>('my/vote', {
    params: { page: pageParam },
  });

  return {
    result: data.result,
    nextPage: pageParam + 1,
    isLastPage: data.result.length < CONTENT_SIZE,
  };
};

const useGetMySelect = () => {
  const { pathname } = useLocation();

  if (pathname === '/mypage/postvoted') {
    return useInfiniteQuery(['my/postvoted'], getMyPostVoted, {
      getNextPageParam: (page) => (page.isLastPage ? undefined : page.nextPage),
    });
  } else {
    return useInfiniteQuery(['my/voted'], getMyVoted, {
      getNextPageParam: (page) => (page.isLastPage ? undefined : page.nextPage),
    });
  }
};

export default useGetMySelect;
