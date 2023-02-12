import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import ProfileImg from 'common/elements/ProfileImg';

import { toggleModal } from 'app/module/modalSlice';
import { useAppDispatch } from 'app/config/hooks';
import { userStorage } from 'lib/utils/storage';
import type { RoomItemProps, User } from 'lib/constants/types';
import { IconClose, IconDelete, IconLogout } from 'static/Icons/Icons';
import { FONT_BOLD, FONT_EXTRABOLD, FONT_M, FONT_S, FONT_XS } from 'styles/textStyles';

interface Props {
  socket: any;
  roomInfo: RoomItemProps;
  handleClickKick: ({ key, nickname }: { key: number; nickname: string }) => void;
  isOpen: boolean;
}

const ChatMenu = ({ socket, roomInfo, handleClickKick, isOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { roomKey } = useParams();
  const userKey = userStorage.getUserKey();

  const [nowUser, setNowUser] = useState<User[]>([]);

  useEffect(() => {
    socket.current.emit('showUsers', { roomKey: Number(roomKey), userKey });
    socket.current.on('receive', (data: User[]) => {
      setNowUser([...data]);
    });
  }, [isOpen]);

  const handleClickExit = () => {
    dispatch(toggleModal({ type: 'drawer' }));
    dispatch(toggleModal({ type: 'chat_exit' }));
  };

  const handleClickDelete = () => {
    dispatch(toggleModal({ type: 'drawer' }));
    dispatch(toggleModal({ type: 'chat_delete' }));
  };

  return (
    <StBackground>
      <StMenu>
        <StHeader>
          <IconClose handleClick={() => dispatch(toggleModal({ type: 'drawer' }))} />
        </StHeader>

        <StInfo>
          <div>[익명] {roomInfo.title}</div>
          <div>{roomInfo.currentPeople}명 참여중</div>
        </StInfo>

        <StPeople>
          <div>상담 참여자</div>
          <div>
            {nowUser.map((user) => (
              <StPerson key={user.userKey}>
                <ProfileImg point={user.point} size="4rem" />

                {user.userKey === userKey && <StMeBadge>나</StMeBadge>}

                <StNickname isMe={user.userKey === userKey}>{user.nickname}</StNickname>

                {roomInfo.userKey === userKey && user.userKey !== userKey && (
                  <StKickBadge
                    onClick={() => handleClickKick({ key: user.userKey, nickname: user.nickname })}
                  >
                    내보내기
                  </StKickBadge>
                )}
              </StPerson>
            ))}
          </div>
        </StPeople>

        <StFooter>
          {userKey === roomInfo?.userKey ? (
            <div onClick={handleClickDelete}>
              <IconDelete />
              <span>상담방 삭제하기</span>
            </div>
          ) : (
            <div onClick={handleClickExit}>
              <IconLogout />
              <span>상담방 나가기</span>
            </div>
          )}
        </StFooter>
      </StMenu>
    </StBackground>
  );
};

export default ChatMenu;

const StBackground = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    left: ${({ theme }) => theme.style.LEFT};
    transform: ${({ theme }) => theme.style.TRANSFORM};

    width: ${({ theme }) => theme.style.WIDTH};
  }

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);

  z-index: 99;
`;

const StMenu = styled.section`
  position: absolute;
  top: 0;
  right: 0;

  width: 30rem;
  min-height: calc(var(--vh, 1vh) * 100);
  background-color: ${({ theme }) => theme.color.BG};

  z-index: 100;
`;

const StHeader = styled.article`
  position: relative;

  display: flex;
  align-items: center;

  height: 6.4rem;
  width: 30rem;
  padding: 0 2rem;

  svg {
    cursor: pointer;
  }
`;

const StInfo = styled.article`
  position: relative;

  padding: 0 2rem 2rem 2rem;

  border-bottom: ${({ theme }) => `1px solid ${theme.color.SUB_4}`};

  div:nth-child(1) {
    ${FONT_BOLD};
    line-height: 2.4rem;
  }

  div:nth-child(2) {
    ${FONT_S};
    line-height: 2rem;
  }
`;

const StPeople = styled.article`
  padding: 2rem;

  > div:nth-child(1) {
    ${FONT_M};
    ${FONT_BOLD};
    line-height: 2.1rem;

    margin-bottom: 0.8rem;
  }
`;

const StPerson = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  gap: 1rem;

  height: 5.6rem;
`;

const StNickname = styled.div<{ isMe: boolean }>`
  ${FONT_M};
  ${(props) =>
    props.isMe &&
    css`
      ${FONT_BOLD};
    `}
`;

const StMeBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1.4rem;
  height: 1.4rem;
  padding: 0.8rem;
  margin-right: -0.7rem;
  background-color: ${({ theme }) => theme.color.MAIN_2};

  border-radius: 0.7rem 0.7rem 0 0.7rem;

  ${FONT_XS};
  ${FONT_EXTRABOLD};
  color: ${({ theme }) => theme.color.WHITE};
`;

const StKickBadge = styled.div`
  position: absolute;
  right: 0;

  padding: 0.5rem 0.8rem;
  background-color: ${({ theme }) => theme.color.BLACK};

  border-radius: 1.4rem;

  ${FONT_XS};
  line-height: 1.8rem;
  color: ${({ theme }) => theme.color.WHITE};

  cursor: pointer;
`;

const StFooter = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  align-items: center;

  width: 100%;
  height: 6.4rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.color.BG};

  div {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
  }

  span {
    ${FONT_M};
  }
`;
