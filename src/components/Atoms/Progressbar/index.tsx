import React from "react";

interface ProgressBarProps {
  progress: number;
}

const Progressbar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-[#C4C4C4]  h-2.5">
      <div
        className="bg-[#00DC30] h-2.5  transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Progressbar;
