export interface BoxValueProps {
  id: number;
  isBlank: boolean;
  row: number;
  col: number;
  player: 1 | 2 | undefined;
}

export interface UserDetails {
  id: string;
  username: string;
  avatar?: string;
  is_guest: boolean;
}

export interface SignUpDetails {
  username: string;
  email: string;
  password: string;
  isGuest: boolean;
}
