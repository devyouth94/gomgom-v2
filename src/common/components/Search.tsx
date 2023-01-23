import { useState } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from 'app/config/hooks';
import { changeSelected } from 'app/module/selectSlice';
import { IconSearch } from 'static/Icons/Icons';
import { FONT_M } from 'styles/textStyles';

interface Props {
  text: string;
}

const Search = ({ text }: Props) => {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.select.selected);

  const [searchWord, setSearchWord] = useState(query || '');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleCancel = () => {
    if (!query) return;

    dispatch(changeSelected({ value: 'query', item: '' }));
    setSearchWord('');
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(changeSelected({ value: 'query', item: searchWord }));
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleOnSubmit}>
        <input value={searchWord} onChange={handleOnChange} maxLength={10} placeholder={text} />
        <button type="submit">
          <IconSearch />
        </button>
      </S.Form>

      <S.Cancel onClick={handleCancel}>{query ? '초기화' : '취소'}</S.Cancel>
    </S.Container>
  );
};

export default Search;

const S = {
  Container: styled.section`
    position: sticky;
    top: 6.4rem;

    display: grid;
    grid-template-columns: auto 6rem;
    align-items: center;

    width: 100%;
    height: 6.4rem;
    padding: 0 2rem;
    background-color: ${({ theme }) => theme.color.BG};

    z-index: 9;
  `,

  Form: styled.form`
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
  `,

  Cancel: styled.button`
    ${FONT_M};
  `,
};
