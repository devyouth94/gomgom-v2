export const remainedTime = (value: string) => {
  const time = Math.abs(Number(new Date(value)) - Number(new Date()));

  const minutes = time / 60000;
  if (minutes < 60) return `${Math.floor(minutes)}분`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일`;

  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주`;

  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월`;
};

export const commentTime = (value: string) => {
  const time = Math.abs(Number(new Date(value)) - Number(new Date()));

  const minutes = time / 60000;
  if (minutes < 1) return `방금`;
  if (minutes < 60) return `${Math.floor(minutes)}분`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일`;

  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주`;

  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월`;
};

export const nowTime = (value: string) => {
  const date = new Date(value);

  return date.toLocaleTimeString('ko-kr').slice(0, -3);
};
