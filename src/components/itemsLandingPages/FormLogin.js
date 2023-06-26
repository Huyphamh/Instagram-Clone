import React from "react";
import appstore from "../../imgs/ggStore.png";
import mircoS from "../../imgs/Microsoft.png";
import { Link, useNavigate } from "react-router-dom";
import Input from "components/input/Input";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
const FormLogin = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const handleSignIn = async (values) => {
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/HomePage");
  };
  return (
    <div className="mt-4">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="w-[350px] h-[400px] p-8 shadow shadow-slate-300 flex flex-col ss:border border-[#dcdedf] items-center text-center"
      >
        <p alt="" className="w-[220px] text-4xl font-bold pb-5 mb-10">
          Instagarm
        </p>
        <Input
          type="email"
          placeholder="Số điện thoại hoặc email"
          name="email"
          control={control}
        ></Input>
        <Input
          type="password"
          name="password"
          control={control}
          placeholder="Mật khẩu"
        ></Input>
        <button className=" bg-[#4cb5f9] w-full rounded-md h-8 text-white font-bold text-sm mt-2">
          Đăng Nhập
        </button>
        <p className="mt-5 mb-5 text-sm">Tải ứng dụng.</p>
        <div className="flex">
          <img className="w-[134px] h-10 mr-2" src={appstore} alt="" />
          <img className="w-[134px] h-10" src={mircoS} alt="" />
        </div>
      </form>
      <div className="shadow shadow-slate-300 flex items-center justify-center w-full h-16 mt-4 text-center border-[#dcdedf] ss:border">
        <p className="text-sm">
          Bạn chưa có tài khoản ư?{" "}
          <Link className="text-[#4cb5f9]" to="/signup">
            Đăng ký
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default FormLogin;
