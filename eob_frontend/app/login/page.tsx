"use client";
import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        data
      );
      console.log(response.data);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      console.log(localStorage);
    } catch (err) {
      console.log(err);
      alert("Đăng nhập thất bại");
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <div>
          <p>Đăng nhập</p>
        </div>
        <form onSubmit={(e) => handleLogin(e)}>
          <input
            type="text"
            id="email_input"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password_input"
            name="password"
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
