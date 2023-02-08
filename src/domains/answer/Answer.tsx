import styled from 'styled-components';

import StartDisplay from 'domains/answer/components/StartDisplay';
import Header from 'common/components/Header';
import Main from 'common/components/Main';
import GlobalButton from 'common/elements/GlobalButton';
import Nav from 'common/components/Nav';

import useAnswerState from 'domains/answer/hooks/useAnswerState';
import Logo from 'static/images/Logo';
import { ReactComponent as ImageBubble1 } from 'static/images/speach bubble1.svg';
import { ReactComponent as ImageBubble2 } from 'static/images/speach bubble2.svg';
import { ReactComponent as ImageCharacter1 } from 'static/images/Character1.svg';
import { ReactComponent as ImageCharacter2 } from 'static/images/Character2.svg';
import { FONT_BOLD } from 'styles/textStyles';

const Answer = () => {
  const { think, answer, clickAnswerHandler } = useAnswerState();

  return (
    <>
      <StartDisplay />

      <StHeader>
        <Logo handleClick={() => window.location.reload()} />
      </StHeader>

      <StMain>
        <StContent>
          {answer ? (
            <>
              <ImageBubble2 />
              <ImageCharacter2 />
            </>
          ) : (
            <>
              <ImageBubble1 />
              <ImageCharacter1 />
            </>
          )}

          {think ? (
            <span>곰곰이 생각하는 중...</span>
          ) : answer ? (
            <span>{answer}</span>
          ) : (
            <span className="center">
              고민을 떠올리고 <br />
              하단 버튼을 눌러주세요
            </span>
          )}
        </StContent>

        <GlobalButton onClick={clickAnswerHandler} position="absolute" bottom="9.6rem">
          {answer ? '곰곰의 해답 다시 듣기' : '곰곰의 해답 듣기'}
        </GlobalButton>
      </StMain>

      <Nav />
    </>
  );
};

export default Answer;

const StHeader = styled(Header)`
  grid-template-columns: 4.5rem auto 3.2rem !important;
  background-color: transparent;
`;

const StMain = styled(Main)`
  background: radial-gradient(15rem 32rem at 50% 45%, #ff9b25 0%, #000000 82.03%);
  padding: 0;

  border-left: 2rem solid transparent;
  border-right: 2rem solid transparent;
`;

const StContent = styled.section`
  position: absolute;
  left: 50%;
  top: 44%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 41.4rem;

  svg:nth-child(1) {
    position: absolute;
    top: 0;
  }

  svg:nth-child(2) {
    position: absolute;
    bottom: 0;
  }

  span {
    position: absolute;
    left: 50%;
    top: 1.9rem;
    transform: translateX(-50%);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 21rem;
    height: 6rem;
    background-color: #f8f3eb;

    ${FONT_BOLD};
    line-height: 2.4rem;

    z-index: 9;
  }

  .center {
    text-align: center;
  }
`;
