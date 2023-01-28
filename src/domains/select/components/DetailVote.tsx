import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import useGetVote from 'domains/select/hooks/useGetVote';
import usePostVote from 'domains/select/hooks/usePostVote';
import { FONT_BOLD, FONT_EXTRABOLD, FONT_M, FONT_XL } from 'styles/textStyles';

interface Props {
  options: string[];
  image: string[];
}

const DetailVote = ({ options, image }: Props) => {
  const { selectKey } = useParams();
  const [selectedNumber, setSelectedNumber] = useState(0);

  const { data: vote } = useGetVote(Number(selectKey));
  const { mutate: postVote } = usePostVote({ selectKey: Number(selectKey), selectedNumber });

  return (
    <>
      {vote?.msg.includes('성공') ? (
        <StResultContainer>
          {options?.map((option, idx) => (
            <StResult bgImage={image[idx]} key={idx}>
              <div>{vote?.vote[idx + 1]}%</div>
              <div>{option}</div>
            </StResult>
          ))}
        </StResultContainer>
      ) : (
        <StVoteContainer isSelect={selectedNumber} image={image}>
          {options?.map((option, idx) => (
            <StVote bgImage={image[idx]} key={idx} onClick={() => setSelectedNumber(idx + 1)}>
              <input
                type="radio"
                hidden
                id={option}
                checked={selectedNumber === idx + 1}
                onChange={() => setSelectedNumber(idx + 1)}
              />
              <label htmlFor={option}>{option}</label>
              <StButton onClick={() => postVote()}>클릭 후 투표</StButton>
            </StVote>
          ))}
        </StVoteContainer>
      )}
    </>
  );
};

export default DetailVote;

interface BgImageProps {
  bgImage: string;
}

interface ImageProps {
  isSelect: number;
  image: string[];
}

const StButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4.8rem;
  background-color: ${({ theme }) => theme.color.WHITE};
  border-radius: 1.5rem;

  ${FONT_BOLD};
`;

const StResultContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  height: 100%;
  padding: 2rem;
  margin: 2.4rem 0 4.8rem 0;
  background-color: ${({ theme }) => theme.color.SUB_5};

  border-radius: 2rem;
`;

const StResult = styled.article<BgImageProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  height: 15rem;
  padding: 2.65rem 1.6rem;
  background-color: ${(props) =>
    props.bgImage ? props.theme.color.WHITE : props.theme.color.MAIN_2};
  border-radius: 20px;

  color: ${({ theme }) => theme.color.WHITE};

  //투표 결과 퍼센트
  div:nth-child(1) {
    ${FONT_XL};
    ${FONT_EXTRABOLD};
    line-height: 4.8rem;
  }

  //투표 선택지 이름
  div:nth-child(2) {
    ${FONT_M};
    line-height: 2.1rem;
  }

  ${(props) =>
    props.bgImage &&
    css<BgImageProps>`
      background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${(props) => props.bgImage});
      background-size: cover;
      background-position: center center;

      color: ${({ theme }) => theme.color.WHITE};
      text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
    `}
`;

const StVoteContainer = styled.section<ImageProps>`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  padding: 2rem;
  margin: 2.4rem 0 4.8rem 0;
  background-color: ${({ theme }) => theme.color.SUB_5};

  border-radius: 2rem;

  //클릭한 선택지 CSS
  & > div:nth-child(${(props) => props.isSelect}) {
    display: flex;
    justify-content: space-between;

    background-color: ${({ theme }) => theme.color.MAIN_2};

    transition-duration: 0.3s;

    ${(props) =>
      props.image?.[0] &&
      css<ImageProps>`
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url(${(props) => props.image[props.isSelect - 1]});
        background-size: cover;
        background-position: center center;
      `}

    //클릭한 선택지의 이름
      label {
      color: ${({ theme }) => theme.color.WHITE};
      line-height: 2.4rem;
    }

    //클릭 후 투표 버튼
    button {
      display: flex;
    }
  }
`;

const StVote = styled.div<BgImageProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 15rem;
  padding: 2.6rem 1.6rem;
  background-color: ${({ theme }) => theme.color.WHITE};
  border-radius: 20px;

  ${FONT_BOLD};

  cursor: pointer;

  //클릭 후 투표 버튼
  //안보이다가 onclick 발생시 위의 코드에서 block으로 바뀝니다
  button {
    display: none;
  }

  //이미지 선택지면 글씨 컬러 흰색, 그림자 효과
  ${(props) =>
    props.bgImage &&
    css<BgImageProps>`
      background-image: url(${(props) => props.bgImage});
      background-size: cover;
      background-position: center center;

      label {
        color: #fff;
        text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
      }
    `}
`;
