/* eslint-disable @typescript-eslint/no-explicit-any */
import InputCustom from "@/components/Moleculs/InputCustom";
import Modal from "@/components/Moleculs/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ITaskInBoard } from "@/interfaces/task.interfaces";
import { FaSpinner } from "react-icons/fa";

interface IModalProps {
  formik?: any;
  isOpen: boolean;
  isLoadAddTask: boolean;
  onClose: () => void;
  onCancel: () => void;
  selectedTask: ITaskInBoard | null;
}

const ModalAddTask: React.FC<IModalProps> = ({
  isOpen,

  formik,
  isLoadAddTask,
  onClose,
  onCancel,
  selectedTask,
}): JSX.Element => {
  return (
    <Modal
      isOpen={isOpen}
      title={selectedTask ? "Upadate Task" : "Add Task"}
      width="w-[300px]"
      onClose={onClose}
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

        <div className="gap-5 flex justify-end mt-5">
          <Button onClick={onCancel} className="bg-red-400">
            Cancel
          </Button>
          <Button
            disabled={isLoadAddTask}
            type="submit"
            className="bg-blue-400"
          >
            {isLoadAddTask ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddTask;
