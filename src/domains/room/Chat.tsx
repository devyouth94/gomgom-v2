import { useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'common/components/Header';
import ChatBox from 'domains/room/components/ChatBox';
import ChatInput from 'domains/room/components/ChatInput';
import ChatMenu from 'domains/room/components/ChatMenu';
import KickModal from 'domains/room/components/KickModal';
import ExitModal from 'domains/room/components/ExitModal';
import DeleteModal from 'domains/room/components/DeleteModal';
import BasicModal from 'common/modal/BasicModal';

import instance from 'app/instance';
import { toggleModal } from 'app/module/modalSlice';
import { useAppDispatch, useAppSelector } from 'app/config/hooks';
import useChatState from 'domains/room/hooks/useChatState';
import type { LocationState } from 'lib/constants/types';
import { userStorage } from 'lib/utils/storage';
import { FONT_BOLD, FONT_M } from 'styles/textStyles';
import { IconAnnounce, IconBack, IconDrawer } from 'static/Icons/Icons';

const ChatRoom = () => {
  const dispatch = useAppDispatch();
  const { modalType } = useAppSelector((state) => state.modal);
  const navigate = useNavigate();
  const { state } = useLocation() as LocationState;

  const socket = useRef<any>(null);
  const { roomKey } = useParams();
  const userKey = userStorage.getUserKey();
  const { roomInfo, chat, kickMessage, hostMessage } = useChatState(socket);

  const [kickUser, setKickUser] = useState({ key: 0, nickname: '' });

  const handleClickBack = () => {
    if (!state?.now || state.now === '/room/create') {
      navigate('/room', { replace: true });
    } else {
      navigate(-1);
    }
  };

  const handleClickLeave = async () => {
    socket.current.emit('leave-room', { roomKey: Number(roomKey), userKey });
    await instance.delete(`/room/${roomKey}`);
    dispatch(toggleModal({ type: 'chat_exit' }));
    handleClickBack();
  };

  const handleClickKick = ({ key, nickname }: { key: number; nickname: string }) => {
    setKickUser((prev) => ({ ...prev, key, nickname }));
    dispatch(toggleModal({ type: 'drawer' }));
    dispatch(toggleModal({ type: 'kick' }));
  };

  const handleSetKick = () => {
    setKickUser({ key: 0, nickname: '' });
    dispatch(toggleModal({ type: 'kick' }));
  };

  return (
    <>
      {modalType.drawer && (
        <ChatMenu
          socket={socket}
          roomInfo={roomInfo}
          handleClickKick={handleClickKick}
          isOpen={!!modalType.drawer}
        />
      )}

      {modalType.chat_exit && <ExitModal handleClickLeave={handleClickLeave} />}

      {modalType.chat_delete && (
        <DeleteModal
          socket={socket}
          handleClickLeave={handleClickLeave}
          isOpen={!!modalType.chat_delete}
        />
      )}

      {modalType.kick && (
        <KickModal
          socket={socket}
          userKey={kickUser.key}
          nickname={kickUser.nickname}
          handleSetKick={handleSetKick}
        />
      )}

      {kickMessage.key === userKey && (
        <BasicModal handleClick={() => navigate('/room', { replace: true })}>
          {kickMessage.msg}
        </BasicModal>
      )}

      {hostMessage && (
        <BasicModal handleClick={() => navigate('/room', { replace: true })}>
          {hostMessage}
        </BasicModal>
      )}

      <Header>
        <IconBack handleClick={handleClickBack} />
        <h1>
          {roomInfo.host} <span>{roomInfo.currentPeople}</span>
        </h1>
        <IconDrawer handleClick={() => dispatch(toggleModal({ type: 'drawer' }))} />
      </Header>

      <StRoomTitle>
        <IconAnnounce />
        <span>{roomInfo.title}</span>
      </StRoomTitle>

      <ChatBox chat={chat} />

      <ChatInput socket={socket} />
    </>
  );
};

const StRoomTitle = styled.section`
  @media ${({ theme }) => theme.device.PC} {
    left: ${({ theme }) => theme.style.LEFT};
    transform: ${({ theme }) => theme.style.TRANSFORM};

    width: ${({ theme }) => theme.style.WIDTH};
  }

  position: fixed;
  top: 6.4rem;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  width: 100%;
  height: 3.4rem;
  padding: 0 5rem;
  background-color: ${({ theme }) => theme.color.BG};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);

  z-index: 8;

  svg {
    width: 2rem;
  }

  span {
    ${FONT_M};
    ${FONT_BOLD};
  }
`;

export default ChatRoom;
