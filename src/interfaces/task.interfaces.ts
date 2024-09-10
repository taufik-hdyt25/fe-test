import { IBoard } from "./board.interfaces";

export interface ITask {
  id: string;
  name: string;
  progress_percentage: number;
  board_id: string;
  created_at: string;
  updated_at: string | null;
  board: IBoard;
}

export interface IResponseTasks {
  statusCode: number;
  message: string;
  data: ITask[];
}

export interface IPostTask {
  name: string;
  progress_percentage: number;
  board_id: string;
}

export interface IDetailBoardTask {
  id: string;
  name: string;
  progress_percentage: number;
  board_id: string;
  created_at: string;
  updated_at: string;
}
