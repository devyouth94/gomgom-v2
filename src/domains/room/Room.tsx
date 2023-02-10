import { useMemo } from 'react';
import styled from 'styled-components';

import Header from 'common/components/Header';
import Search from 'common/components/Search';
import Main from 'common/components/Main';
import RoomItem from 'common/components/RoomItem';
import WriteButton from 'common/elements/WriteButton';
import Nav from 'common/components/Nav';
import ScrollTopButton from 'common/elements/ScrollTopButton';
import RoomModalState from 'domains/room/components/RoomModalState';
import JoinModal from 'domains/room/components/JoinModal';

import { useAppSelector } from 'app/config/hooks';
import { changeRoomQuery } from 'app/module/roomSlice';
import useScrollHeight from 'common/hooks/useScrollHeight';
import useIntersect from 'common/hooks/useIntersect';
import useGetRoom from 'domains/room/hooks/useGetRoom';
import usePostRoom from 'domains/room/hooks/usePostRoom';
import Logo from 'static/images/Logo';
import { FONT_M } from 'styles/textStyles';

const Room = () => {
  const { query } = useAppSelector((state) => state.room);

  const isScroll = useScrollHeight();
  const { data: roomInfo, isSuccess, mutate: postRoomInfo } = usePostRoom();
  const { data, status, hasNextPage, isFetching, fetchNextPage } = useGetRoom();
  const contents = useMemo(() => (data ? data.pages.flatMap((page) => page.result) : []), [data]);
  const entered = useMemo(() => (data ? data.pages.flatMap((page) => page.entered) : []), [data]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  return (
    <>
      <RoomModalState />

      {isSuccess && <JoinModal roomInfo={roomInfo} entered={entered} />}

      <StHeader>
        <Logo handleClick={() => window.location.reload()} />
      </StHeader>

      <Search
        text="상담방 이름/고민, 태그 검색(10자 이내)"
        query={query}
        changeDispatch={changeRoomQuery}
      />

      <StMain>
        {status === 'success' && !contents.length && <StNotResult>상담방이 없습니다.</StNotResult>}
        {query && <StQueryResult>{`'${query}'의 검색 결과`}</StQueryResult>}
        {contents.map((content) => (
          <RoomItem
            key={content.roomKey}
            room={content}
            entered={entered}
            handleJoin={postRoomInfo}
          />
        ))}
        <div ref={ref} />
      </StMain>

      <WriteButton />

      {isScroll && <ScrollTopButton />}

      <Nav />
    </>
  );
};

export default Room;

const StHeader = styled(Header)`
  grid-template-columns: 4.5rem auto 3.2rem !important;
`;

const StMain = styled(Main)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;

  padding-top: 14rem;
  padding-bottom: 7.2rem;

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
