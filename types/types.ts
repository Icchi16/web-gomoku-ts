import { BoardSliceProps } from "@/store/boardSlice";

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
  username: string | null;
  email: string;
  password: string;
  isGuest: boolean;
}

export interface RoomDetails {
  roomId: number | null;
  currentPlayer?: string | null;
  players: string[] | null;
  lastPlayed?: any;
  isOver?: BoardSliceProps["boardStatus"];
  boardData: BoxValueProps[];
  guestName?: string;
  playerName?: string;
}

export interface UpdateProfileDetails {
  id: string;
  avatar?: File;
  username: string;
  password: string;
}
