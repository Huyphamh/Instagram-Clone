import React, { useEffect } from "react";
import appstore from "../../imgs/ggStore.png";
import mircoS from "../../imgs/Microsoft.png";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import Input from "components/input/Input";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import slugify from "slugify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const FormSignUp = () => {
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup
      .string()
      .email("Hãy nhập đúng định dạng Email của bạn")
      .required("Hãy địa chỉ Email của bạn"),
    fullname: yup.string().required("Nhập tên người dùng của bạn"),
    password: yup
      .string()
      .min(8, "Mật khẩu của bạn phải chứa ít nhất 8 ký tự")
      .required("Hãy nhập mật khẩu của bạn"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      status: 1,
      avatar: "",
    });
    toast.success("Đăng ký tài khoản thành công!!!");
    navigate("/HomePage");
  };

  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  return (
    <div className="flex flex-col items-center mt-5">
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="shadow shadow-slate-300 w-[350px] h-auto p-9 flex flex-col border border-[#dcdedf] items-center text-center"
      >
        <p alt="" className="w-[220px] text-4xl font-bold pb-5 ">
          Instagarm
        </p>
        <p
          alt=""
          className="w-full leading-5 text-[17px] font-bold pb-5 text-[#737384]"
        >
          Đăng ký để xem ảnh và video từ bạn bè.
        </p>
        <Input
          type="email"
          name="email"
          control={control}
          placeholder="Nhập Email bạn muốn đăng ký"
        ></Input>
        <Input
          type="text"
          name="fullname"
          control={control}
          placeholder="Tên người dùng"
        ></Input>
        <Input
          type="password"
          name="password"
          control={control}
          placeholder="Mật khẩu"
        ></Input>

        <p className="text-xs text-[#858a8f] ">
          Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ
          của bạn lên Instagram.
          <span className="text-[#4cb5f9]">Tìm hiểu thêm</span>{" "}
        </p>
        <p className="text-xs text-[#858a8f] mt-4 mb-5">
          Bằng cách đăng ký, bạn đồng ý với{" "}
          <span className="text-[#4cb5f9]">Điều khoản</span> ,{" "}
          <span className="text-[#4cb5f9]">Chính sách quyền riêng tư</span> và
          <span className="text-[#4cb5f9]">Chính sách cookie</span> của chúng
          tôi.
        </p>
        {/* /////////////////////// */}
        <button
          type="submit"
          className=" bg-[#4cb5f9] w-full rounded-md h-8 text-white font-bold text-sm "
        >
          Đăng Ký
        </button>
      </form>
      <div className=" shadow shadow-slate-300 items-center justify-center w-[350px] h-auto p-5 mt-4 text-center border border-[#dcdedf]">
        <p className="text-sm ">
          Bạn đã có tài khoản?{" "}
          <Link className="text-[#4cb5f9]" to="/">
            Đăng nhập.
          </Link>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-[350px] h-auto p-5 mt-4 text-center ">
        <p className="mb-5 text-sm ">Tải ứng dụng.</p>
        <div className="flex">
          <img className="w-[134px] h-10 mr-2" src={appstore} alt="" />
          <img className="w-[134px] h-10" src={mircoS} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FormSignUp;
