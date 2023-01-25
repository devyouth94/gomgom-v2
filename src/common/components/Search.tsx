import { useState } from 'react';
import styled from 'styled-components';

import { useAppDispatch } from 'app/config/hooks';
import { changeSelected } from 'app/module/selectSlice';
import { IconSearch } from 'static/Icons/Icons';
import { FONT_M } from 'styles/textStyles';

interface Props {
  text: string;
  query: string;
}

const Search = ({ text, query }: Props) => {
  const dispatch = useAppDispatch();

  const [searchWord, setSearchWord] = useState('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleCancel = () => {
    if (!query) return;
    dispatch(changeSelected({ value: 'query', item: '' }));
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(changeSelected({ value: 'query', item: searchWord }));
    setSearchWord('');
  };

  return (
    <StContainer>
      <StForm onSubmit={handleOnSubmit}>
        <input value={searchWord} onChange={handleOnChange} maxLength={10} placeholder={text} />
        <button type="submit">
          <IconSearch />
        </button>
      </StForm>

      <StCancel onClick={handleCancel}>{query ? '초기화' : '취소'}</StCancel>
    </StContainer>
  );
};

export default Search;

const StContainer = styled.section`
  @media ${({ theme }) => theme.device.PC} {
    left: ${({ theme }) => theme.style.LEFT};
    transform: ${({ theme }) => theme.style.TRANSFORM};

    width: ${({ theme }) => theme.style.WIDTH};
  }

  position: fixed;
  top: 6.4rem;

  display: grid;
  grid-template-columns: auto 6rem;
  align-items: center;

  width: 100%;
  height: 6.4rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.color.BG};

  z-index: 9;
`;

const StForm = styled.form`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    height: 4rem;
    padding: 0 1.5rem;
    background-color: ${({ theme }) => theme.color.WHITE};

    border: none;
    border-radius: 2rem;

    &:focus {
      outline: none;
    }
  }

  button {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
  }
`;

const StCancel = styled.button`
  ${FONT_M};
`;
