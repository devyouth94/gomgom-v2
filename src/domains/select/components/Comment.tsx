import { useState } from 'react';
import { useAppDispatch } from 'app/config/hooks';
import styled, { css } from 'styled-components';

import ProfileImg from 'common/elements/ProfileImg';
import Recomment from 'domains/select/components/Recomment';

import { toggleModal } from 'app/module/modalSlice';
import useDeleteComment from 'domains/select/hooks/useDeleteComment';
import usePutComment from 'domains/select/hooks/usePutComment';
import usePostRecomment from 'domains/select/hooks/usePostRecomment';
import type { CommentItemProps } from 'lib/constants/types';
import { remainedTime } from 'lib/utils/timeCalculation';
import { userStorage } from 'lib/utils/storage';
import { FONT_BOLD, FONT_EXTRABOLD, FONT_M, FONT_XS } from 'styles/textStyles';

interface Props {
  comment: CommentItemProps;
}

const Comment = ({ comment }: Props) => {
  const dispatch = useAppDispatch();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyComment, setReplyComment] = useState('');

  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: putComment } = usePutComment(setIsEditMode);
  const { mutate: postRecomment } = usePostRecomment(setIsReplyMode);

  const handleEditToggle = (comment: string) => {
    setIsEditMode((prev) => !prev);
    setNewComment(comment);
  };

  const handleReplyToggle = () => {
    setIsReplyMode((prev) => !prev);
  };

  const handleEditComment = (commentKey: number) => {
    if (!newComment.trim().length) {
      dispatch(toggleModal({ type: 'basic', message: '내용을 입력해주세요.' }));
      return;
    }

    putComment({ commentKey, comment: newComment });
  };

  const handleDeleteComment = (commentKey: number) => {
    deleteComment(commentKey);
  };

  const handlePostRecomment = (commentKey: number) => {
    if (!replyComment.trim().length) {
      dispatch(toggleModal({ type: 'basic', message: '내용을 입력해주세요.' }));
      return;
    }

    postRecomment({ commentKey, comment: replyComment });
    setReplyComment('');
  };

  return (
    <StComment key={comment.commentKey}>
      <ProfileImg point={comment.point} size="4rem" />
      <div>
        <StTop>
          <div>
            <span>{comment.nickname}</span>
            <span>{remainedTime(comment.updatedAt)} 전</span>
          </div>
          {userStorage.getUserKey() === comment.userKey ? (
            isEditMode ? (
              <div>
                <span onClick={() => handleEditComment(comment.commentKey)}>완료</span>
                <span onClick={() => setIsEditMode((prev) => !prev)}>취소</span>
              </div>
            ) : (
              <div>
                <span onClick={() => handleEditToggle(comment.comment)}>수정</span>
                <span onClick={() => handleDeleteComment(comment.commentKey)}>삭제</span>
              </div>
            )
          ) : null}
        </StTop>

        <StMiddle>
          {isEditMode ? (
            <input value={newComment} onChange={(event) => setNewComment(event.target.value)} />
          ) : (
            comment.comment
          )}
        </StMiddle>

        <StBottom isReplyMode={isReplyMode}>
          {isReplyMode ? (
            <>
              <span onClick={handleReplyToggle}>답글 취소</span>
              <div>
                <input
                  value={replyComment}
                  onChange={(event) => setReplyComment(event.target.value)}
                  placeholder="답글을 남겨주세요"
                />
                <span onClick={() => handlePostRecomment(comment.commentKey)}>등록</span>
              </div>
            </>
          ) : (
            <span onClick={handleReplyToggle}>답글 달기</span>
          )}
        </StBottom>

        <StReplyContainer>
          {comment.recomment?.map((recomment) => (
            <Recomment key={recomment.recommentKey} recomment={recomment} />
          ))}
        </StReplyContainer>
      </div>
    </StComment>
  );
};

export default Comment;

const StComment = styled.article`
  display: grid;
  grid-template-columns: 4rem auto;
  gap: 1.6rem;

  padding: 2.4rem 2rem 0 2rem;
  border-top: 1px solid ${({ theme }) => theme.color.SUB_4};

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

const StBottom = styled.div<{ isReplyMode: boolean }>`
  ${FONT_M};

  > span {
    color: ${({ theme }) => theme.color.MAIN_2};
    cursor: pointer;
  }

  ${(props) =>
    props.isReplyMode &&
    css`
      > div {
        display: grid;
        grid-template-columns: auto 2.2rem;
        align-items: center;
        gap: 0.8rem;

        margin-top: 1rem;

        input {
          padding: 0.5rem 1rem;
          border-radius: 999rem;
          background-color: ${({ theme }) => theme.color.WHITE};
        }

        span {
          ${FONT_XS};
          ${FONT_EXTRABOLD};

          cursor: pointer;
        }
      }
    `}
`;

const StReplyContainer = styled.span`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  margin-top: 1rem;
`;
