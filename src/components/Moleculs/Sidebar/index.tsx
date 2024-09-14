import { navItems } from "@/constants/nav";
import NavItem from "../NavItem";
import { useNavigate } from "react-router-dom";

const SideBar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="p-[15px]">
      <div className="flex items-center gap-4 justify-center">
        <h3 className="text-center">WhatsTrack</h3>
        <span className="bg-[#FFC70036] px-6 py-1 rounded-full border border-orange-300 text-orange-300">
          PRO
        </span>
      </div>

      <div className="bg-[#C80404] mt-10 px-[10px] py-[6px] rounded-md">
        <div className="text-white text-[15px] font-semibold flex flex-row justify-between">
          <div>Billing Expiration</div>
          <div>X</div>
        </div>
        <div className="text-white text-[10px] font-light mt-2">
          Your billing is about expired in 3 days, Soon your account will be
          unactivated
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-10">
        {navItems.map((item, idx) => (
          <div key={idx + "nav"} className="mb-2">
            <div className="text-[10px]">{item?.type}</div>
            <div className="flex flex-col gap-3">
              {item.nav.map((item, idx) => (
                <div
                  key={idx + "navitem"}
                  className={`ml-10 ${idx === 0 ? "mt-2" : "mt-0"}`}
                >
                  <NavItem
                    name={item.name}
                    icon={item.icon}
                    path={item?.pathName}
                    onClick={() => navigate(item.pathName)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
