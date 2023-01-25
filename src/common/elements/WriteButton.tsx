import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { toggleModal } from 'app/module/modalSlice';
import { userStorage } from 'lib/utils/storage';
import IconWrite from 'static/Icons/IconWrite';

const WriteButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClickWrite = () => {
    if (!userStorage.getToken('access')) {
      dispatch(toggleModal({ type: 'signin' }));
      return;
    }

    if (pathname === '/select') {
      dispatch(toggleModal({ type: 'write' }));
    } else {
      navigate('/room/create');
    }
  };

  return (
    <StContainer>
      <IconWrite handleClick={handleClickWrite} />
    </StContainer>
  );
};

export default WriteButton;

const StContainer = styled.section`
  @media ${({ theme }) => theme.device.PC} {
    left: ${({ theme }) => theme.style.LEFT};
    transform: ${({ theme }) => theme.style.TRANSFORM};

    width: ${({ theme }) => theme.style.WIDTH};
  }

  position: fixed;
  bottom: 7rem;

  display: flex;
  justify-content: flex-end;
  padding-bottom: 2rem;
  padding-right: 2rem;

  width: 100%;

  svg {
    cursor: pointer;
  }
`;
