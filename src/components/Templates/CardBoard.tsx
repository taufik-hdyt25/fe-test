import { forwardRef } from "react";
import { IBoard } from "@/interfaces/board.interfaces";
import { ITaskInBoard } from "@/interfaces/task.interfaces";
import { formatFullDate, formatMonth } from "@/utils/format-date";
import { FaPlusCircle } from "react-icons/fa";
import CardTask from "./CardTask";
import { Draggable } from "react-beautiful-dnd";

interface ICardProps {
  board?: IBoard;
  onOpenModalTask?: () => void;
  setSelectedTask: (i: ITaskInBoard) => void;
  setOpenModalBoard: () => void;
  moveLeftTask?: () => void;
  moveRightTask?: () => void;
  onOpenAlert: (i: ITaskInBoard) => void;
  openModalUpdate: (a: ITaskInBoard) => void;
  idx?: number;
  setSelectedBoard: () => void;
  disableRight?: boolean;
  disableLeft?: boolean;
}

const CardBoard = forwardRef<HTMLDivElement, ICardProps>(
  (
    {
      board,
      onOpenModalTask,
      setSelectedTask,
      setOpenModalBoard,
      moveLeftTask,
      moveRightTask,
      onOpenAlert,
      openModalUpdate,
      idx,
      setSelectedBoard,
      disableLeft,
      disableRight,
    },
    ref
  ): JSX.Element => {
    return (
      <div
        ref={ref}
        className={`w-[306px] ${
          idx && idx % 2 === 1 ? "bg-[#FFF9FB]" : "bg-[#F7FAFF]"
        } border ${
          idx && idx % 2 === 1 ? "border-[pink]" : "border-[#2F54EB]"
        }  p-[12px] rounded-sm h-fit flex-shrink-0`}
      >
        <div
          className="p-2 text-xs border border-[pink] w-fit text-[#EB2F96] cursor-pointer"
          onClick={setOpenModalBoard}
        >
          {board?.title}
        </div>
        <div className="text-sm my-3">{`${formatMonth(
          board?.start_date
        )} - ${formatMonth(board?.end_date)}`}</div>

        {board?.task && board?.task?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {board?.task?.map((item: ITaskInBoard, index: number) => (
              <Draggable
                draggableId={item.id}
                index={index}
                key={item.id} // Menggunakan task.id sebagai key unik
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <CardTask
                      disableLeft={disableLeft}
                      disableRight={disableRight}
                      setSelectedBoard={setSelectedBoard}
                      setSelectedTask={() => setSelectedTask(item)}
                      task={item}
                      onOpenAlert={() => onOpenAlert(item)}
                      onOpenModalUpdate={() => openModalUpdate(item)}
                      moveLeftTask={moveLeftTask}
                      moveRightTask={moveRightTask}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        ) : (
          <div className="border border-gray-200 h-[56px] bg-white text-sm text-gray-300 flex justify-center items-center">
            No Task Available
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={onOpenModalTask}
          >
            <FaPlusCircle size={20} />
            <div className="text-sm">New Task</div>
          </div>

          <div className="text-xs">{formatFullDate(board?.created_at)}</div>
        </div>
      </div>
    );
  }
);

export default CardBoard;
