import { useToast } from "@/hooks/use-toast";

import { API } from "@/lib/axios";
import { useFormik } from "formik";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { IBodyAuth } from "@/interfaces/auth.interfaces";

interface IForm {
  activeTab: string;
  setActiveTab: (a: string) => void;
}
const Form: React.FC<IForm> = ({ activeTab, setActiveTab }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const handleSubmit = async (body: IBodyAuth) => {
    try {
      setIsLoading(true);
      const resp = await API.post("/auth/sign-in", body);
      setIsLoading(false);
      if (resp?.data?.statusCode === 200) {
        toast({
          title: resp?.data?.message,
          description: "",
          className: "bg-green-500 text-white",
        });
        navigation("/");
        localStorage.setItem("token", resp?.data?.token);
      } else {
        toast({
          title: resp?.data?.message,
          description: "",
          className: "bg-red-500 text-white",
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleRegister = async (body: IBodyAuth) => {
    try {
      setIsLoading(true);
      const resp = await API.post("/auth/sign-up", body);
      setIsLoading(false);
      if (resp?.data?.statusCode === 200) {
        setActiveTab("login");
        toast({
          title: resp?.data?.message,
          description: "",
          className: "bg-green-500 text-white",
        });
      } else {
        toast({
          title: resp?.data?.message,
          description: "",
          className: "bg-red-500 text-white",
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    password: Yup.string()
      .min(6, "Password minimal 6 karakter")
      .required("Password wajib diisi"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (activeTab === "login") {
        handleSubmit(values);
      } else if (activeTab === "register") {
        handleRegister(values);
      }
    },
  });

  return (
    <div>
      <form className="flex flex-col gap-5 mb-5" onSubmit={formik.handleSubmit}>
        <Input
          name="email"
          placeholder="Input Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          required
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-xs">{formik.errors.email}</div>
        )}

        <Input
          name="password"
          placeholder="Input Password"
          onChange={formik.handleChange}
          type="password"
          required
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-xs">{formik.errors.password}</div>
        )}

        <Button type="submit" className="bg-blue-400 ">
          {isLoading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            activeTab.toUpperCase()
          )}
        </Button>
      </form>

      <div className="text-xs flex justify-center gap-2">
        <span>
          {activeTab === "login"
            ? "Belum punya akun ?"
            : activeTab === "register"
            ? "Sudah punya akun ?"
            : ""}
        </span>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (activeTab === "login") {
              setActiveTab("register");
            } else if (activeTab === "register") {
              setActiveTab("login");
            }
          }}
          className="text-blue-400"
        >
          {activeTab === "login"
            ? "Daftar Sekarang"
            : activeTab === "register"
            ? "Login"
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Form;
