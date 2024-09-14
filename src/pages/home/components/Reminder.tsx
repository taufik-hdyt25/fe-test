import { Icon } from "@/components/Atoms";
import { Checkbox } from "@/components/ui/checkbox";
import { ic_playlist_add } from "@/styles/icons";
import { FaCircle } from "react-icons/fa";

const Reminder: React.FC = () => {
  return (
    <div className="w-[281px] flex-1 border border-black rounded-md shadow-xl mt-7 px-[18px] py-[14px]">
      <div className="flex justify-between items-center">
        <div className="text-[15px] font-thin">Reminder</div>
        <div className="flex items-center gap-2 text-[#00C9B1] font-semibold">
          <Icon icon={ic_playlist_add} /> ADD
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        {[1, 2, 3].map((_, idx) => (
          <ReminderItem index={idx} key={idx + "reminder"} />
        ))}
      </div>
    </div>
  );
};

export default Reminder;

interface IReminder {
  index?: number;
}
const ReminderItem = ({ index }: IReminder) => {
  return (
    <div
      className={`border ${
        index !== 0 ? "border-[#848484]" : "border-[#00C9B1]"
      }  h-[65px] rounded-md flex items-center px-[13px] justify-between`}
    >
      <div className="flex items-center gap-5">
        <CircleMenu color={index !== 0 ? "#848484" : "#00C9B1"} />
        <Checkbox />
        <div>Send Invoices to Jimmy, and Ask him about yesterday</div>
      </div>

      <div className="px-5 py-2 bg-[#C80404] text-[7px] text-white rounded-full">
        DUE IN 2 HOURS
      </div>
    </div>
  );
};

interface ICircleMenu {
  color?: string;
}
const CircleMenu = ({ color }: ICircleMenu) => {
  return (
    <div className="flex flex-col gap-0.5">
      {[1, 2, 3].map((_, idx) => (
        <div key={idx} className="flex gap-0.5">
          <FaCircle size={6} color={color} />
          <FaCircle size={6} color={color} />
        </div>
      ))}
    </div>
  );
};
