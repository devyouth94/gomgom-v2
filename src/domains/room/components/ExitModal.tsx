import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import {
  StTextContainer,
  StTitleContainer,
  StWindow,
  StButtonContainer,
  StBackground,
  StModalContainer,
} from 'common/modal/modalStyles';

interface Props {
  handleClickLeave: () => void;
}

const ExitModal = ({ handleClickLeave }: Props) => {
  const dispatch = useAppDispatch();

  const handleClickExit = () => {
    dispatch(toggleModal({ type: 'drawer' }));
    dispatch(toggleModal({ type: 'chat_exit' }));
  };

  return (
    <StModalContainer>
      <StWindow>
        <StTitleContainer>상담방 나가기</StTitleContainer>
        <StTextContainer>
          <span>나가기를 하면 작성자의 추천을 받을 수 없어요.</span>
          <span>(추천을 받으면 등급이 올라가요!)</span>
        </StTextContainer>
        <StButtonContainer>
          <button type="button" onClick={handleClickLeave}>
            나가기
          </button>
          <button type="button" onClick={handleClickExit}>
            취소
          </button>
        </StButtonContainer>
      </StWindow>
      <StBackground onClick={handleClickExit} />
    </StModalContainer>
  );
};

export default ExitModal;
