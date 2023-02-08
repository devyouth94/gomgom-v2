import styled from 'styled-components';

import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import { FONT_BOLD, FONT_S } from 'styles/textStyles';

const Logout = () => {
  const dispatch = useAppDispatch();

  const handleClickLogout = () => {
    dispatch(toggleModal({ type: 'logout' }));
  };

  return (
    <StLogout>
      <span onClick={handleClickLogout}>로그아웃</span>
    </StLogout>
  );
};

export default Logout;

const StLogout = styled.article`
  display: flex;
  justify-content: center;

  margin-top: 3rem;

  ${FONT_S};
  ${FONT_BOLD};
  color: ${({ theme }) => theme.color.SUB_2};

  span {
    cursor: pointer;
  }
`;
