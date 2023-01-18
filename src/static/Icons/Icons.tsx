interface Props {
  handleClick?: () => void;
}

export const IconOnboarding = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.5 6L10.5 16L21.5 26"
        stroke="#95918C"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IconBack = ({ handleClick }: Props) => {
  return (
    <svg
      onClick={handleClick}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.1906 22.2849L4.82695 16.7343C4.71829 16.6391 4.63647 16.5258 4.58149 16.3945C4.52716 16.2625 4.5 16.1369 4.5 16.0176C4.5 15.8742 4.52716 15.7429 4.58149 15.6236C4.63647 15.5037 4.71829 15.3841 4.82695 15.2648L11.2318 9.67895C11.3411 9.55965 11.491 9.5 11.6815 9.5C11.8726 9.5 12.0363 9.5717 12.1724 9.71509C12.336 9.83439 12.4179 9.97175 12.4179 10.1272C12.4179 10.2826 12.336 10.432 12.1724 10.5754L6.66785 15.4085H26.8049C27.0228 15.4085 27.193 15.4621 27.3154 15.5694C27.4385 15.6772 27.5 15.8266 27.5 16.0176C27.5 16.1851 27.4385 16.3285 27.3154 16.4478C27.193 16.5671 27.0228 16.6268 26.8049 16.6268H6.66785L12.2136 21.4598C12.3229 21.5556 12.3841 21.6873 12.3972 21.8547C12.411 22.0217 12.336 22.165 12.1724 22.2849C12.0363 22.4283 11.8795 22.5 11.7021 22.5C11.5247 22.5 11.3542 22.4283 11.1906 22.2849Z"
        fill="#1E1D1D"
      />
    </svg>
  );
};

export const IconJoin = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.16228 14.8141C6.93564 14.5771 6.94789 14.2048 7.18964 13.9826L11.5227 10L7.18964 6.01738C6.94789 5.79518 6.93564 5.42293 7.16228 5.18592C7.38892 4.94891 7.76862 4.9369 8.01037 5.1591L12.8104 9.57086C12.9314 9.68207 13 9.83741 13 10C13 10.1626 12.9314 10.3179 12.8104 10.4291L8.01037 14.8409C7.76862 15.0631 7.38892 15.0511 7.16228 14.8141Z"
        fill="#1E1D1D"
      />
    </svg>
  );
};
