import { useState } from 'react';
import styled from 'styled-components';

import ProfileImg from 'common/elements/ProfileImg';

import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import usePutRecomment from 'domains/select/hooks/usePutRecomment';
import useDeleteRecomment from 'domains/select/hooks/useDeleteRecomment';
import type { RecommentItemProps } from 'lib/constants/types';
import { remainedTime } from 'lib/utils/timeCalculation';
import { userStorage } from 'lib/utils/storage';
import { FONT_BOLD, FONT_EXTRABOLD, FONT_M, FONT_XS } from 'styles/textStyles';

interface Props {
  recomment: RecommentItemProps;
}

const Recomment = ({ recomment }: Props) => {
  const dispatch = useAppDispatch();

  const [isEditMode, setIsEditMode] = useState(false);
  const [newRecomment, setNewRecomment] = useState('');

  const { mutate: putRecomment } = usePutRecomment(setIsEditMode);
  const { mutate: deleteRecomment } = useDeleteRecomment();

  const handleEditToggle = (comment: string) => {
    setIsEditMode((prev) => !prev);
    setNewRecomment(comment);
  };

  const handleEditRecomment = (recommentKey: number) => {
    if (!newRecomment.trim().length) {
      dispatch(toggleModal({ type: 'basic', message: '내용을 입력해주세요.' }));
      return;
    }

    putRecomment({ recommentKey, comment: newRecomment });
  };

  const handleDeleteRecomment = (recommentKey: number) => {
    deleteRecomment(recommentKey);
  };

  return (
    <StRecommentContainer>
      <ProfileImg point={recomment.User.point} size="3rem" />
      <div>
        <StTop>
          <div>
            <span>{recomment.User.nickname}</span>
            <span>{remainedTime(recomment.updatedAt)} 전</span>
          </div>
          {userStorage.getUserKey() === recomment.userKey ? (
            isEditMode ? (
              <div>
                <span onClick={() => handleEditRecomment(recomment.recommentKey)}>완료</span>
                <span onClick={() => setIsEditMode((prev) => !prev)}>취소</span>
              </div>
            ) : (
              <div>
                <span onClick={() => handleEditToggle(recomment.comment)}>수정</span>
                <span onClick={() => handleDeleteRecomment(recomment.recommentKey)}>삭제</span>
              </div>
            )
          ) : null}
        </StTop>

        <StMiddle>
          {isEditMode ? (
            <input value={newRecomment} onChange={(event) => setNewRecomment(event.target.value)} />
          ) : (
            recomment.comment
          )}
        </StMiddle>
      </div>
    </StRecommentContainer>
  );
};

export default Recomment;

const StRecommentContainer = styled.section`
  display: grid;
  grid-template-columns: 3rem auto;
  gap: 1.6rem;
  margin-bottom: 2rem;

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const StTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div:nth-child(1) {
    display: flex;
    align-items: center;

    > span:nth-child(1) {
      ${FONT_M};
      ${FONT_BOLD};
    }

    > span:nth-child(2) {
      margin-left: 0.8rem;

      ${FONT_XS};
      color: ${({ theme }) => theme.color.SUB_2};
    }
  }

  > div:nth-child(2) {
    display: flex;
    gap: 1.6rem;

    span {
      ${FONT_XS};
      ${FONT_EXTRABOLD};

      cursor: pointer;
    }
  }
`;

const StMiddle = styled.div`
  ${FONT_M};
  line-height: 2rem;

  input {
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 999rem;
    background-color: ${({ theme }) => theme.color.WHITE};
  }
`;
