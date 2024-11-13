"use client";
import React, { useState } from "react";
import axios from "axios";

function RegisterCompany() {
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("company_name", companyName);
    data.append("phone_number", phoneNumber);
    data.append("password", password);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/register/",
        data
      );
      window.location.href = "/";
      const { access, refresh } = response.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>VLXD Đăng ký</p>
        <input
          onChange={(event) => setCompanyName(event.target.value)}
          type="text"
          placeholder="Tên công ty"
        />
        <input
          onChange={(event) => setPhoneNumber(event.target.value)}
          type="text"
          placeholder="Số điện thoại"
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="text"
          placeholder="Mật khẩu"
        />
        <input type="text" placeholder="Xác nhận mật khẩu" />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}

export default RegisterCompany;
