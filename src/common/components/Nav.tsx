import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IconChatTab, IconChatUnTab, IconVoteTab, IconVoteUnTab } from 'static/Icons/Icons';
import { IconGomTab, IconGomUnTab, IconProfileTab, IconProfileUnTab } from 'static/Icons/Icons';
import { FONT_BOLD, FONT_XS } from 'styles/textStyles';

const Nav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <StNav pathname={pathname}>
      <StIconContainer onClick={() => navigate('/select')}>
        {pathname === '/select' ? <IconVoteTab /> : <IconVoteUnTab />}
        <span>고민투표</span>
      </StIconContainer>

      <StIconContainer onClick={() => navigate('/room')}>
        {pathname === '/room' ? <IconChatTab /> : <IconChatUnTab />}
        <span>고민상담</span>
      </StIconContainer>

      <StIconContainer onClick={() => navigate('/answer')}>
        {pathname === '/answer' ? <IconGomTab /> : <IconGomUnTab />}
        <span>곰곰해답</span>
      </StIconContainer>

      <StIconContainer onClick={() => navigate('/mypage')}>
        {pathname === '/mypage' ? <IconProfileTab /> : <IconProfileUnTab />}
        <span>마이페이지</span>
      </StIconContainer>
    </StNav>
  );
};

export default Nav;

interface StyleProps {
  pathname: string;
}

const StNav = styled.nav<StyleProps>`
  @media ${({ theme }) => theme.device.PC} {
    left: ${({ theme }) => theme.style.LEFT};
    transform: ${({ theme }) => theme.style.TRANSFORM};

    width: ${({ theme }) => theme.style.WIDTH};
  }

  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 7.2rem;
  padding: 0.5rem 2.5rem 1.7rem 2.5rem;
  background-color: ${(props) =>
    props.pathname === '/answer' ? 'transparent' : props.theme.color.BG};
  border-top: ${(props) =>
    props.pathname === '/answer' ? 'none' : `1px solid ${props.theme.color.SUB_4}`};

  > div:nth-child(
      ${(props) =>
          props.pathname === '/select'
            ? 1
            : props.pathname === '/room'
            ? 2
            : props.pathname === '/answer'
            ? 3
            : props.pathname === '/mypage'
            ? 4
            : null}
    ) {
    color: ${({ theme }) => theme.color.MAIN_2};
  }
`;

const StIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${({ theme }) => theme.color.SUB_2};

  cursor: pointer;

  span {
    ${FONT_XS};
    ${FONT_BOLD};
    line-height: 1.8rem;
  }
`;
