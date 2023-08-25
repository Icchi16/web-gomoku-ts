import { BoxValueProps } from "./types";
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
  | BoxValueProps[];

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          board: Json;
          created_at: string | null;
          id: number;
          players: string[];
          current_player: string;
          last_played_at: string | null;
          is_over: boolean | null;
        };
        Insert: {
          board?: Json;
          created_at?: string | null;
          id?: number;
          players?: string[];
          current_player?: string;
          last_played_at?: string | null;
          is_over?: boolean | null;
        };
        Update: {
          board?: Json;
          created_at?: string | null;
          id?: number;
          players?: string[];
          current_player?: string;
          last_played_at?: string | null;
          is_over?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "rooms_board_fkey";
            columns: ["board"];
            referencedRelation: "boards";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar: string | null;
          created_at: string | null;
          id: string;
          username: string | null;
          is_guest: boolean;
          is_online: boolean;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string | null;
          id: string;
          username?: string | null;
          is_guest?: boolean;
          is_online?: boolean;
        };
        Update: {
          avatar?: string | null;
          created_at?: string | null;
          id?: string;
          username?: string | null;
          is_guest?: boolean;
          is_online?: boolean;

        };
        Relationships: [
          {
            foreignKeyName: "user_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      gen_random_username: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      random_username: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
