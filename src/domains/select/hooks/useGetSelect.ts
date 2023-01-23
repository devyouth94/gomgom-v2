import { useInfiniteQuery } from '@tanstack/react-query';
import { useAppSelector } from 'app/config/hooks';
import instance from 'app/instance';
import { SelectItemProps } from 'lib/constants/types';

const CONTENT_SIZE = 5;
type Result = {
  result: SelectItemProps[];
};

type Data = {
  data: SelectItemProps[];
};

const getSelectAll = async ({ pageParam = 1 }) => {
  const { data } = await instance.get<Result>('/select', {
    params: { page: pageParam },
  });

  return {
    result: data.result,
    nextPage: pageParam + 1,
    isLastPage: data.result.length < CONTENT_SIZE,
  };
};

const getSelectByFilter = async ({ pageParam = 1 }) => {
  const { data } = await instance.get<Data>('/select/filter', {
    params: { page: pageParam },
  });

  return {
    result: data.data,
    nextPage: pageParam + 1,
    isLastPage: data.data.length < CONTENT_SIZE,
  };
};

const getSelectByCategory = async ({ value, pageParam }: { value: string; pageParam: number }) => {
  const { data } = await instance.get<Result>(`/select/category/${value}`, {
    params: { page: pageParam },
  });

  return {
    result: data.result,
    nextPage: pageParam + 1,
    isLastPage: data.result.length < CONTENT_SIZE,
  };
};

const getSelectByProceeding = async ({ pageParam = 1 }) => {
  const { data } = await instance.get<Result>('/select/ongoing', {
    params: { page: pageParam },
  });

  return {
    result: data.result,
    nextPage: pageParam + 1,
    isLastPage: data.result.length < CONTENT_SIZE,
  };
};

const getSelectBySearch = async ({ query, pageParam }: { query: string; pageParam: number }) => {
  const { data } = await instance.get<Result>('/select/search', {
    params: { searchWord: query },
  });

  return {
    result: data.result,
    nextPage: pageParam + 1,
    isLastPage: data.result.length < CONTENT_SIZE,
  };
};

const useGetSelect = () => {
  const selected = useAppSelector((state) => state.select.selected);

  if (selected.query) {
    return useInfiniteQuery(
      ['search', selected.query],
      ({ pageParam = 1 }) => getSelectBySearch({ query: selected.query, pageParam }),
      {
        getNextPageParam: (page) => (page.isLastPage ? undefined : page.nextPage),
      },
    );
  }

  if (selected.filter === '인기순') {
    return useInfiniteQuery(['filter', selected.filter], getSelectByFilter, {
      getNextPageParam: (page) => (page.isLastPage ? undefined : page.nextPage),
    });
  } else if (selected.category !== '카테고리') {
    return useInfiniteQuery(
      ['category', selected.category],
      ({ pageParam = 1 }) => getSelectByCategory({ value: selected.category, pageParam }),
      {
        getNextPageParam: (page) => (page.isLastPage ? undefined : page.nextPage),
      },
    );
  } else if (selected.proceeding === '진행중인 투표') {
    return useInfiniteQuery(['proceeding', selected.proceeding], getSelectByProceeding, {
      getNextPageParam: (page) => (page.isLastPage ? undefined : page.nextPage),
    });
  } else {
    return useInfiniteQuery(['select'], getSelectAll, {
      getNextPageParam: (page) => (page.isLastPage ? undefined : page.nextPage),
    });
  }
};

export default useGetSelect;
