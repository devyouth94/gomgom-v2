import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useAppSelector } from 'app/config/hooks';
import Header from 'common/components/Header';
import Search from 'common/components/Search';
import Nav from 'common/components/Nav';
import SelectItem from 'common/components/SelectItem';
import WriteButton from 'common/elements/WriteButton';
import useIntersect from 'common/hooks/useIntersect';
import useGetSelect from 'domains/select/hooks/useGetSelect';
import Category from 'domains/select/components/Category';
import SelectModalState from 'domains/select/components/SelectModalState';
import Logo from 'static/images/Logo';
import { FONT_M } from 'styles/textStyles';

const Select = () => {
  const { pathname } = useLocation();
  const { query } = useAppSelector((state) => state.select.selected);

  const { data, status, hasNextPage, isFetching, fetchNextPage } = useGetSelect();
  const contents = useMemo(() => (data ? data.pages.flatMap((page) => page.result) : []), [data]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <>
      <SelectModalState />

      <Header w="4.5rem">
        <Logo handleClick={() => window.location.reload()} />
      </Header>

      <Search text="고민 투표/제목 검색(10자 이내)" query={query} />

      <Category length={contents.length} />

      <StContainer>
        {status === 'success' && !contents.length && <StNotResult>투표가 없습니다.</StNotResult>}
        {query && <StQueryResult>{query}의 검색 결과</StQueryResult>}
        {contents.map((content) => (
          <SelectItem key={content.selectKey} item={content} pathname={pathname} />
        ))}
        <div ref={ref} />
      </StContainer>

      <WriteButton />

      <Nav />
    </>
  );
};

export default Select;

const StContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;

  min-height: 100vh;
  padding: 0 2rem;

  > span {
    ${FONT_M};
  }
`;

const StNotResult = styled.span`
  margin-top: 4rem;
`;

const StQueryResult = styled.span`
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 99rem;

  background-color: ${({ theme }) => theme.color.WHITE};
`;
