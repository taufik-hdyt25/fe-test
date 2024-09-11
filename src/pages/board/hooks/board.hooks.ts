/* eslint-disable @typescript-eslint/no-unused-vars */

import { useToast } from "@/hooks/use-toast";
import { IBoard, IPostBoard } from "@/interfaces/board.interfaces";
import { IPostTask, ITaskInBoard } from "@/interfaces/task.interfaces";
import { API } from "@/lib/axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export const useBoardAction = () => {
  const { toast } = useToast();
  const [openAlert, setOpenAlert] = useState("");
  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null);
  const [isModalAddTask, setIsModalAddTask] = useState<boolean>(false);
  const [isModalAddBoard, setModalAddBoard] = useState<boolean>(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITaskInBoard | null>(null);
  const [isLoadDeleteTask, setIsLoadDeleteTask] = useState(false);
  const [isLoadDeleteBoard, setIsLoadDeleteBoard] = useState(false);

  const [boards, setBoards] = useState<IBoard[] | null>(null);

  const [isLoadBoard, setIsLoadBoard] = useState<boolean>(false);
  const [isLoadAdd, setIsLoadAdd] = useState<boolean>(false);
  const [isLoadAddTask, setIsLoadAddTask] = useState(false);

  const handleGetBoard = async () => {
    setIsLoadBoard(true);
    try {
      const resp = await API.get("/board");
      setBoards(resp?.data);

      setIsLoadBoard(false);
    } catch (error) {
      console.log(error);
      setIsLoadBoard(false);
    }
  };

  const handleSubmit = async (body: IPostBoard) => {
    setIsLoadAdd(true);
    try {
      if (selectedBoard) {
        await API.put(`/board/${selectedBoard?.id}`, body);
      } else {
        await API.post("/board", body);
      }
      setIsLoadAdd(false);
      setModalAddBoard(false);
      setSelectedBoard(null);
      formikBoard.resetForm();
      handleGetBoard();
    } catch (error) {
      console.log(error);
      setIsLoadAdd(false);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title must be filled in"),
    start_date: Yup.string().required("Start Date must be filled in"),
    end_date: Yup.string().required("End Date must be filled in"),
  });

  const formikBoard = useFormik({
    initialValues: {
      title: selectedBoard?.title || "",
      start_date: selectedBoard?.start_date || "",
      end_date: selectedBoard?.end_date || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmitTask = async (body: IPostTask) => {
    setIsLoadAddTask(true);
    try {
      if (selectedTask) {
        await API.put(`/task/${selectedTask?.id}`, body);
      } else {
        await API.post("/task", body);
      }
      setIsLoadAddTask(false);
      setIsModalAddTask(false);
      setSelectedTask(null);
      setSelectedBoard(null);
      formikTask.resetForm();
      handleGetBoard();
    } catch (error) {
      console.log(error);
      setIsLoadAdd(false);
    }
  };

  const validationSchemaTask = Yup.object({
    name: Yup.string().required("Name must be filled in"),
    progress_percentage: Yup.number().required("Slider value is required"),
  });

  const formikTask = useFormik({
    initialValues: {
      name: selectedTask?.name || "",
      progress_percentage: selectedTask?.progress_percentage || 0,
    },
    validationSchema: validationSchemaTask,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      handleSubmitTask({
        ...values,
        board_id: selectedBoard?.id,
      });
    },
  });

  const onOpenAlert = (item: ITaskInBoard) => {
    setSelectedTask(item);
    setIsOpenAlert(true);
    setOpenAlert("task");
  };

  const openModalUpdate = (item: ITaskInBoard) => {
    setSelectedTask(item);
    setIsModalAddTask(true);
  };

  const handleDeleteTask = async () => {
    setIsLoadDeleteTask(true);
    try {
      await API.delete(`/task/${selectedTask?.id}`);
      setIsLoadDeleteTask(false);
      setIsOpenAlert(false);
      setSelectedTask(null);
      handleGetBoard();
    } catch (error) {
      console.log(error);
      setIsLoadDeleteTask(false);
    }
  };

  const findAdjacentBoardIds = (boardId: string | undefined) => {
    if (!boards) {
      return { leftId: null, rightId: null };
    }
    const index = boards.findIndex((board) => board.id === boardId);
    if (index === -1) {
      return { leftId: null, rightId: null };
    }
    const leftId = index > 0 ? boards[index - 1].id : null;
    const rightId = index < boards.length - 1 ? boards[index + 1].id : null;

    return { leftId, rightId };
  };

  const { rightId, leftId } = findAdjacentBoardIds(selectedBoard?.id);

  const handleMoveTaskLeft = async () => {
    try {
      if (selectedBoard && selectedTask && leftId !== null) {
        await API.post("/task/move", {
          id: selectedTask?.id,
          board_id: leftId,
        });
        handleGetBoard();
        setSelectedBoard(null);
        setSelectedTask(null);
      } else {
        toast({ title: "Cannot be moved", className: "bg-red-500 text-white" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveTaskRight = async () => {
    try {
      if (selectedBoard && selectedTask && rightId !== null) {
        await API.post("/task/move", {
          id: selectedTask?.id,
          board_id: rightId,
        });
        handleGetBoard();
        setSelectedBoard(null);
        setSelectedTask(null);
      } else {
        toast({ title: "Cannot be moved", className: "bg-red-500 text-white" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBoard = async () => {
    setIsLoadDeleteBoard(true);
    try {
      if (selectedBoard) {
        const resp = await API.delete(`/board/${selectedBoard?.id}`);
        setIsOpenAlert(false);
        toast({
          title: resp?.data?.message,
          className: "bg-green-500",
        });
      }
      setIsLoadDeleteBoard(false);
      handleGetBoard();
    } catch (error) {
      console.log(error);
      setIsLoadDeleteBoard(false);
      toast({
        title: "Internal server Error",
        className: "bg-red-500",
      });
    }
  };

  useEffect(() => {
    handleGetBoard();
  }, []);

  return {
    selectedBoard,
    setSelectedBoard,

    isModalAddTask,
    setIsModalAddTask,

    boards,
    isLoadBoard,

    setModalAddBoard,
    isModalAddBoard,
    isLoadAdd,

    formikBoard,
    formikTask,
    isLoadAddTask,
    setIsLoadAddTask,
    setSelectedTask,
    onOpenAlert,
    isOpenAlert,
    setIsOpenAlert,
    isLoadDeleteTask,
    handleDeleteTask,
    openModalUpdate,
    handleMoveTaskLeft,
    handleMoveTaskRight,
    handleDeleteBoard,
    isLoadDeleteBoard,
    selectedTask,
    setOpenAlert,
    openAlert,
  };
};
