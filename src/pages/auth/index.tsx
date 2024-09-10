import Form from "@/components/Templates/Form";
import { useState } from "react";

const AuthPage: React.FC = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <div className="h-screen flex justify-center items-center bg-blue-400 ">
      <div className="w-[350px]  bg-white  rounded-md shadow-md p-5">
        <div className="text-sm text-center grid grid-cols-2 w-full border-2">
          {/* Tombol Login */}
          <div
            className={`px-4 py-2 cursor-pointer ${
              activeTab === "login"
                ? "bg-blue-400 text-white"
                : "bg-gray-200 text-black"
            } border-r-2`} // Border di kanan
            onClick={() => setActiveTab("login")}
          >
            Login
          </div>

          {/* Tombol Register */}
          <div
            className={`px-4 py-2 cursor-pointer ${
              activeTab === "register"
                ? "bg-blue-400 text-white"
                : "bg-gray-200 text-black"
            }`} // Tidak perlu border kiri karena grid otomatis memisahkan
            onClick={() => setActiveTab("register")}
          >
            Register
          </div>
        </div>

        <div className="mt-5">
          {activeTab === "login" && (
            <Form setActiveTab={setActiveTab} activeTab={activeTab} />
          )}
          {activeTab === "register" && (
            <Form setActiveTab={setActiveTab} activeTab={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
