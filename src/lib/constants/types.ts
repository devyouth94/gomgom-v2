export interface SelectItemProps {
  category: string;
  completion: boolean;
  deadLine: string;
  nickname: string;
  options: string[];
  selectKey: number;
  title: string;
  total: number;
}

export interface DetailItemProps {
  category: string;
  completion: boolean;
  deadLine: string;
  image: string[];
  nickname: string;
  options: string[];
  point: number;
  selectKey: number;
  title: string;
  userKey: number;
}

export interface VoteResultProps {
  msg: string;
  ok: boolean;
  result: {
    [x: number]: number;
    total: number;
    isVote?: number;
  };
}

export interface VoteReturnData {
  msg: string;
  ok: boolean;
  vote: {
    [x: number]: number;
  };
  result: {
    total: number;
    isVote: number;
  };
}

export interface LocationState {
  state: {
    now: string;
  };
}
