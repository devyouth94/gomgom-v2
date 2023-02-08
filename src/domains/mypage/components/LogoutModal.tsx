import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import {
  StTextContainer,
  StButtonContainer,
  StWindow,
  StBackground,
  StModalContainer,
} from 'common/modal/modalStyles';
import { userStorage } from 'lib/utils/storage';

const LogoutModal = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    userStorage.clearStorage();
    dispatch(toggleModal({ type: 'logout' }));
  };

  const handleClick = () => {
    dispatch(toggleModal({ type: 'logout' }));
  };

  return (
    <StModalContainer>
      <StWindow>
        <StTextContainer>
          <span>로그아웃 하시겠습니까?</span>
        </StTextContainer>
        <StButtonContainer>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
          <button type="button" onClick={handleClick}>
            취소
          </button>
        </StButtonContainer>
      </StWindow>
      <StBackground onClick={handleClick} />
    </StModalContainer>
  );
};

export default LogoutModal;
