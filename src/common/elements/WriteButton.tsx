import { toggleModal } from 'app/module/modalSlice';
import { userStorage } from 'lib/utils/storage';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import IconWrite from 'static/Icons/IconWrite';
import styled from 'styled-components';

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
  position: sticky;
  bottom: 7rem;

  display: flex;
  justify-content: flex-end;
  padding-bottom: 2rem;
  padding-right: 1.5rem;

  width: 100%;

  svg {
    cursor: pointer;
  }
`;
