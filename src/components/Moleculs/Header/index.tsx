import { IoIosNotifications, IoIosSettings, IoMdExit } from "react-icons/io";

const Header: React.FC = (): JSX.Element => {
  return (
    <div className="py-3 bg-teal-400 justify-end flex ">
      <div className="mr-10 flex items-center gap-7">
        <IoIosNotifications size={30} color="white" />
        <IoIosSettings color="white" size={30} />
        <IoMdExit color="white" size={30} />
        <div className="flex items-center bg-teal-200 rounded-full gap-2 w-fit px-1 py-1">
          <img
            className="w-7"
            src="https://cdn-icons-png.flaticon.com/512/9203/9203764.png"
          />
          <span className="text-xs">Jasmine J</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
