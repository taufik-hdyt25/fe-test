import { Icon } from "@/components/Atoms";
import { useLocation } from "react-router-dom";

interface INavProps {
  icon?: string | undefined;
  name: string;
  onClick?: () => void;
  path?: string;
}
const NavItem: React.FC<INavProps> = ({
  name,
  icon,
  onClick,
  path,
}): JSX.Element => {
  const location = useLocation();

  return (
    <div
      className={`flex flex-row items-center gap-5 cursor-pointer  w-fit px-3 rounded-full py-1 ${
        location?.pathname === path ? "bg-[#00C9B129]" : "bg-transparent"
      } `}
      onClick={onClick}
    >
      <Icon icon={icon} />
      <div className="flex items-center gap-4">
        <span className="font-normal text-[15px]">{name}</span>
        {(name === "Auto Reply" || name === "Scheduler") && (
          <span className="font-semibold text-[10px] px-3 rounded-lg py-1 bg-green-500 text-white">
            PRO
          </span>
        )}
      </div>
    </div>
  );
};

export default NavItem;
