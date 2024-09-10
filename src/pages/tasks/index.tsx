import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiPencil } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "@/lib/axios";
import { IBoard } from "@/interfaces/board.interfaces";
import Modal from "@/components/Moleculs/Modal";
import InputCustom from "@/components/Moleculs/InputCustom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";
import { IPostTask, IResponseTasks, ITask } from "@/interfaces/task.interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

type Options = {
  label: string;
  value: string;
};
const TaskPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [task, setTask] = useState<IResponseTasks | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalAlert, setIsOpenModalAlert] = useState<boolean>(false);
  const [isLoadTask, setIsLoadTask] = useState<boolean>(false);
  const [isLoadAdd, setIsLoadAdd] = useState<boolean>(false);
  const [isLoadBoard, setIsLoadBoard] = useState<boolean>(false);
  const [isLoadDelete, setIsLoadDelete] = useState<boolean>(false);
  // const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const [boards, setBoards] = useState<Options[] | null>(null);

  const handleGetTask = async () => {
    setIsLoadTask(true);
    try {
      const resp = await API.get("/task");
      setTask(resp?.data);
      setIsLoadTask(false);
    } catch (error) {
      console.log(error);
      setIsLoadTask(false);
    }
  };

  const handleGetBoard = async () => {
    setIsLoadBoard(true);
    try {
      const resp = await API.get("/board");
      const formattedBoards = resp?.data?.map((item: IBoard) => ({
        label: item.title,
        value: item.id,
      }));
      setBoards(formattedBoards);
      setIsLoadBoard(false);
    } catch (error) {
      console.log(error);
      setIsLoadBoard(false);
    }
  };

  const handleSubmit = async (body: IPostTask) => {
    setIsLoadAdd(true);
    try {
      if (selectedTask) {
        await API.put(`/task/${selectedTask?.id}`, body);
      } else {
        await API.post("/task", body);
      }
      setIsLoadAdd(false);
      setIsOpenModal(false);
      setSelectedTask(null);
      formik.resetForm();
      handleGetTask();
    } catch (error) {
      console.log(error);
      setIsLoadAdd(false);
    }
  };

  const handelDeleteTask = async (id: string | undefined) => {
    setIsLoadDelete(true);
    try {
      await API.delete(`/task/${id}`);
      setIsLoadDelete(false);
      setIsOpenModalAlert(false);
      handleGetTask();
    } catch (error) {
      console.log(error);
      setIsLoadDelete(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name must be filled in"),
    progress_percentage: Yup.number().required("Slider value is required"),
    board_id: Yup.string().required("Board must be filled in"),
  });

  const formik = useFormik({
    initialValues: {
      name: selectedTask?.name || "",
      progress_percentage: selectedTask?.progress_percentage || 0,
      board_id: selectedTask?.board_id || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    handleGetTask();
    handleGetBoard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };
  return (
    <div className="bg-blue-400 h-screen p-5">
      <div className="flex justify-between my-3">
        <div className="text-lg font-semibold text-white">TODO</div>

        <div className="flex gap-4">
          <Button className="bg-blue-600" onClick={() => setIsOpenModal(true)}>
            Add Tasks
          </Button>
          <Button className="bg-red-500" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <Table className="bg-white rounded-sm">
        <TableHeader className="">
          <TableRow>
            <TableHead className="w-[50px]">NO</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>PROGRESS</TableHead>
            <TableHead className="w-[200px]">CREADTED AT</TableHead>
            <TableHead className="w-[200px]">BOARD</TableHead>
            <TableHead className="w-[100px]">ACTION</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {task?.data?.map((item: ITask, idx: number) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{item?.name}</TableCell>
              <TableCell className="w-[300px]">
                <div>{item?.progress_percentage}%</div>
                <Progress value={item?.progress_percentage} />
              </TableCell>
              <TableCell className="w-[300px]">{item?.created_at}</TableCell>
              <TableCell>{item?.board?.title}</TableCell>
              <TableCell>
                <div className="flex gap-5">
                  <RiDeleteBin6Line
                    cursor="pointer"
                    onClick={() => {
                      setSelectedTask(item);
                      setIsOpenModalAlert(true);
                    }}
                    color="red"
                    size={20}
                  />
                  <PiPencil
                    cursor="pointer"
                    onClick={() => {
                      setSelectedTask(item);
                      setIsOpenModal(true);
                    }}
                    size={20}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isLoadTask && (
        <div className="flex flex-row items-center py-5 justify-center  bg-white">
          <FaSpinner className="animate-spin mr-2" />
          <div>Loading...</div>
        </div>
      )}

      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          title={selectedTask ? "Update Task" : "Add Task"}
          onClose={() => {
            setIsOpenModal(false);
            // setSelectedBoard(null);
            formik.resetForm();
          }}
        >
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <InputCustom
              label="Name"
              htmlFor="name"
              placeHolder="Add Name"
              onChange={formik.handleChange}
              name="name"
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.errors.name}
              isRequired
            />

            <div className="flex flex-col">
              <Label className="text-left mb-2">Progress</Label>
              <div className="flex gap-3">
                <div>{formik?.values.progress_percentage}%</div>
                <Slider
                  max={100}
                  step={1}
                  defaultValue={[formik.values.progress_percentage]}
                  value={[formik.values?.progress_percentage]}
                  name="progress_percentage"
                  onValueChange={(value) =>
                    formik.setFieldValue("progress_percentage", value[0])
                  }
                />
              </div>
            </div>

            <div className="flex flex-col">
              <Label className="text-left mb-2">Board</Label>
              <Select
                name="board_id"
                value={formik.values.board_id}
                onValueChange={(e) => formik.setFieldValue("board_id", e)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadBoard && <FaSpinner className="animate-spin mr-2" />}
                  {boards?.map((item, idx) => (
                    <SelectItem key={idx} value={item?.value}>
                      {item?.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.board_id && formik.errors.board_id && (
                <div className="text-left text-xs text-red-400">
                  {formik.errors.board_id}
                </div>
              )}
            </div>

            <div className="gap-5 flex justify-end mt-5">
              <Button
                onClick={() => {
                  setIsOpenModal(false);
                  formik.resetForm();
                }}
                className="bg-red-400"
              >
                Cancel
              </Button>
              <Button
                disabled={isLoadAdd}
                type="submit"
                className="bg-blue-400"
              >
                {isLoadAdd ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {isOpenModalAlert && (
        <Modal
          isOpen={isOpenModalAlert}
          title="Delete"
          onClose={() => {
            setIsOpenModalAlert(false);
            setSelectedTask(null);
            formik.resetForm();
          }}
        >
          <div className="text-xl text-left">
            Are you sure want to delete this tasks ?
          </div>
          <div className="gap-5 flex justify-end mt-6">
            <Button
              onClick={() => setIsOpenModalAlert(false)}
              className="bg-blue-400"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handelDeleteTask(selectedTask?.id);
              }}
              className="bg-red-400"
            >
              {isLoadDelete ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TaskPage;
