import styled from 'styled-components';

import { FONT_M } from 'styles/textStyles';

interface Props {
  selectedGrade: number;
}

const pointFromGrade = (selectedGrade: number) => {
  switch (selectedGrade) {
    case 1:
      return '0~10점';
    case 2:
      return '11~25점';
    case 3:
      return '26~50점';
    case 4:
      return '51~100점';
    case 5:
      return '101점 이상';
    default:
      return '';
  }
};

const GradeInfo = ({ selectedGrade }: Props) => {
  return (
    <StContainer>
      {`'고민 서비스 참여를 통해 ${pointFromGrade(selectedGrade)}을 획득했을 때'`}
    </StContainer>
  );
};

export default GradeInfo;

const StContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 7rem;
  margin: 0 -2rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.SUB_4};

  ${FONT_M};
`;
