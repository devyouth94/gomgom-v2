import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const FooterInput = ({ children }: Props) => {
  return <StFooterInput>{children}</StFooterInput>;
};

export default FooterInput;

const StFooterInput = styled.footer`
  @media ${({ theme }) => theme.device.PC} {
    width: ${({ theme }) => theme.style.WIDTH};
    left: ${({ theme }) => theme.style.LEFT};
    transform: ${({ theme }) => theme.style.TRANSFORM};
  }

  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 8.8rem;
  padding: 0.8rem 0.8rem 2.4rem 0.8rem;
  background-color: ${({ theme }) => theme.color.BG};

  form {
    display: flex;
    align-items: center;

    width: 100%;
    height: 5.6rem;
    padding: 0 2rem 0 2rem;
    background-color: ${({ theme }) => theme.color.WHITE};

    border-radius: 2rem;
  }

  input {
    width: 100%;
    border: none;
    &:focus {
      outline: none;
    }
  }

  button {
    display: flex;
    margin-right: -1rem;
  }
`;
