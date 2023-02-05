import styled from 'styled-components';

import { colorFromPoint } from 'lib/utils/pointCalculation';
import { FONT_BOLD, FONT_S } from 'styles/textStyles';

interface Props {
  point: number;
}

const Badge = ({ point }: Props) => {
  return <StBadge point={point}>{colorFromPoint(point)}</StBadge>;
};

const StBadge = styled.div<{ point: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;
  height: 2rem;
  padding: 0 0.6rem;
  background-color: ${(props) =>
    0 <= props.point && props.point <= 10
      ? '#D0D0D0;'
      : 11 <= props.point && props.point <= 25
      ? '#fdd74f'
      : 26 <= props.point && props.point <= 50
      ? '#91dc6e'
      : 51 <= props.point && props.point <= 100
      ? '#70a0ff'
      : 101 <= props.point
      ? '#a57aff'
      : null};

  border-radius: 99rem;

  ${FONT_BOLD};
  ${FONT_S};
  color: ${({ theme }) => theme.color.WHITE};
`;

export default Badge;
