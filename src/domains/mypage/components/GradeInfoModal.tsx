import styled from 'styled-components';

import Main from 'common/components/Main';

import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import { IconClose } from 'static/Icons/Icons';
import { FONT_BOLD, FONT_L, FONT_M } from 'styles/textStyles';

const GradeInfoModal = () => {
  const dispatch = useAppDispatch();

  const handleClickClose = () => {
    dispatch(toggleModal({ type: 'info' }));
  };

  return (
    <StMain>
      <StHeader>
        <div />
        <h1>등급 선정기준</h1>
        <IconClose handleClick={handleClickClose} />
      </StHeader>

      <StBody>
        <StTitle>점수 획득 방법</StTitle>
        <StContents>
          <h3>&#8226; 고민투표</h3>
          <span>투표 참여 1회당 1점 획득</span>
          <span>투표 결과와 본인 투표가 일치할 경우 5점 획득</span>
        </StContents>

        <StContents>
          <h3>&#8226; 고민상담방</h3>
          <span>상담방 생성 1회당 3점 획득</span>
          <span>상담방의 방장 추천을 받은 경우 5점 획득</span>
        </StContents>
      </StBody>
    </StMain>
  );
};

export default GradeInfoModal;

const StMain = styled(Main)`
  z-index: 9;
`;

const StHeader = styled.section`
  display: grid;
  grid-template-columns: 3.2rem auto 3.2rem;
  justify-content: space-between;
  align-items: center;

  height: 6.4rem;
  margin: 0 -2rem;
  padding: 0 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.SUB_4};

  > svg {
    width: 100%;
    cursor: pointer;
  }

  h1 {
    ${FONT_L};

    > span {
      color: ${({ theme }) => theme.color.SUB_3};
    }
  }
`;

const StBody = styled.section`
  margin-top: 2rem;
`;

const StTitle = styled.h2`
  display: block;

  height: 4.4rem;

  ${FONT_BOLD};
  line-height: 4rem;
`;

const StContents = styled.article`
  display: flex;
  flex-direction: column;

  margin-top: 1.8rem;

  ${FONT_M};
  line-height: 2.1rem;

  h3 {
  }

  span {
    ${FONT_M};
    color: ${({ theme }) => theme.color.SUB_2};
    margin-left: 0.7rem;
  }
`;
