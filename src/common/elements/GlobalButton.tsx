import React from 'react';
import styled, { css } from 'styled-components';

import { FONT_EXTRABOLD } from 'styles/textStyles';

interface Props extends ButtonProps {
  children: string | React.ReactNode;
  onClick: ((event: any) => Promise<void>) | (() => void);
}

const GlobalButton = ({ children, onClick, bgc, font, position, bottom }: Props) => {
  return (
    <StButton onClick={onClick} bgc={bgc} font={font} position={position} bottom={bottom}>
      {children}
    </StButton>
  );
};

export default GlobalButton;

interface ButtonProps {
  bgc?: string;
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
  height: 5.6rem;
  background-color: ${(props) => props.bgc || props.theme.color.MAIN_2};
  border-radius: 2rem;

  ${FONT_EXTRABOLD};
  font-size: 1.6rem;
  color: ${(props) => props.font || props.theme.color.WHITE};
`;
