import Input from "components/input/Input";
import { db } from "firebase-app/firebase-config";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PostEdit = ({ user, postId, post }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {},
    mode: "onChange",
  });
  const formRef = useRef(null);
  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (
        showForm &&
        formRef.current &&
        !formRef.current.contains(event.target)
      ) {
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [showForm]);

  const handleClickMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleFormStatus = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    async function fetchStatus() {
      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef);
      reset(docSnap.data());
    }
    fetchStatus();
  }, [postId, reset]);

  const handleUpdateUser = async (values) => {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      stt: values.stt,
    });
    toast.success("Cập nhật thành công !!!");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  const navigate= useNavigate();
  const handleDetetePost = async (postId) => {
    const colRel = doc(db, "posts", postId);
    Swal.fire({
      title: "Bạn muốn xóa bài đăng này?",
      text: "Bạn sẽ không thể phục hồi lại bài đăng khi xóa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
    }).then(async(result) => {
      if (result.isConfirmed) {
         await deleteDoc(colRel);
        Swal.fire("Đã xóa bài đăng", "Thành công");
        navigate("/homePage")
      }
      
    });
    
  };

  return (
    <div>
      {showForm && (
        <div className="fixed top-0 left-0 flex items-start  justify-center w-screen h-screen bg-[rgba(0,0,0,0.5)] z-50">
          <form
            onSubmit={handleSubmit(handleUpdateUser)}
            className="h-40 p-5 bg-white mt-[150px] w-80 rounded-xl"
            ref={formRef}
          >
            <label className="">Cập nhật trạng thái</label>
            <Input
              type="text"
              name="stt"
              control={control}
              className="w-full mt-2 border border-black"
            />
            <button
              type="submit"
              className="w-full h-auto py-2 my-6 bg-blue-500 rounded-xl"
            >
              Cập nhật
            </button>
          </form>
        </div>
      )}
      <div className="relative flex" onClick={handleClickMenu}>
        {showMenu && (
          <div className="left-0 bg-white w-[100px] h-[50px] mt-2 border border-black">
            <ul>
              <li
                onClick={handleFormStatus}
                className="pt-2 text-sm cursor-pointer hover:bg-slate-200"
              >
                Sửa trạng thái
              </li>
              <li
                onClick={() => handleDetetePost(postId)}
                className="text-sm cursor-pointer hover:bg-slate-200"
              >
                Xóa
              </li>
            </ul>
          </div>
        )}
        <i className="pr-4 text-xl cursor-pointer bx bx-grid-alt"></i>
      </div>
    </div>
  );
};

export default PostEdit;
