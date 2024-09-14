import { MdArrowForwardIos } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import Reminder from "./Reminder";

const Message: React.FC = () => {
  return (
    <div className="mt-5 mb-10 px-10">
      <div className="flex gap-5 items-center">
        <div className="text-[25px] font-bold">Messaging</div>
        <MdArrowForwardIos color="#00C9B1" size={20} />
      </div>

      <div className="flex gap-5">
        <div className="w-[281px] h-[390px] border border-black rounded-md shadow-xl px-[18px] py-[14px] mt-7">
          <div className="text-[15px] font-thin">Recent Message Sent</div>

          <div className="mt-10 flex flex-col gap-2">
            {[1, 2, 3, 4].map((_, idx) => (
              <Step key={idx + "step"} index={idx} />
            ))}
          </div>
        </div>

        <Reminder />
      </div>
    </div>
  );
};

export default Message;

interface IStep {
  index?: number;
}
const Step = ({ index }: IStep) => {
  return (
    <div className="flex gap-3">
      <div className="w-fit flex flex-col items-center">
        <FaCircle size={14} color={index !== 0 ? "#848484" : "#00C9B1"} />
        <div
          className={`w-0.5 h-10 ${
            index !== 0 ? "bg-[#848484]" : "bg-[#00C9B1]"
          } mt-0.5`}
        />
      </div>

      <div className="flex flex-col">
        <div className="text-[10px] font-semibold">15 Second Ago</div>
        <div className="text-[12px] font-thin line-clamp-2">
          Sent to Thomas, “ Hi How are you today thomas. Did you feel ......
        </div>
      </div>
    </div>
  );
};
