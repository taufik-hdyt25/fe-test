import { CardBoard } from "@/components/Templates";
import { Button } from "@/components/ui/button";
import { IBoard } from "@/interfaces/board.interfaces";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ModalAddTask } from "./components";
import ModalAddBoard from "./components/ModalAddBoard";
import ModalDelete from "./components/ModalDelete";
import { useBoardAction } from "./hooks/board.hooks";

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
    handleDeleteBoard,
    isLoadDeleteBoard,
  } = useBoardAction();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };
  return (
    <div className=" h-screen">
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

      <div className="flex gap-3 mt-10 overflow-x-auto px-5">
        {boards?.map((item: IBoard, idx: number) => (
          <CardBoard
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
        ))}
      </div>

      {isModalAddTask && (
        <ModalAddTask
          isLoadAddTask={isLoadAddTask}
          isOpen={isModalAddTask}
          formik={formikTask}
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
          setIsOpenAlert={() => {
            setIsOpenAlert(true);
            setModalAddBoard(false);
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
          }}
        />
      )}

      {isOpenAlert && (
        <ModalDelete
          selectedBoard={selectedBoard}
          isOpen={isOpenAlert}
          isLoading={isLoadDeleteTask || isLoadDeleteBoard}
          onOK={() => {
            if (selectedBoard) {
              handleDeleteBoard();
            } else {
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
