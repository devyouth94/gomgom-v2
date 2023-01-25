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
