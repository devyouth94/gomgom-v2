import { useParams } from 'react-router-dom';

import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import {
  StModalContainer,
  StWindow,
  StTextContainer,
  StButtonContainer,
  StBackground,
} from 'common/modal/modalStyles';

interface Props {
  socket: any;
  userKey: number;
  nickname: string;
  handleSetKick: () => void;
}

const KickModal = ({ socket, userKey, nickname, handleSetKick }: Props) => {
  const dispatch = useAppDispatch();
  const { roomKey } = useParams();

  const handleKickUser = () => {
    socket.current.emit('expulsion', { roomKey: Number(roomKey), userKey });
    handleSetKick();
  };

  const handleClickCanel = () => {
    dispatch(toggleModal({ type: 'drawer' }));
    dispatch(toggleModal({ type: 'kick' }));
  };

  return (
    <StModalContainer>
      <StWindow>
        <StTextContainer>
          <span>{`'${nickname}'님을 상담방에서 내보냅니다.`}</span>
        </StTextContainer>
        <StButtonContainer>
          <button type="button" onClick={handleKickUser}>
            내보내기
          </button>
          <button type="button" onClick={handleClickCanel}>
            취소
          </button>
        </StButtonContainer>
      </StWindow>
      <StBackground onClick={handleClickCanel} />
    </StModalContainer>
  );
};

export default KickModal;
