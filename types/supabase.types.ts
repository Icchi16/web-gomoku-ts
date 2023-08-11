export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      boards: {
        Row: {
          created_at: string | null;
          board_data: Json | null;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          board_data?: Json | null;
          id?: number;
        };
        Update: {
          created_at?: string | null;
          board_data?: Json | null;
          id?: number;
        };
        Relationships: [];
      };
      rooms: {
        Row: {
          board: number | null;
          created_at: string | null;
          id: number;
          players: string[] | null;
          current_player: string | null;
          last_played_at: string | null;
          is_over: boolean | null;
        };
        Insert: {
          board?: number | null;
          created_at?: string | null;
          id?: number;
          players?: string[] | null;
          current_player?: string | null;
          last_played_at?: string | null;
          is_over?: boolean | null;
        };
        Update: {
          board?: number | null;
          created_at?: string | null;
          id?: number;
          players?: string[] | null;
          current_player?: string | null;
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
      user: {
        Row: {
          avatar: string | null;
          created_at: string | null;
          id: string;
          username: string | null;
          is_guest: boolean;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string | null;
          id: string;
          username?: string | null;
          is_guest: boolean;
        };
        Update: {
          avatar?: string | null;
          created_at?: string | null;
          id?: string;
          username?: string | null;
          is_guest: boolean;
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