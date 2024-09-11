import { ITaskInBoard } from "./task.interfaces";

export interface IBoard {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  user_id: string;
  created_at: string;
  updated_at: string | null;
  task: ITaskInBoard[];
}

export interface IPostBoard {
  title: string;
  start_date: string;
  end_date: string;
}

export interface IMoveTask {
  id: string;
  board_id: string;
}
