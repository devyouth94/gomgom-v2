import { useLocation } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

import instance from 'app/instance';
import type { RoomItemProps } from 'lib/constants/types';

const CONTENT_SIZE = 5;
type Result = {
  result: RoomItemProps[];
};

const getMyMaderoom = async ({ pageParam = 1 }) => {
  const { data } = await instance.get<Result>('my/room', {
    params: { page: pageParam },
  });

  return {
    result: data.result,
    nextPage: pageParam + 1,
    isLastPage: data.result.length < CONTENT_SIZE,
  };
};

const getMyOperatingroom = async ({ pageParam = 1 }) => {
  const { data } = await instance.get<Result>('my/enter', {
    params: { page: pageParam },
  });

  return {
    result: data.result,
    nextPage: pageParam + 1,
    isLastPage: data.result.length < CONTENT_SIZE,
  };
};

const useGetMyRoom = () => {
  const { pathname } = useLocation();

  if (pathname === '/mypage/maderoom') {
    return useInfiniteQuery(['my/maderoom'], getMyMaderoom, {
      getNextPageParam: (page) => (page.isLastPage ? undefined : page.nextPage),
    });
  } else {
    return useInfiniteQuery(['my/operatingroom'], getMyOperatingroom, {
      getNextPageParam: (page) => (page.isLastPage ? undefined : page.nextPage),
    });
  }
};

export default useGetMyRoom;
