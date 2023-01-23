import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { SelectItemProps } from 'lib/constants/types';
import { remainedTime } from 'lib/utils/timeCalculation';
import { IconLeftTime, IconPeople, IconTimeover } from 'static/Icons/Icons';
import { FONT_BOLD, FONT_M, FONT_S } from 'styles/textStyles';

interface Props {
  item: SelectItemProps;
  pathname: string;
}

const SelectItem = ({ item, pathname }: Props) => {
  const navigate = useNavigate();

  const handleEnterDetail = () => {
    navigate(`/select/${item.selectKey}`, { state: { now: pathname } });
  };

  return (
    <StContainer onClick={handleEnterDetail} completion={item.completion}>
      <StHeader completion={item.completion}>
        <span>{item.category}</span>
        <span>
          작성자 <span>{item.nickname}</span>
        </span>
      </StHeader>

      <StBody completion={item.completion}>
        <span>{item.title}</span>
        <span>{item.options?.join(' vs ')}</span>
      </StBody>

      <StFooter>
        <div>
          <IconPeople />
          <span>{item.total}</span>
        </div>
        <div>
          {item.completion ? (
            <>
              <IconTimeover />
              <span>투표마감</span>
            </>
          ) : (
            <>
              <IconLeftTime />
              <span>{remainedTime(item.deadLine)} 남음</span>
            </>
          )}
        </div>
      </StFooter>
    </StContainer>
  );
};

export default SelectItem;

interface Completion {
  completion: boolean;
}

const StContainer = styled.div<Completion>`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  height: 13.9rem;
  padding: 1.6rem;
  background-color: ${(props) =>
    props.completion ? props.theme.color.SUB_4 : props.theme.color.WHITE};
  border-radius: 2rem;

  cursor: pointer;
`;

const StHeader = styled.div<Completion>`
  position: absolute;
  top: 1.6rem;

  display: flex;
  align-items: center;
  gap: 0.4rem;

  width: 100%;

  > span:nth-child(1) {
    padding: 0 0.6rem;
    background-color: ${(props) =>
      props.completion ? props.theme.color.MAIN_4 : props.theme.color.MAIN_2};

    border-radius: 1rem;

    ${FONT_S};
    line-height: 2rem;
    color: ${({ theme }) => theme.color.WHITE};
  }

  > span:nth-child(2) {
    ${FONT_S};
    line-height: 2rem;
    color: ${({ theme }) => theme.color.SUB_2};

    span {
      ${FONT_BOLD};
    }
  }
`;

const StBody = styled.div<Completion>`
  display: flex;
  flex-direction: column;

  width: 100%;

  > span {
    width: 100%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > span:nth-child(1) {
    margin-top: 2.6rem;

    ${FONT_BOLD};
    line-height: 2.1rem;
    color: ${(props) => (props.completion ? props.theme.color.SUB_2 : props.theme.color.BLACK)};
  }

  > span:nth-child(2) {
    margin-top: 0.4rem;

    ${FONT_M}
    line-height: 1.8rem;
    color: ${({ theme }) => theme.color.SUB_2};
  }
`;

const StFooter = styled.div`
  position: absolute;
  bottom: 1.6rem;

  display: flex;
  align-items: center;

  width: 100%;

  > div {
    display: flex;
    align-items: center;
    gap: 0.4rem;

    ${FONT_S};
    color: ${({ theme }) => theme.color.SUB_2};
  }

  > div:nth-child(2) {
    position: absolute;
    right: 3.6rem;
  }
`;
