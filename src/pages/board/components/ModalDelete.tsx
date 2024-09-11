import Modal from "@/components/Moleculs/Modal";
import { Button } from "@/components/ui/button";
import { IBoard } from "@/interfaces/board.interfaces";
import { FaSpinner } from "react-icons/fa";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  formik?: any;
  setIsOpen?: () => void;
  onOK?: () => void;
  isLoading?: boolean;
  selectedBoard: IBoard | null;
}

const ModalDelete = ({
  isOpen,
  onClose,
  setIsOpen,
  onOK,
  isLoading,
  selectedBoard,
}: IModalProps) => {
  return (
    <Modal isOpen={isOpen} title="Delete" onClose={onClose}>
      <div className="text-xl text-left">
        {selectedBoard
          ? "Are you sure want to delete this Board ?"
          : "Are you sure want to delete this Task ?"}
      </div>
      <div className="gap-5 flex justify-end mt-6">
        <Button onClick={setIsOpen} className="bg-blue-400">
          Cancel
        </Button>
        <Button onClick={onOK} className="bg-red-400">
          {isLoading ? <FaSpinner className="animate-spin mr-2" /> : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDelete;
