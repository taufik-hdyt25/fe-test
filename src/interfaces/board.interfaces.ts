export interface IBoard {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  user_id: string;
  created_at: string;
  updated_at: string | null;
  task: ITask[];
}

interface ITask {
  id: string;
  name: string;
  progress_percentage: number;
  board_id: string;
  created_at: string;
  updated_at: string | null;
}

export interface IPostBoard {
  title: string;
  start_date: string;
  end_date: string;
}
