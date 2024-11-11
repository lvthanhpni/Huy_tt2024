"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { checkAuthorization, responseGoogle } from "@/utils/authorization";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import logo from "@/public/assets/images/logo.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Hàm xử lý đăng nhập thông thường
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/login/",
        {
          email,
          password,
        }
      );
=======
      const response = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });
>>>>>>> b8884514466f89ab739a87b3dcfdceeb403ce8d6
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("Đăng nhập thất bại");
    }
  };

  useEffect(() => {
    const getUserInformation = async () => {
      const { isAuthorized } = await checkAuthorization();
      if (isAuthorized) {
        router.push("/");
      }
    };
    getUserInformation();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center p-[15px] pb-[48px]">
      <div className="shadow-[0px_20px_20px_-5px_rgb(219,224,222)] w-[33%] rounded-md overflow-hidden">
        <div className="h-[17px] bg-[#1b2c5a]"></div>
        <div className="py-[16px] px-[48px]">
          <div className="flex flex-col items-center">
            <Image src={logo} width={120} alt="logo" />
            <p className="mt-[24px] mb-[8px] text-[#1b2c5a] text-[24px] uppercase font-bold">
              Đăng nhập
            </p>
          </div>
          <div className="mb-[16px]">
            <GoogleOAuthProvider clientId="754532910179-tkloedp0pkjk6ds0adb7509v4o760o1r.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => console.log("Đăng nhập thất bại")}
              />
            </GoogleOAuthProvider>
          </div>
          <div className="flex items-center mb-[16px]">
            <div className="flex-1 border-[1px] h-0"></div>
            <p className="mx-[15px]">Hoặc</p>
            <div className="flex-1 border-[1px] h-0"></div>
          </div>
          <form
            className="flex flex-col gap-[16px] items-center"
            onSubmit={handleLogin}
          >
            <div className="h-[52px] px-[14px] rounded-md w-full border-[#dbe0de] border-2 flex items-center">
              <input
                type="text"
                id="email_input"
                name="email"
                placeholder="Email"
                className="focus-visible:outline-none w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="h-[52px] rounded-md px-[14px] w-full border-[#dbe0de] border-2 flex items-center">
              <input
                type="password"
                id="password_input"
                name="password"
                placeholder="Mật khẩu"
                className="focus-visible:outline-none w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex w-full justify-between">
              <div>
                <input
                  type="checkbox"
                  id="rememberPassword"
                  name="rememberPassword"
                  className="mr-[5px]"
                />
                <label htmlFor="rememberPassword">Nhớ mật khẩu</label>
              </div>
              <a href="/">
                <p>Quên mật khẩu?</p>
              </a>
            </div>
            <button
              type="submit"
              className="bg-[#1b2c5a] text-white uppercase w-fit px-[40px] py-[8px] rounded-md"
            >
              Đăng nhập
            </button>
            <a href="/register">
              <p className="text-[#b4b4b4]">Đăng ký</p>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
