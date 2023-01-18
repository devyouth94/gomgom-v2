import styled from 'styled-components';

interface Props {
  pagination: number;
}

const Navi = ({ pagination }: Props) => {
  return (
    <>
      {pagination < 4 && (
        <StNavi pagination={pagination}>
          {[1, 2, 3].map((i) => (
            <div key={i} />
          ))}
        </StNavi>
      )}
    </>
  );
};

export default Navi;

const StNavi = styled.div<Props>`
  position: absolute;
  top: 4rem;
  right: 4rem;

  display: flex;
  gap: 0.8rem;

  width: 4rem;
  height: 0.8rem;

  div {
    width: 0.8rem;
    height: 0.8rem;
    background-color: ${({ theme }) => theme.color.SUB_3};
    border-radius: 50%;
  }

  div:nth-child(${(props) => props.pagination}) {
    background-color: ${({ theme }) => theme.color.SUB_1};
  }

  z-index: 9;
`;
