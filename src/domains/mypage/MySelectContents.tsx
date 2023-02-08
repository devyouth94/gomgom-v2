import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'common/components/Header';
import Main from 'common/components/Main';
import SelectItem from 'common/components/SelectItem';

import useIntersect from 'common/hooks/useIntersect';
import useGetMySelect from 'domains/mypage/hooks/useGetMySelect';
import { IconBack } from 'static/Icons/Icons';
import { FONT_M } from 'styles/textStyles';

const titleTransform = (pathname: string) => {
  if (pathname === '/mypage/postvoted') {
    return '내가 등록한 고민 투표';
  } else {
    return '내가 투표한 고민 투표';
  }
};

const MySelectContents = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data, status, hasNextPage, isFetching, fetchNextPage } = useGetMySelect(pathname);
  const contents = useMemo(() => (data ? data.pages.flatMap((page) => page.result) : []), [data]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <>
      <Header length={contents.length}>
        <IconBack handleClick={() => navigate(-1)} />
        <h1>{titleTransform(pathname)}</h1>
      </Header>

      <StMain>
        {status === 'success' && !contents.length && <StNotResult>투표가 없습니다.</StNotResult>}
        {contents.map((content) => (
          <SelectItem key={content.selectKey} item={content} pathname={pathname} />
        ))}
        <div ref={ref} />
      </StMain>
    </>
  );
};

export default MySelectContents;

const StMain = styled(Main)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;

  padding-top: 8.4rem;
  padding-bottom: 2rem;

  > span {
    ${FONT_M};
  }
`;

const StNotResult = styled.span`
  margin-top: 4rem;
`;
