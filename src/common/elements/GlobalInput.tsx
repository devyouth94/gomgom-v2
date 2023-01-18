import styled, { css } from 'styled-components';

interface Props extends InputProps {
  name?: string;
  type: string;
  value?: string;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function GlobalInput({
  name,
  type,
  value,
  placeholder,
  minLength,
  maxLength,
  onChange,
  isError,
}: Props) {
  return (
    <StInput
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      onChange={onChange}
      isError={isError}
    />
  );
}

export default GlobalInput;

interface InputProps {
  isError?: boolean;
}

const StInput = styled.input<InputProps>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 5.6rem;
  padding: 0.8rem 1.2rem;
  background: ${({ theme }) => theme.color.WHITE};

  border: none;
  border-radius: 2rem;

  ${(props) =>
    props.isError &&
    css`
      border: 1px solid ${({ theme }) => theme.color.WARN};
      padding: 0.7rem 1.1rem;
    `}
`;
