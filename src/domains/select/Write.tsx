import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import Header from 'common/components/Header';
import Main from 'common/components/Main';
import GlobalButton from 'common/elements/GlobalButton';
import ImageUpload from 'domains/select/components/ImageUpload';
import TimeSlide from 'domains/select/components/TimeSlide';
import WriteModalState from 'domains/select/components/WriteModalState';

import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import usePostSelect from 'domains/select/hooks/usePostSelect';
import { CATEGORY_ARR } from 'lib/constants/arr';
import { IconAdd, IconBack } from 'static/Icons/Icons';
import { FONT_BOLD, FONT_M, FONT_S } from 'styles/textStyles';

interface NumObject {
  [num: number]: string;
}

interface FileObject {
  [num: number]: File | null;
}

const Write = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { mutate: postSelect } = usePostSelect();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [options, setOptions] = useState<NumObject>({ 1: '', 2: '' });
  const [images, setImages] = useState<FileObject>({ 1: null, 2: null });
  const [time, setTime] = useState(1);

  const [numArr, setNumArr] = useState([1, 2]);

  //선택지 핸들러
  const handleOptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setOptions((prev) => ({ ...prev, [Number(name)]: value }));
  };

  //선택지 추가 핸들러
  const handleOptionAdd = () => {
    setNumArr([...numArr, numArr[numArr.length - 1] + 1]);
  };

  //선택지 삭제 핸들러
  const handleOptionDelete = (payload: number) => {
    setNumArr(numArr.filter((num) => num !== payload));
    setOptions((prev) => ({ ...prev, [payload]: '' }));
    setImages((prev) => ({ ...prev, [payload]: null }));
  };

  const handleSubmit = () => {
    const optionArr: string[] = Object.values(options).filter((option) => option !== '');
    const imageArr: string[] = Object.values(images).filter((image) => image !== null);

    if (imageArr.length !== 0 && optionArr.length !== imageArr.length) {
      dispatch(toggleModal({ type: 'basic', message: '사진과 선택지의 개수가 다릅니다.' }));
    } else {
      postSelect({ title, category, optionArr, imageArr, time });
    }
  };

  return (
    <>
      <WriteModalState />

      <Header>
        <IconBack handleClick={() => navigate(-1)} />
        <h1>투표 만들기</h1>
      </Header>

      <StMain>
        <StTitle>고민 작성</StTitle>
        <StTextContainer>
          <textarea
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={60}
            placeholder="고민을 작성해주세요."
            style={{ height: '8.9rem' }}
          />
          <span>{title.length}/60자</span>
        </StTextContainer>

        <StTitle>카테고리 선택</StTitle>
        <StCategoryContainer>
          {CATEGORY_ARR.slice(1).map((item) => (
            <div key={item} onClick={() => setCategory(item)}>
              <input
                type="radio"
                id={item}
                checked={category === item}
                onChange={() => setCategory(item)}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </StCategoryContainer>

        <StTitle>선택지 작성</StTitle>
        <StOptionContainer>
          {numArr.map((num, idx) => (
            <StOption key={num}>
              <div>
                <span>선택지 {idx + 1}</span>
                {numArr.length > 2 && <span onClick={() => handleOptionDelete(num)}>삭제</span>}
              </div>

              <StTextContainer>
                <textarea
                  name={String(num)}
                  value={options[num]}
                  onChange={handleOptionChange}
                  maxLength={15}
                  placeholder="선택지를 작성해주세요."
                />
                <span>{options[num]?.length || '0'}/15자</span>

                <ImageUpload setImages={setImages} num={num} />
              </StTextContainer>
            </StOption>
          ))}

          {numArr.length < 4 && (
            <GlobalButton
              onClick={handleOptionAdd}
              bgc={theme.color.WHITE}
              font={theme.color.BLACK}
            >
              <IconAdd />
              <span>선택지 추가하기</span>
            </GlobalButton>
          )}
        </StOptionContainer>

        <StTitle>투표 종료시간 선택</StTitle>
        <TimeSlide time={time} setTime={setTime} />

        <StSubmit>
          <span>투표는 등록 후 수정이 불가능하니 유의해 주세요</span>
          <GlobalButton onClick={handleSubmit}>등록하기</GlobalButton>
        </StSubmit>
      </StMain>
    </>
  );
};

export default Write;

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

const StTextContainer = styled.article`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
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

const StCategoryContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  height: 100%;
  margin-bottom: 3.2rem;
  background-color: ${({ theme }) => theme.color.WHITE};
  border-radius: 2rem;

  div {
    display: flex;
    align-items: center;

    width: 100%;
    height: 5.6rem;
    padding: 0 1.1rem;

    input {
      width: 2.2rem;
      height: 2.2rem;
      accent-color: ${({ theme }) => theme.color.BLACK};

      cursor: pointer;
    }

    label {
      ${FONT_M};
      margin-left: 1.1rem;

      cursor: pointer;
    }
  }
`;

const StOptionContainer = styled.article`
  display: flex;
  flex-direction: column;

  margin-bottom: 3.2rem;
`;

const StOption = styled.div`
  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    span {
      margin-bottom: 1.6rem;

      ${FONT_S};
      ${FONT_BOLD};
      line-height: 2.1rem;
    }

    span:nth-child(2) {
      cursor: pointer;
    }
  }
`;

const StSubmit = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin-top: 4rem;

  span {
    margin-bottom: 1.6rem;

    ${FONT_S};
    line-height: 2rem;
  }
`;
