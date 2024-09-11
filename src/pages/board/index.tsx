import { CardBoard } from "@/components/Templates";
import { Button } from "@/components/ui/button";
import { IBoard } from "@/interfaces/board.interfaces";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ModalAddTask } from "./components";
import ModalAddBoard from "./components/ModalAddBoard";
import ModalDelete from "./components/ModalDelete";
import { useBoardAction } from "./hooks/board.hooks";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

const BoardPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const {
    formikBoard,
    isLoadAdd,
    isModalAddBoard,
    selectedBoard,
    setSelectedBoard,
    isModalAddTask,
    setIsModalAddTask,
    boards,
    isLoadBoard,

    setModalAddBoard,
    isLoadAddTask,
    formikTask,

    isOpenAlert,
    onOpenAlert,
    setIsOpenAlert,
    setSelectedTask,
    handleDeleteTask,
    isLoadDeleteTask,
    openModalUpdate,
    handleMoveTaskLeft,
    handleMoveTaskRight,

    selectedTask,
    isLoadDeleteBoard,
    handleMoveTask,
    handleDeleteBoard,
    setOpenAlert,
    openAlert,
  } = useBoardAction();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const handleOnDragEnd = (result: DropResult) => {
    handleMoveTask(result);
  };

  return (
    <div className="h-screen ">
      <div className="flex justify-between my-3 px-5">
        <div className="text-lg font-semibold text-blue-400">TODO</div>

        <div className="flex gap-4">
          <Button
            className="bg-blue-600"
            onClick={() => setModalAddBoard(true)}
          >
            Add Board
          </Button>
          <Button className="bg-red-500" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="flex gap-3 mt-10 overflow-x-visible px-5 pb-10">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {boards?.map((item: IBoard, idx: number) => (
            <Droppable droppableId={item.id} key={item.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-shrink-0"
                >
                  <CardBoard
                    disableLeft={idx === 0}
                    disableRight={idx === boards.length - 1}
                    key={idx + "boards"}
                    board={item}
                    setSelectedBoard={() => setSelectedBoard(item)}
                    setSelectedTask={setSelectedTask}
                    onOpenAlert={onOpenAlert}
                    openModalUpdate={openModalUpdate}
                    moveLeftTask={handleMoveTaskLeft}
                    moveRightTask={handleMoveTaskRight}
                    setOpenModalBoard={() => {
                      setSelectedBoard(item);
                      setModalAddBoard(true);
                    }}
                    onOpenModalTask={() => {
                      setSelectedBoard(item);
                      setIsModalAddTask(true);
                    }}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>

      {isModalAddTask && (
        <ModalAddTask
          isLoadAddTask={isLoadAddTask}
          isOpen={isModalAddTask}
          formik={formikTask}
          selectedTask={selectedTask}
          onCancel={() => {
            setIsModalAddTask(false);
            setSelectedBoard(null);
            setSelectedTask(null);
          }}
          onClose={() => {
            setIsModalAddTask(false);
            setSelectedBoard(null);
            setSelectedTask(null);
            formikBoard?.resetForm();
          }}
        />
      )}

      {isLoadBoard && (
        <div className="flex flex-row items-center py-5 justify-center w-screen bg-white">
          <FaSpinner className="animate-spin mr-2" />
          <div>Loading...</div>
        </div>
      )}

      {isModalAddBoard && (
        <ModalAddBoard
          setOpenAlert={setOpenAlert}
          setIsOpenAlert={() => {
            setIsOpenAlert(true);
            setModalAddBoard(false);
            setOpenAlert("board");
          }}
          setSelectedBoard={() => setSelectedBoard(null)}
          selectedBoard={selectedBoard}
          formik={formikBoard}
          isLoadAdd={isLoadAdd}
          isOpen={isModalAddBoard}
          setOpenModal={setModalAddBoard}
          onCancel={() => {
            setSelectedBoard(null);
            setModalAddBoard(false);
            formikBoard.resetForm();
            setOpenAlert("");
          }}
        />
      )}

      {isOpenAlert && (
        <ModalDelete
          selectedBoard={selectedBoard}
          openAlert={openAlert}
          isOpen={isOpenAlert}
          isLoading={isLoadDeleteTask || isLoadDeleteBoard}
          onOK={() => {
            if (openAlert === "board") {
              handleDeleteBoard();
            } else if (openAlert === "task") {
              handleDeleteTask();
            }
          }}
          setIsOpen={() => setIsOpenAlert(false)}
          onClose={() => {
            setIsOpenAlert(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default BoardPage;
