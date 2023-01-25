import styled from 'styled-components';

import {
  ProfileBlue,
  ProfileGreen,
  ProfilePurple,
  ProfileWhite,
  ProfileYellow,
} from 'static/Icons/Profile';

interface Props {
  className?: string;
  point: number;
  size?: string;
}

const ProfileImg = ({ className, point, size }: Props) => {
  return (
    <Profile className={className} size={size}>
      {0 <= point && point <= 10 ? (
        <ProfileWhite />
      ) : 11 <= point && point <= 25 ? (
        <ProfileYellow />
      ) : 26 <= point && point <= 50 ? (
        <ProfileGreen />
      ) : 51 <= point && point <= 100 ? (
        <ProfileBlue />
      ) : 101 <= point ? (
        <ProfilePurple />
      ) : null}
    </Profile>
  );
};
export default ProfileImg;

const Profile = styled.div<{ size: string | undefined }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => props.size || '100%'};
  height: ${(props) => props.size || '100%'};

  border-radius: 50%;

  img {
    width: 100%;
  }
`;
