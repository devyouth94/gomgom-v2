import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { toggleModal } from 'app/module/modalSlice';
import {
  StBackground,
  StButtonContainer,
  StModalContainer,
  StTextContainer,
  StWindow,
} from 'common/modal/modalStyles';

const SignInModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogin = () => {
    dispatch(toggleModal({ type: 'signin' }));
    navigate('/signin');
  };

  const handleClick = () => {
    dispatch(toggleModal({ type: 'signin' }));
  };

  return (
    <StModalContainer>
      <StWindow>
        <StTextContainer>
          <span>로그인 후 사용해주세요.</span>
        </StTextContainer>
        <StButtonContainer>
          <button type="button" onClick={handleClickLogin}>
            로그인
          </button>
          <button type="button" onClick={handleClick}>
            확인
          </button>
        </StButtonContainer>
      </StWindow>
      <StBackground onClick={handleClick} />
    </StModalContainer>
  );
};

export default SignInModal;
