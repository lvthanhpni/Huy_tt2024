"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/");
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("phone_number", phoneNumber);
    data.append("name", fullName);
    console.log(data.getAll("name"));
    if (password !== confirmPassword) {
      alert("Mật khẩu không trùng khớp");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/register/",
          data
        );
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refreshToken);
        alert("Đăng ký thành công");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="pt-[16px] pb-[48px] flex w-full h-full justify-center">
      <div className="shadow-[0px_20px_20px_-5px_rgb(219,224,222)]">
        <div></div>
        <div>
          <div className="flex flex-col items-center">
            <p>Đăng ký thành viên EOB</p>
            <div>
              <input
                type="radio"
                id="personal_choice"
                name="organization"
                value={"personal"}
              />
              <label htmlFor="personal_choice">Cá nhân</label>
              <input
                type="radio"
                id="organization_choice"
                name="organization"
                value={"organization"}
              />
              <label htmlFor="organization choice">Tổ chức</label>
            </div>
            <form
              onSubmit={(e) => handleRegister(e)}
              className="flex flex-col items-center"
            >
              <input
                className="py-2 my-2"
                onChange={(e) => {
                  console.log(e.target.value);
                  setFullName(e.target.value);
                }}
                type="text"
                placeholder="Họ và tên"
              />
              <input
                className="py-2 my-2"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="py-2 my-2"
                type="text"
                placeholder="Số điện thoại"
              />
              <input
                className="py-2 my-2"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
              />
              <input
                className="py-2 my-2"
                type="password"
                placeholder="Xác nhận mật khẩu"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="flex mb-[20px]">
                <input type="checkbox" id="confirm_policy" />
                <label className="text-wrap" htmlFor="confirm_policy">
                  Đồng ý tất cả điều khoản trong điều khoản sử dụng
                </label>
              </div>
              <button
                type="submit"
                className="px-[10px] py-[5px] bg-[#1b2c5a] text-white w-fit"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
