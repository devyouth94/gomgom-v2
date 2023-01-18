import styled, { css } from 'styled-components';
import { FONT_BOLD, FONT_EXTRABOLD } from 'styles/textStyles';

interface Props extends ButtonProps {
  children: string | React.ReactNode;
  onClick: (() => Promise<void>) | (() => void);
}

const GlobalButton = ({
  children,
  onClick,
  h,
  bgc,
  borderR,
  fw,
  fs,
  font,
  position,
  bottom,
}: Props) => {
  return (
    <StButton
      onClick={onClick}
      h={h}
      bgc={bgc}
      borderR={borderR}
      fw={fw}
      fs={fs}
      font={font}
      position={position}
      bottom={bottom}
    >
      {children}
    </StButton>
  );
};

export default GlobalButton;

interface ButtonProps {
  h?: string;
  bgc?: string;
  borderR?: string;
  fw?: string;
  fs?: string;
  font?: string;
  position?: string;
  bottom?: string;
}

const StButton = styled.button<ButtonProps>`
  position: ${(props) => props.position || 'relative'};
  ${(props) =>
    props.bottom &&
    css<ButtonProps>`
      bottom: ${(props) => props.bottom};
    `}

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  width: 100%;
  height: ${(props) => props.h || '5.6rem'};
  background-color: ${(props) => props.bgc || props.theme.color.MAIN_2};
  border-radius: ${(props) => props.borderR || '2rem'};

  ${(props) => (props.fw === 'bold' ? FONT_BOLD : FONT_EXTRABOLD)}
  font-size: ${(props) => props.fs || '1.6rem'};
  color: ${(props) => props.font || props.theme.color.WHITE};
`;
