import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'common/components/Header';
import Nav from 'common/components/Nav';
import SelectItem from 'common/components/SelectItem';
import useIntersect from 'common/hooks/useIntersect';
import useGetSelect from 'domains/select/hooks/useGetSelect';
import Category from 'domains/select/components/Category';
import Logo from 'static/images/Logo';
import { FONT_M } from 'styles/textStyles';

const Select = () => {
  const { pathname } = useLocation();

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
      <Header w="4.5rem">
        <Logo handleClick={() => window.location.reload()} />
      </Header>

      <Category length={contents.length} />

      <StContainer>
        {status === 'success' && !contents.length && <span>투표가 없습니다.</span>}
        {contents.map((content) => (
          <SelectItem key={content.selectKey} item={content} pathname={pathname} />
        ))}
        <StTarget ref={ref} />
      </StContainer>

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

  padding: 0 2rem;

  > span {
    margin-top: 4rem;
    ${FONT_M};
  }
`;

const StTarget = styled.div`
  height: 1px;
`;
