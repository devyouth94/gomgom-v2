import styled from 'styled-components';

import { colorFromPoint, remainedPoint } from 'lib/utils/pointCalculation';
import { FONT_BOLD, FONT_M } from 'styles/textStyles';
import { IconInfomation } from 'static/Icons/Icons';
import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';

interface Props {
  point?: number;
  selectedGrade: number;
  handleSelectGrade: (idx: number) => void;
}

const GradeContainer = ({ point = 0, selectedGrade, handleSelectGrade }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <StMyGrade>
        <div>
          <span>현재 등급</span>
          <span>{colorFromPoint(point)}</span>
        </div>

        <div>
          <span>모은 점수</span>
          <span>{point}점</span>
        </div>

        <div>
          <span>다음 등급까지</span>
          <span>{remainedPoint(point)}점 남음</span>
        </div>
      </StMyGrade>

      <StGradeInfo selectedGrade={selectedGrade}>
        <div>
          <span>등급 별 달성 조건</span>
          <IconInfomation handleClick={() => dispatch(toggleModal({ type: 'info' }))} />
        </div>

        <div>
          {['White', 'Yellow', 'Green', 'Blue', 'Purple'].map((color, idx) => (
            <span key={idx} onClick={() => handleSelectGrade(idx)}>
              {color}
            </span>
          ))}
        </div>
      </StGradeInfo>
    </>
  );
};

export default GradeContainer;

const StMyGrade = styled.article`
  display: grid;
  grid-template-columns: 30% 30% 40%;

  height: 6.7rem;

  border: 1px solid ${({ theme }) => theme.color.SUB_4};
  border-radius: 2rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.1rem;

    > span:nth-child(1) {
      ${FONT_M};
      ${FONT_BOLD};
    }

    > span:nth-child(2) {
      ${FONT_M};
      color: ${({ theme }) => theme.color.MAIN_2};
    }
  }

  > div:nth-child(2) {
    margin: 1rem 0;
    border-left: 1px solid ${({ theme }) => theme.color.SUB_4};
    border-right: 1px solid ${({ theme }) => theme.color.SUB_4};
  }
`;

const StGradeInfo = styled.article<{ selectedGrade: number }>`
  margin-top: 2.4rem;

  svg {
    cursor: pointer;
  }

  > div:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 0.7rem;

    ${FONT_BOLD};
  }

  > div:nth-child(2) {
    display: flex;
    justify-content: space-between;

    margin-top: 1.6rem;

    ${FONT_M};
    color: ${({ theme }) => theme.color.SUB_2};

    span {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 2.1rem;
      padding: 0 0.6rem;
      border-radius: 999rem;

      cursor: pointer;
    }

    > span:nth-child(${(props) => props.selectedGrade}) {
      color: ${({ theme }) => theme.color.WHITE};
      background-color: ${(props) =>
        props.selectedGrade === 1
          ? '#D0D0D0'
          : props.selectedGrade === 2
          ? '#fdd74f'
          : props.selectedGrade === 3
          ? '#91dc6e'
          : props.selectedGrade === 4
          ? '#70a0ff'
          : '#a57aff'};
    }
  }
`;
