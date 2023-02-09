import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Header from 'common/components/Header';
import Main from 'common/components/Main';
import DetailInfo from 'domains/select/components/DetailInfo';
import DetailVote from 'domains/select/components/DetailVote';
import Comment from 'domains/select/components/Comment';
import CommentInput from 'domains/select/components/CommentInput';
import DetailModalState from 'domains/select/components/DetailModalState';

import { useAppDispatch } from 'app/config/hooks';
import { toggleModal } from 'app/module/modalSlice';
import useGetComment from 'domains/select/hooks/useGetComment';
import useGetDetail from 'domains/select/hooks/useGetDetail';
import { userStorage } from 'lib/utils/storage';
import { IconBack, IconDelete } from 'static/Icons/Icons';
import { FONT_M } from 'styles/textStyles';

const Detail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: info, status: infoStatus } = useGetDetail();
  const { data: comments, status: commentStatus } = useGetComment();

  return (
    <>
      <DetailModalState />

      <Header>
        <IconBack handleClick={() => navigate(-1)} />
        <div />
        {userStorage.getUserKey() === info?.result.userKey && (
          <IconDelete handleClick={() => dispatch(toggleModal({ type: 'delete' }))} />
        )}
      </Header>

      <StMain>
        {infoStatus === 'success' && (
          <>
            <DetailInfo info={info.result} />
            <DetailVote options={info.result.options} image={info.result.image} />
          </>
        )}

        {commentStatus === 'success' && (
          <StCommentContainer length={comments.length}>
            {!comments.length && <span>댓글이 없습니다.</span>}
            {comments.map((comment) => (
              <Comment key={comment.commentKey} comment={comment} />
            ))}
          </StCommentContainer>
        )}
      </StMain>

      <CommentInput />
    </>
  );
};

export default Detail;

const StMain = styled(Main)`
  padding-top: 6.4rem;
  padding-bottom: 6.4rem;
`;

const StCommentContainer = styled.section<{ length: number }>`
  padding-bottom: 2.4rem;
  margin: 0 -2rem;

  ${(props) =>
    !props.length &&
    css`
      border-top: 1px solid ${({ theme }) => theme.color.SUB_4};
    `}

  > span {
    display: block;
    width: 100%;
    margin: 4rem 0 4rem 0;

    text-align: center;
    ${FONT_M};
  }
`;
