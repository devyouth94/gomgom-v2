import styled from 'styled-components';

import ProfileImg from 'common/elements/ProfileImg';
import type { DetailItemProps } from 'lib/constants/types';
import { remainedTime } from 'lib/utils/timeCalculation';
import { FONT_EXTRABOLD, FONT_L, FONT_M } from 'styles/textStyles';
import { IconTimeover, IconTimeWarning } from 'static/Icons/Icons';

interface Props {
  info: DetailItemProps;
}

const DetailInfo = ({ info }: Props) => {
  return (
    <S.InfoContainer>
      <ProfileImg point={info.point} size="4rem" />
      <S.Nickname>{info.nickname}</S.Nickname>
      <S.Category>{info.category}</S.Category>
      <S.Title>{info.title}</S.Title>
      <S.DeadLine>
        {info.completion ? (
          <>
            <IconTimeover />
            <span className="timeover">투표마감</span>
          </>
        ) : (
          <>
            <IconTimeWarning />
            <span className="deadline">{remainedTime(info.deadLine)}</span>
          </>
        )}
      </S.DeadLine>
    </S.InfoContainer>
  );
};

export default DetailInfo;

const S = {
  InfoContainer: styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Nickname: styled.div`
    margin-top: 0.2rem;

    ${FONT_M}
    line-height: 2.1rem;
    color: ${({ theme }) => theme.color.SUB_2};
  `,

  Category: styled.div`
    padding: 0 0.4rem;
    margin-top: 2rem;
    background-color: ${({ theme }) => theme.color.MAIN_2};

    border-radius: calc(2.1rem / 2);

    ${FONT_M};
    line-height: 2.1rem;
    color: ${({ theme }) => theme.color.WHITE};
  `,

  Title: styled.div`
    width: 100%;
    margin: 0.8rem 2rem;

    ${FONT_L};
    ${FONT_EXTRABOLD};
    line-height: 3rem;
    text-align: center;

    word-wrap: break-word;
    word-break: break-all;
  `,

  DeadLine: styled.div`
    display: flex;
    align-items: center;
    gap: 0.35rem;

    margin-top: 0.8rem;

    ${FONT_M};

    .deadline {
      color: ${({ theme }) => theme.color.WARN};
    }

    .timeover {
      color: ${({ theme }) => theme.color.SUB_2};
    }
  `,
};
