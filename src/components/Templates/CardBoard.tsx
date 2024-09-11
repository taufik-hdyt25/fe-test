/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBoard } from "@/interfaces/board.interfaces";
import { ITaskInBoard } from "@/interfaces/task.interfaces";
import { formatMonth } from "@/utils/format-date";
import { FaPlusCircle } from "react-icons/fa";
import CardTask from "./CardTask";

interface ICardProps {
  board?: IBoard;
  onOpenModalTask?: () => void;
  setSelectedTask: (i: ITaskInBoard) => void;
  setOpenModalBoard: () => void;
  updatetask?: () => void;
  moveLeftTask?: () => void;
  moveRightTask?: () => void;
  onOpenAlert: (i: ITaskInBoard) => void;
  openModalUpdate: (a: ITaskInBoard) => void;
}
const CardBoard: React.FC<ICardProps> = ({
  board,
  onOpenModalTask,
  setSelectedTask,
  setOpenModalBoard,
  moveLeftTask,
  moveRightTask,
  onOpenAlert,
  openModalUpdate,
}): JSX.Element => {
  return (
    <div className="w-[306px] bg-[#FFF9FB] border border-[pink] p-[12px] rounded-sm h-fit flex-shrink-0">
      <div
        className="p-2 text-xs border border-[pink] w-fit text-[#EB2F96] cursor-pointer"
        onClick={setOpenModalBoard}
      >
        {board?.title}
      </div>
      <div className="text-sm my-3">{`${formatMonth(
        board?.start_date
      )} - ${formatMonth(board?.end_date)}`}</div>

      {board?.task?.length ? (
        <div className="flex flex-col gap-2">
          {board?.task?.map((item: ITaskInBoard, index: number) => (
            <div>
              <CardTask
                setSelectedTask={() => setSelectedTask(item)}
                key={index + "task"}
                task={item}
                onOpenAlert={() => onOpenAlert(item)}
                onOpenModalUpdate={() => openModalUpdate(item)}
                moveLeftTask={moveLeftTask}
                moveRightTask={moveRightTask}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-gray-200 h-[56px] bg-white text-sm text-gray-300 flex justify-center items-center">
          No Task Available
        </div>
      )}

      <div
        className="mt-4 flex items-center gap-1 cursor-pointer"
        onClick={onOpenModalTask}
      >
        <FaPlusCircle size={20} />
        <div className="text-sm">New Task</div>
      </div>
    </div>
  );
};

export default CardBoard;
