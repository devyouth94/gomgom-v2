import { useInfiniteQuery } from '@tanstack/react-query';
import { useAppSelector } from 'app/config/hooks';
import instance from 'app/instance';
import type { RoomItemProps } from 'lib/constants/types';

const CONTENT_SIZE = 5;
type Result = {
  result: RoomItemProps[];
  isRoom?: number[];
};

const getRoomAll = async ({ pageParam = 1 }) => {
  const { data } = await instance.get<Result>('/room', {
    params: { page: pageParam },
  });

  return {
    result: data.result,
    entered: data.isRoom,
    nextPage: pageParam + 1,
    isLastPage: data.result.length < CONTENT_SIZE,
  };
};

const getRoomBySearch = async ({ query, pageParam }: { query: string; pageParam: number }) => {
  const { data } = await instance.get<Result>('/room/search', {
    params: { searchWord: query },
  });

  return {
    result: data.result,
    entered: undefined,
    nextPage: pageParam + 1,
    isLastPage: true,
  };
};

const useGetRoom = () => {
  const { query } = useAppSelector((state) => state.room);

  if (query) {
    return useInfiniteQuery(['search_room', query], ({ pageParam = 1 }) =>
      getRoomBySearch({ query, pageParam }),
    );
  }

  return useInfiniteQuery(['room'], getRoomAll, {
    getNextPageParam: (page) => (page.isLastPage ? undefined : page.nextPage),
  });
};

export default useGetRoom;
