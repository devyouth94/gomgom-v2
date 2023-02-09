import React from 'react';
import styled from 'styled-components';

import { FONT_EXTRABOLD } from 'styles/textStyles';

interface Props extends ButtonProps {
  children: string | React.ReactNode;
  onClick: ((event: any) => Promise<void>) | (() => void);
  className?: string;
}

const GlobalButton = ({ children, onClick, className, bgc, font }: Props) => {
  return (
    <StButton onClick={onClick} className={className} bgc={bgc} font={font}>
      {children}
    </StButton>
  );
};

export default GlobalButton;

interface ButtonProps {
  bgc?: string;
  font?: string;
}

const StButton = styled.button<ButtonProps>`
  position: relative;

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
