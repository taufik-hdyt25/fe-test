import { forwardRef } from "react";
import { ITaskInBoard } from "@/interfaces/task.interfaces";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { FaEllipsis } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { PiPencilBold } from "react-icons/pi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ICardTask {
  task?: ITaskInBoard;
  setSelectedTask: () => void;
  setSelectedBoard: () => void;
  onOpenAlert?: () => void;
  onOpenModalUpdate?: () => void;
  moveLeftTask?: () => void;
  moveRightTask?: () => void;
  disableLeft?: boolean;
  disableRight?: boolean;
}

const CardTask = forwardRef<HTMLDivElement, ICardTask>(
  (
    {
      task,
      setSelectedTask,
      setSelectedBoard,
      onOpenAlert,
      onOpenModalUpdate,
      moveLeftTask,
      moveRightTask,
      disableLeft = false,
      disableRight = false,
    },
    ref
  ): JSX.Element => {
    return (
      <div
        ref={ref}
        className="p-3 border border-gray-300 mt-3 bg-white text-sm"
      >
        {/* Task Name */}
        <div>{task?.name}</div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between gap-20 mt-7">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <div className="w-full h-2.5 bg-gray-200 rounded-full">
                <div
                  className={`h-2.5 text-xs text-teal-100 text-center p-0.5 leading-none rounded-full ${
                    task?.progress_percentage !== undefined
                      ? task?.progress_percentage <= 20
                        ? "bg-red-500"
                        : task?.progress_percentage <= 70
                        ? "bg-orange-500"
                        : task?.progress_percentage === 100
                        ? "bg-green-500"
                        : "bg-blue-400"
                      : "bg-gray-300"
                  }`}
                  style={{ width: `${task?.progress_percentage ?? 0}%` }}
                >
                  &nbsp;
                </div>
              </div>
            </div>

            {/* Percentage or Check Circle */}
            {task?.progress_percentage === 100 ? (
              <FaCheckCircle color="green" size={20} />
            ) : (
              <div>{task?.progress_percentage}%</div>
            )}
          </div>

          {/* Popover with Task Options */}
          <Popover>
            <PopoverTrigger>
              <FaEllipsis
                onClick={() => {
                  setSelectedBoard();
                  setSelectedTask();
                }}
                className="cursor-pointer"
                size={20}
              />
            </PopoverTrigger>
            <PopoverContent className="w-[200px] px-0">
              {/* Move Left */}
              <div
                className={`flex items-center gap-3 hover:bg-blue-400 px-3 py-2 cursor-pointer ${
                  disableLeft ? "hidden" : ""
                }`}
                onClick={moveLeftTask}
              >
                <FaArrowLeft size={20} />
                <div className="text-sm">Move Left</div>
              </div>

              {/* Move Right */}
              <div
                className={`flex items-center gap-3 hover:bg-blue-400 px-3 py-2 cursor-pointer ${
                  disableRight ? "hidden" : ""
                }`}
                onClick={moveRightTask}
              >
                <FaArrowRight size={20} />
                <div className="text-sm">Move Right</div>
              </div>

              {/* Edit Task */}
              <div
                className="flex items-center gap-3 hover:bg-blue-400 px-3 py-2 cursor-pointer"
                onClick={onOpenModalUpdate}
              >
                <PiPencilBold size={20} />
                <div className="text-sm">Edit</div>
              </div>

              {/* Delete Task */}
              <div
                className="flex items-center gap-3 hover:bg-blue-400 px-3 py-2 cursor-pointer"
                onClick={onOpenAlert}
              >
                <MdDelete size={20} />
                <div className="text-sm">Delete</div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  }
);

export default CardTask;
