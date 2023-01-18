import styled from 'styled-components';
import { FONT_L } from 'styles/textStyles';

interface Props extends StyleProps {
  children: React.ReactNode;
}

const Header = ({ children, w, isTransparent, length }: Props) => {
  return (
    <StHeader w={w} isTransparent={isTransparent} length={length}>
      {children}
    </StHeader>
  );
};

export default Header;

interface StyleProps {
  w?: string;
  isTransparent?: boolean;
  length?: number;
}

const StHeader = styled.header<StyleProps>`
  position: sticky;
  top: 0;
  left: 0;

  display: grid;
  grid-template-columns: ${(props) => props.w || '3.2rem'} auto 3.2rem;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6.4rem;
  padding: 0 2rem;
  background-color: ${(props) => (props.isTransparent ? 'transparent' : props.theme.color.BG)};
  border-bottom: ${(props) => (props.length !== 0 ? null : `1px solid ${props.theme.color.SUB_4}`)};

  z-index: 9;

  > svg {
    width: 100%;
    cursor: pointer;
  }

  > h1 {
    ${FONT_L};

    span {
      color: ${({ theme }) => theme.color.SUB_3};
    }
  }
`;
