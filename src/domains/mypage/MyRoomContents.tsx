import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'common/components/Header';
import Main from 'common/components/Main';
import RoomItem from 'common/components/RoomItem';

import useIntersect from 'common/hooks/useIntersect';
import useGetMyRoom from './hooks/useGetMyRoom';
import { IconBack } from 'static/Icons/Icons';
import { FONT_M } from 'styles/textStyles';

const titleTransform = (pathname: string) => {
  if (pathname === '/mypage/maderoom') {
    return '내가 만든 고민 상담방';
  } else {
    return '대화중인 고민 상담방';
  }
};

const MyRoomContents = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data, status, hasNextPage, isFetching, fetchNextPage } = useGetMyRoom(pathname);
  const contents = useMemo(() => (data ? data.pages.flatMap((page) => page.result) : []), [data]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  const handleJoin = (roomKey: number) => {
    navigate(`/chatroom/${roomKey}`, { state: { now: pathname } });
  };

  return (
    <>
      <Header length={contents.length}>
        <IconBack handleClick={() => navigate(-1)} />
        <h1>{titleTransform(pathname)}</h1>
      </Header>

      <StMain>
        {status === 'success' && !contents.length && <StNotResult>투표가 없습니다.</StNotResult>}
        {contents.map((content) => (
          <RoomItem
            key={content.roomKey}
            room={content}
            handleJoin={() => handleJoin(content.roomKey)}
          />
        ))}
        <div ref={ref} />
      </StMain>
    </>
  );
};

export default MyRoomContents;

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
