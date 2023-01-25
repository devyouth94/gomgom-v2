import styled from 'styled-components';

import { FONT_L } from 'styles/textStyles';

interface Props extends StyleProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className, length }: Props) => {
  return (
    <StHeader className={className} length={length}>
      {children}
    </StHeader>
  );
};

export default Header;

interface StyleProps {
  length?: number;
}

const StHeader = styled.header<StyleProps>`
  @media ${({ theme }) => theme.device.PC} {
    left: ${({ theme }) => theme.style.LEFT};
    transform: ${({ theme }) => theme.style.TRANSFORM};

    width: ${({ theme }) => theme.style.WIDTH};
  }

  position: fixed;
  top: 0;

  display: grid;
  grid-template-columns: 3.2rem auto 3.2rem;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6.4rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.color.BG};
  border-bottom: ${(props) => (props.length !== 0 ? null : `1px solid ${props.theme.color.SUB_4}`)};

  z-index: 9;

  > svg {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  > h1 {
    ${FONT_L};

    span {
      color: ${({ theme }) => theme.color.SUB_3};
    }
  }
`;
