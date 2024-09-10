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
import { IBoard, IPostBoard } from "@/interfaces/board.interfaces";
import Modal from "@/components/Moleculs/Modal";
import InputCustom from "@/components/Moleculs/InputCustom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import moment from "moment";

const BoardPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [boards, setBoards] = useState<IBoard[] | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalAlert, setIsOpenModalAlert] = useState<boolean>(false);
  const [isLoadBoard, setIsLoadBoard] = useState<boolean>(false);
  const [isLoadAdd, setIsLoadAdd] = useState<boolean>(false);
  const [isLoadDelete, setIsLoadDelete] = useState<boolean>(false);
  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null);
  const [isOpenModalTask, setIsOpenModalTask] = useState<boolean>();

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
      setIsOpenModal(false);
      setSelectedBoard(null);
      formik.resetForm();
      handleGetBoard();
    } catch (error) {
      console.log(error);
      setIsLoadAdd(false);
    }
  };

  const handelDeleteBoard = async (id: string | undefined) => {
    setIsLoadDelete(true);
    try {
      await API.delete(`/board/${id}`);
      setIsLoadDelete(false);
      handleGetBoard();
    } catch (error) {
      console.log(error);
      setIsLoadDelete(false);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title must be filled in"),
    start_date: Yup.string().required("Start Date must be filled in"),
    end_date: Yup.string().required("End Date must be filled in"),
  });

  const formik = useFormik({
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

  useEffect(() => {
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
            Add Board
          </Button>
          <Button className="bg-blue-600" onClick={() => navigate("/task")}>
            View All Taks
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
            <TableHead>TITLE</TableHead>
            <TableHead>USER ID</TableHead>
            <TableHead className="w-[200px]">START DATE</TableHead>
            <TableHead className="w-[200px]">END DATE</TableHead>
            <TableHead className="w-[200px]">CREATED AT</TableHead>
            <TableHead className="w-[100px] text-center">TASK</TableHead>
            <TableHead className="w-[100px]">ACTION</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {boards?.map((item: IBoard, idx: number) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{item?.title}</TableCell>
              <TableCell>{item?.user_id}</TableCell>
              <TableCell>{item?.start_date}</TableCell>
              <TableCell>{item?.end_date}</TableCell>
              <TableCell>
                {moment(item?.created_at).format("DD MMMM YYYY")}
              </TableCell>
              <TableCell className="flex flex-row justify-center text-center font-bold ">
                <div
                  onClick={() => {
                    setSelectedBoard(item);
                    setIsOpenModalTask(true);
                  }}
                  className="bg-blue-400 w-fit px-2 py-1 text-white rounded-md cursor-pointer"
                >
                  {item?.task?.length}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-5">
                  <RiDeleteBin6Line
                    cursor="pointer"
                    onClick={() => {
                      setSelectedBoard(item);
                      setIsOpenModalAlert(true);
                    }}
                    color="red"
                    size={20}
                  />
                  <PiPencil
                    cursor="pointer"
                    onClick={() => {
                      setSelectedBoard(item);
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

      {isLoadBoard && (
        <div className="flex flex-row items-center py-5 justify-center w-screen bg-white">
          <FaSpinner className="animate-spin mr-2" />
          <div>Loading...</div>
        </div>
      )}

      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          title={selectedBoard ? "Update Board" : "Add Board"}
          onClose={() => {
            setIsOpenModal(false);
            setSelectedBoard(null);
            formik.resetForm();
          }}
        >
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            <InputCustom
              label="Title"
              htmlFor="title"
              placeHolder="Add Title"
              onChange={formik.handleChange}
              name="title"
              onBlur={formik.handleBlur}
              value={formik.values.title}
              error={formik.errors.title}
              isRequired
            />

            <div className="flex   gap-3">
              <InputCustom
                label="Start Date"
                htmlFor="start_date"
                name="start_date"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.start_date}
                error={formik.errors.start_date}
                isRequired={!selectedBoard}
                disabled={selectedBoard ? true : false}
              />
              <InputCustom
                label="End Date"
                htmlFor="end_date"
                name="end_date"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.end_date}
                error={formik.errors.end_date}
                isRequired={!selectedBoard}
                disabled={selectedBoard ? true : false}
              />
            </div>

            <div className="gap-5 flex justify-end">
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
            setSelectedBoard(null);
            formik.resetForm();
          }}
        >
          <div className="text-xl text-left">
            Are you sure want to delete this board ?
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
                handelDeleteBoard(selectedBoard?.id);
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

      {isOpenModalTask && (
        <Modal
          isOpen={isOpenModalTask}
          title="Task"
          width="w-[70%]"
          onClose={() => {
            setIsOpenModalTask(false);
          }}
        >
          {selectedBoard?.task?.length ? (
            <Table className="bg-white rounded-sm">
              <TableHeader className="">
                <TableRow>
                  <TableHead className="w-[50px]">NO</TableHead>
                  <TableHead className="w-[300px]">NAME</TableHead>
                  <TableHead>PROGRESS</TableHead>
                  <TableHead>CREADTED AT</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {selectedBoard?.task?.map((item, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell className="w-[300px]">
                      <div>{item?.progress_percentage}%</div>
                      <Progress value={item?.progress_percentage} />
                    </TableCell>
                    <TableCell className="text-left">
                      {moment(item?.created_at).format("DD MMMM YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>Task Empty</div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default BoardPage;
