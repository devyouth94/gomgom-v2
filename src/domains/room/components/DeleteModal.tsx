import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import ProfileImg from 'common/elements/ProfileImg';

import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import {
  StTitleContainer,
  StModalContainer,
  StBackground,
  StButtonContainer,
  StWindowWide,
  StTextContainerWide,
} from 'common/modal/modalStyles';
import { userStorage } from 'lib/utils/storage';
import type { User } from 'lib/constants/types';
import { FONT_M } from 'styles/textStyles';

interface Props {
  socket: any;
  handleClickLeave: () => void;
  isOpen: boolean;
}

const DeleteModal = ({ socket, handleClickLeave, isOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { roomKey } = useParams();
  const userKey = userStorage.getUserKey();

  const [isSelect, setIsSelect] = useState(0);
  const [nowUser, setNowUser] = useState<User[]>([]);

  useEffect(() => {
    socket.current.emit('showUsers', { roomKey: Number(roomKey), userKey });
    socket.current.on('receive', (data: User[]) => {
      setNowUser([...data]);
    });
  }, [isOpen]);

  const handleClickDelete = () => {
    dispatch(toggleModal({ type: 'drawer' }));
    dispatch(toggleModal({ type: 'chat_delete' }));
  };

  const recommendHandler = () => {
    if (isSelect === 0) return;

    socket.current.emit('recommend', {
      userKey: nowUser[isSelect]?.userKey,
      roomKey: Number(roomKey),
    });
    handleClickLeave();
  };

  return (
    <StModalContainer>
      <StWindowWide>
        <StTitleContainer>고민해결에 도움 된 사람을 추천해주세요</StTitleContainer>

        <StTextContainerWide>
          {nowUser.length === 1 ? (
            <div>남아있는 인원이 없어요.</div>
          ) : (
            <>
              <div>*현재 상담방에 남아 있는 사람입니다.</div>
              <StUserList number={isSelect}>
                {nowUser.slice(1).map((user, idx) => (
                  <StUser key={user.userKey} htmlFor={String(user.userKey)}>
                    <ProfileImg point={user.point} size="4rem" />
                    <input
                      type="radio"
                      hidden
                      id={String(user.userKey)}
                      checked={isSelect === idx + 1}
                      onChange={() => setIsSelect(idx + 1)}
                    />
                    <span>{user?.nickname}</span>
                  </StUser>
                ))}
              </StUserList>
            </>
          )}
        </StTextContainerWide>

        <StButtonContainer>
          {nowUser.length !== 1 && (
            <button type="button" onClick={recommendHandler}>
              추천하고 삭제
            </button>
          )}
          <button type="button" onClick={handleClickLeave}>
            상담방 삭제
          </button>
        </StButtonContainer>
      </StWindowWide>
      <StBackground onClick={handleClickDelete} />
    </StModalContainer>
  );
};

const StUserList = styled.div<{ number: number }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  row-gap: 1.2rem;

  width: 28rem;
  min-height: 5.6rem;
  margin-top: 0.7rem;
  margin-bottom: 0.5rem;

  span {
    color: ${({ theme }) => theme.color.SUB_2};
    margin-top: 0.2rem;
  }

  //선택된 유저는 프로필에 메인컬러 보더가 생기고 닉네임이 메인 컬러로 변합니다
  label:nth-child(${(props) => props.number}) {
    div {
      border: 0.15rem solid ${({ theme }) => theme.color.MAIN_2};
    }

    span {
      color: ${({ theme }) => theme.color.MAIN_2};
    }
  }
`;

const StUser = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 8rem;

  span {
    ${FONT_M};
    line-height: 1.4rem;
  }
`;

export default DeleteModal;
