export interface BoxValueProps {
  id: number;
  isBlank: boolean;
  row: number;
  col: number;
  player: string | null;
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
