import Layout from "@/components/Layout";
import { bgHero } from "@/styles/icons";
import { CardDevices, CardMessage, Message } from "./components";
import { MdArrowForwardIos } from "react-icons/md";

const HomePage: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <div className="flex flex-col justify-between">
        <div className="relative">
          <img src={bgHero} />
          <div className="absolute top-0 px-[39px] py-[34px] flex flex-col justify-between h-full w-full">
            <div>
              <div className="text-[50px] font-semibold w-[431px]">
                Here’s What All You Need
              </div>
            </div>

            <div className="flex justify-between">
              {[1, 2, 3, 4].map((_, idx) => (
                <CardMessage key={idx} />
              ))}
            </div>
          </div>
        </div>

        <div className="h-full bg-white">
          <Message />
        </div>
        <div className="px-10 mb-10">
          <div className="flex gap-5 items-center">
            <div className="text-[25px] font-bold">Devices</div>
            <MdArrowForwardIos color="#00C9B1" size={20} />
          </div>

          <div className="flex items-center justify-between mt-8">
            <CardDevices title="Device Status" type="status" />
            <CardDevices title="Database Customers" type="customer" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
