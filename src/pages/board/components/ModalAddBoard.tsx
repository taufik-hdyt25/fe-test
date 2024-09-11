/* eslint-disable @typescript-eslint/no-explicit-any */
import InputCustom from "@/components/Moleculs/InputCustom";
import Modal from "@/components/Moleculs/Modal";
import { Button } from "@/components/ui/button";
import { IBoard } from "@/interfaces/board.interfaces";
import { FaSpinner } from "react-icons/fa";

interface IModalProps {
  isOpen: boolean;
  formik?: any;
  isLoadAdd: boolean;
  selectedBoard?: IBoard | null;
  setOpenModal: (i: boolean) => void;
  setSelectedBoard: () => void;
}
const ModalAddBoard: React.FC<IModalProps> = ({
  isOpen,
  setOpenModal,
  formik,
  isLoadAdd,
  selectedBoard,
  setSelectedBoard,
}): JSX.Element => {
  return (
    <Modal
      isOpen={isOpen}
      title={"Add Board"}
      onClose={() => {
        setOpenModal(false);
        setSelectedBoard();
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
              setOpenModal(false);
              formik.resetForm();
            }}
            className="bg-red-400"
          >
            Cancel
          </Button>
          <Button disabled={isLoadAdd} type="submit" className="bg-blue-400">
            {isLoadAdd ? <FaSpinner className="animate-spin mr-2" /> : "Submit"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddBoard;
