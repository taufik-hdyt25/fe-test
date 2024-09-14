import { Icon } from "@/components/Atoms";
import Progressbar from "@/components/Atoms/Progressbar";

import { ic_messages } from "@/styles/icons";
import React, { memo } from "react";

import { FaArrowRight } from "react-icons/fa";
const CardMessage: React.FC = () => {
  return (
    <div className="w-[245px] h-[149.83px] bg-white rounded-lg shadow-xl px-[15px] py-[7px] flex flex-col justify-between ">
      <div className="flex justify-between items-center">
        <Icon icon={ic_messages} />
        <FaArrowRight size={20} color="gray" />
      </div>
      <div className="text-[15px] font-bold text-[#00C9B1] mt-4">
        MESSAGE BANDWIDTH
      </div>

      <div>
        <Progressbar progress={50} />

        <div className="flex justify-between text-[#848484] text-[12px] mt-2">
          <span>20 Messages</span>
          <span>/100</span>
        </div>
      </div>
    </div>
  );
};

export default memo(CardMessage);
