/* eslint-disable @typescript-eslint/no-explicit-any */
import InputCustom from "@/components/Moleculs/InputCustom";
import Modal from "@/components/Moleculs/Modal";
import { Button } from "@/components/ui/button";
import { IBoard } from "@/interfaces/board.interfaces";
import { FaSpinner } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import moment from "moment";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

interface IModalProps {
  isOpen: boolean;
  formik?: any;
  isLoadAdd: boolean;
  selectedBoard?: IBoard | null;
  setOpenModal: (i: boolean) => void;
  setSelectedBoard: () => void;
  setIsOpenAlert: (i: boolean) => void;
  onCancel: () => void;
  setOpenAlert: (i: string) => void;
}

const ModalAddBoard: React.FC<IModalProps> = ({
  isOpen,
  setOpenModal,
  formik,
  isLoadAdd,
  selectedBoard,
  setSelectedBoard,
  setIsOpenAlert,
  onCancel,
  setOpenAlert,
}): JSX.Element => {
  console.log(formik.errors);

  return (
    <Modal
      isOpen={isOpen}
      title={selectedBoard ? "Update Board" : "Add Board"}
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
          <div className="flex flex-col">
            <Label className="text-left mb-1">
              Start Date
              <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-52 justify-start text-left font-normal",
                    !formik.values.start_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formik.values.start_date ? (
                    format(formik.values.start_date, "PPP")
                  ) : (
                    <span>Start Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    formik.values.start_date
                      ? new Date(formik.values.start_date)
                      : undefined
                  }
                  onSelect={(e) =>
                    formik.setFieldValue(
                      "start_date",
                      moment(e).format("YYYY-MM-DD")
                    )
                  }
                  disabled={(date) =>
                    date >= moment(formik.values.end_date).toDate()
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {formik.errors && formik.errors?.start_date && (
              <div className="text-left text-xs text-red-400">
                {formik.errors.start_date}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <Label
              className="text-left mb-1
            "
            >
              End Date
              <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-52 justify-start text-left font-normal",
                    !formik.values.end_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formik.values.end_date ? (
                    format(formik.values.end_date, "PPP")
                  ) : (
                    <span>End Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    formik.values.end_date
                      ? new Date(formik.values.end_date)
                      : undefined
                  }
                  disabled={(date) =>
                    date < moment(formik.values.start_date).toDate()
                  }
                  onSelect={(e) =>
                    formik.setFieldValue(
                      "end_date",
                      moment(e).format("YYYY-MM-DD")
                    )
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {formik.errors && formik.errors?.end_date && (
              <div className="text-left text-xs text-red-400">
                {formik.errors.end_date}
              </div>
            )}
          </div>
        </div>

        <div
          className={`gap-5 flex ${
            selectedBoard ? "justify-between" : "justify-end"
          } items-center`}
        >
          {selectedBoard && (
            <div>
              <AiFillDelete
                onClick={() => {
                  setOpenAlert("board");
                  setIsOpenAlert(true);
                }}
                size={24}
                color="red"
                className="cursor-pointer"
              />
            </div>
          )}

          <div className="flex gap-5">
            <Button onClick={onCancel} className="bg-red-400">
              Cancel
            </Button>
            <Button disabled={isLoadAdd} type="submit" className="bg-blue-400">
              {isLoadAdd ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddBoard;
