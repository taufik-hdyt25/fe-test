import { Icon } from "@/components/Atoms";
import { ic_devices } from "@/styles/icons";

interface ICardProps {
  title?: string;
  type?: string;
}
const CardDevices = ({ title, type }: ICardProps) => {
  return (
    <div className="w-[506px] h-[390px] border border-black rounded-md shadow-xl px-5 py-2">
      <div>{title}</div>

      {type === "status" && (
        <div className="flex flex-col gap-5 mt-10">
          {[1, 2, 3].map((_, idx) => (
            <DeviceItem key={idx + "devices"} index={idx} type={type} />
          ))}
        </div>
      )}
      {type === "customer" && (
        <div className="flex flex-col gap-5 mt-10">
          {[1, 2].map((_, idx) => (
            <DeviceItem key={idx + "devices"} index={idx} type={type} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardDevices;

interface IDevices {
  index?: number;
  type?: string;
}
const DeviceItem = ({ index, type }: IDevices) => {
  return (
    <div className="flex gap-5 items-center border-b-2 pb-2">
      {type === "status" && <Icon icon={ic_devices} />}
      {type === "customer" && (
        <img
          src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
          alt="profile"
          className="w-7 h-7 rounded-full"
        />
      )}
      <div className="flex gap-3 items-center">
        <div>Ikhsan’s Device</div>
        <span
          className={`text-[13px] ${
            index === 1 ? "bg-[#C8040466]" : "bg-[#00DC303D]"
          } px-3 py-2 rounded-md ${
            index === 1 ? "text-[#C80404]" : "text-[#00DC30]"
          }`}
        >
          {type === "status"
            ? index === 1
              ? "DISCONNECTED"
              : "CONNECTED"
            : type === "customer"
            ? index === 1 && type === "customer"
              ? "UNVERIFIED"
              : "VERIFIED"
            : null}
        </span>
      </div>
    </div>
  );
};
