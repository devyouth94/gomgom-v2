import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'common/components/Header';
import Main from 'common/components/Main';
import CreateModalState from 'domains/room/components/CreateModalState';

import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import { IconBack, IconErase, IconMinus, IconPlus } from 'static/Icons/Icons';
import GlobalButton from 'common/elements/GlobalButton';
import usePostChat from 'domains/room/hooks/usePostChat';
import { FONT_BOLD, FONT_L, FONT_M, FONT_S } from 'styles/textStyles';

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: chatData, mutate: postChat } = usePostChat();

  const [title, setTitle] = useState('');
  const [countPeople, setCountPeople] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [keywordArr, setKeywordArr] = useState<string[]>([]);

  const keywordHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (keywordArr.includes(keyword)) {
      dispatch(toggleModal({ type: 'basic', message: '중복된 해시태그가 존재합니다.' }));
    } else if (keyword.trim().length === 0) {
      dispatch(toggleModal({ type: 'basic', message: '태그를 입력해주세요.' }));
    } else {
      setKeywordArr((prev) => [...prev, keyword.replace(' ', '')]);
    }

    setKeyword('');
  };

  const keywordDeleteHandler = (value: string) => {
    setKeywordArr((prev) => prev.filter((i) => i !== value));
  };

  const countPlusHandler = () => {
    if (countPeople < 8) {
      setCountPeople((prev) => prev + 1);
    }
  };

  const countMinusHandler = () => {
    if (countPeople > 1) {
      setCountPeople((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    postChat({ title, hashTag: keywordArr, max: countPeople + 1 });
  };

  return (
    <>
      <CreateModalState roomKey={chatData?.roomKey} />

      <Header>
        <IconBack handleClick={() => navigate(-1)} />
        <h1>투표 만들기</h1>
      </Header>

      <StMain>
        <StTitle>고민 상담방 이름 작성</StTitle>
        <StTextContainer>
          <textarea
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={20}
            placeholder="고민 상담방 이름을 작성해주세요."
            style={{ height: '8.9rem' }}
          />
          <span>{title.length}/20자</span>
        </StTextContainer>

        <StTitle>해시태그 작성</StTitle>
        <StTextContainer>
          <StInner length={keywordArr.length}>
            {keywordArr?.map((item) => (
              <div key={item} onClick={() => keywordDeleteHandler(item)}>
                <span>#{item}</span>
                <IconErase />
              </div>
            ))}

            <form onSubmit={keywordHandler}>
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                maxLength={7}
                placeholder={
                  keywordArr.length === 0
                    ? '태그 작성 후, 엔터를 눌러 등록해주세요.(7자 이내)'
                    : '해시태그 추가'
                }
              />
            </form>
          </StInner>
          <span>{keywordArr.length}/3개</span>
        </StTextContainer>

        <StTitle>최대 참여 인원수</StTitle>
        <StSubTitle>본인을 제외한 참여자 인원을 정해주세요 (1~8명)</StSubTitle>
        <StCountContainer>
          <StCountButton onClick={countMinusHandler}>
            <IconMinus />
          </StCountButton>
          <div>{countPeople}</div>
          <StCountButton onClick={countPlusHandler}>
            <IconPlus />
          </StCountButton>
        </StCountContainer>

        <GlobalButton onClick={handleSubmit}>만들기</GlobalButton>
      </StMain>
    </>
  );
};

export default Create;

const StMain = styled(Main)`
  display: flex;
  flex-direction: column;

  padding-top: 7.4rem;
  padding-bottom: 2rem;
`;

const StTitle = styled.label`
  margin-bottom: 1.6rem;

  ${FONT_BOLD};
  line-height: 2.4rem;
`;

const StSubTitle = styled.label`
  margin-top: -1.2rem;

  ${FONT_M};
  line-height: 2.1rem;
  color: ${({ theme }) => theme.color.SUB_2};
`;

const StTextContainer = styled.article`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  height: 100%;
  min-height: 12.1rem;
  padding: 1.6rem;
  margin-bottom: 3.2rem;
  background-color: ${({ theme }) => theme.color.WHITE};
  border-radius: 2rem;

  textarea {
    width: 100%;
    height: 6.9rem;
    background-color: transparent;

    resize: none;
    border: none;

    &:focus {
      outline: none;
    }
  }

  > span {
    position: absolute;
    top: 8.6rem;
    right: 1.6rem;

    ${FONT_S};
    line-height: 2rem;
    color: ${({ theme }) => theme.color.SUB_1};
  }
`;

const StInner = styled.article<{ length: number }>`
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.8rem;
  row-gap: 1rem;

  div {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    height: 3.2rem;
    padding: 1.1rem 0.7rem 1.1rem 1.1rem;
    background-color: ${({ theme }) => theme.color.SUB_4};

    border-radius: 1.6rem;

    cursor: pointer;

    span {
      ${FONT_M};
    }
  }

  input {
    display: ${(props) => (props.length >= 3 ? 'none' : 'block')};

    width: ${(props) => (props.length === 0 ? '210%' : null)};
    height: 3.2rem;
    background-color: transparent;

    border: none;

    &:focus {
      outline: none;
    }
  }
`;

const StCountContainer = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 7.6rem;
  padding: 1.4rem;
  margin-top: 2rem;
  margin-bottom: 3.2rem;
  background-color: ${({ theme }) => theme.color.WHITE};
  border-radius: 2rem;

  & > div:nth-child(2) {
    ${FONT_BOLD};
    ${FONT_L};
  }
`;

const StCountButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4.8rem;
  height: 4.8rem;
  background-color: ${({ theme }) => theme.color.SUB_4};

  border-radius: 1.4rem;

  cursor: pointer;
`;
