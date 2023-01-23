interface Props {
  handleClick: () => void;
}

const IconWrite = ({ handleClick }: Props) => {
  return (
    <svg
      onClick={handleClick}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="50" height="50" rx="25" fill="#FF9B25" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.25 16.25C26.25 15.5596 25.6904 15 25 15C24.3096 15 23.75 15.5596 23.75 16.25V23.75H16.25C15.5596 23.75 15 24.3096 15 25C15 25.6904 15.5596 26.25 16.25 26.25H23.75V33.75C23.75 34.4404 24.3096 35 25 35C25.6904 35 26.25 34.4404 26.25 33.75V26.25H33.75C34.4404 26.25 35 25.6904 35 25C35 24.3096 34.4404 23.75 33.75 23.75H26.25V16.25Z"
        fill="#FFFEFC"
      />
    </svg>
  );
};

export default IconWrite;
