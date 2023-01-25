import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Main = ({ children, className }: Props) => {
  return <StMain className={className}>{children}</StMain>;
};

export default Main;

const StMain = styled.main`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    left: ${({ theme }) => theme.style.LEFT};
    transform: ${({ theme }) => theme.style.TRANSFORM};

    width: ${({ theme }) => theme.style.WIDTH};
  }

  position: relative;

  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: ${({ theme }) => theme.color.BG};
`;
