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
}
const CardTask: React.FC<ICardTask> = ({
  task,
  setSelectedTask,
  setSelectedBoard,
  onOpenAlert,
  onOpenModalUpdate,
  moveLeftTask,
  moveRightTask,
}): JSX.Element => {
  return (
    <div className="p-3 border border-gray-300 mt-3 bg-white text-sm">
      <div>{task?.name}</div>

      <div className="flex items-center justify-between gap-20 mt-7">
        <div className="flex items-center gap-2 flex-1 ">
          <div className="relative   flex-1">
            <div className="flex items-center">
              <div className="w-full h-2.5 bg-gray-200 rounded-full">
                <div
                  className={`${
                    task?.progress_percentage !== undefined
                      ? task?.progress_percentage <= 20
                        ? "bg-red-500"
                        : task?.progress_percentage <= 70
                        ? "bg-orange-500"
                        : task?.progress_percentage === 100
                        ? "bg-green-500"
                        : "bg-blue-400"
                      : null
                  } h-2.5 text-xs text-teal-100 text-center p-0.5 leading-none rounded-full`}
                  style={{ width: `${task?.progress_percentage}%` }}
                >
                  &nbsp;
                </div>
              </div>
            </div>
          </div>

          {task?.progress_percentage === 100 ? (
            <FaCheckCircle color="green" size={20} />
          ) : (
            <div>{task?.progress_percentage}%</div>
          )}
        </div>
        <div>
          <Popover onOpenChange={(e) => console.log(e)}>
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
              <div
                className="flex items-center gap-3 hover:bg-blue-400 px-3 py-2 cursor-pointer"
                onClick={moveLeftTask}
              >
                <FaArrowLeft size={20} />
                <div className="text-sm">Move Left</div>
              </div>
              <div
                className="flex items-center gap-3 hover:bg-blue-400 px-3 py-2 cursor-pointer"
                onClick={moveRightTask}
              >
                <FaArrowRight size={20} />
                <div className="text-sm">Move Right</div>
              </div>
              <div
                className="flex items-center gap-3 hover:bg-blue-400 px-3 py-2 cursor-pointer"
                onClick={onOpenModalUpdate}
              >
                <PiPencilBold size={20} />
                <div className="text-sm">Edit</div>
              </div>
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
    </div>
  );
};

export default CardTask;
