import { BoxValueProps } from "@/types/boardType";
import { filter } from "ramda";
import { useBoardSlice } from "../store/boardSlice";
import { useStore } from "zustand";

interface GomokuType {
  id: number;
  row: number;
  col: number;
}
