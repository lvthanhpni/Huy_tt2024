"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { checkAuthorization } from "@/utils/authorization";
import { useRouter } from "next/navigation";
import logo from "@/public/assets/images/logo.png";
import Image from "next/image";

const memberBenefits = [
  {
    content: "Tải và không giới hạn các family thiết kế chất lượng",
  },
  { content: "Xem các bài viết chuyên ngành của các chuyên gia hàng đầu" },
  {
    content:
      "Tham gia các hoạt động chuyên môn và giao lưu với các đơn vị VLXD",
  },
  { content: "Tham gia chương trình tích điểm thành viên" },
];

function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
<<<<<<< HEAD
=======
  const [organizationName, setOrganizationName] = useState("");
>>>>>>> b8884514466f89ab739a87b3dcfdceeb403ce8d6
  const [taxcode, setTaxcode] = useState("");
  const [isIndividual, setIsIndividual] = useState(true);
  const [, setIsAuthorized] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const getUserInformation = async () => {
      const { isAuthorized } = await checkAuthorization();
      setIsAuthorized(isAuthorized);
      if (isAuthorized) {
        router.push("/");
      }
    };
    getUserInformation();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("phone_number", phoneNumber);
    data.append("name", fullName);
<<<<<<< HEAD
=======
    data.append("organization_name", organizationName);
>>>>>>> b8884514466f89ab739a87b3dcfdceeb403ce8d6
    data.append("tax_code", taxcode);

    if (password !== confirmPassword) {
      alert("Mật khẩu không trùng khớp");
    } else {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/register/",
          data
        );
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refreshToken);
        alert("Đăng ký thành công");
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="pt-[16px] pb-[48px] flex w-full h-full justify-center">
      <div className="shadow-[0px_20px_20px_-5px_rgb(219,224,222)] rounded-[10px] overflow-hidden">
        <div className="h-[17px] bg-[#1b2c5a]"></div>
        <div className="flex p-[8px] gap-[96px] max-lg:flex-col-reverse">
          <div className="flex flex-col items-center flex-1">
            <p className="py-[16px] mb-[8px] text-[20px] uppercase text-[#1b2c5a] font-bold">
              Đăng ký thành viên EOB
            </p>
            <div className="w-full px-[24px] flex gap-[48px] mb-[17px]">
              <div>
                <input
                  type="radio"
                  id="personal_choice"
                  name="organization"
                  value={"individual"}
                  defaultChecked
                  onChange={(e) => {
                    setIsIndividual(e.target.checked);
                  }}
                />
                <label htmlFor="personal_choice">Cá nhân</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="organization_choice"
                  name="organization"
                  value={"organization"}
                  onChange={(e) => {
                    setIsIndividual(!e.target.checked);
                  }}
                />
                <label htmlFor="organization choice">Tổ chức</label>
              </div>
            </div>
            <form
              onSubmit={(e) => handleRegister(e)}
              className="flex flex-col w-full px-[24px] gap-[16px]"
            >
<<<<<<< HEAD
              <div className="py-[10px] px-[14px] h-[52px] border-2 border-[#dbe0de] flex items-center">
                <input
                  className="focus-visible:outline-none"
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  type="text"
                  placeholder={isIndividual ? "Họ và tên" : "Tên tổ chức"}
                />
              </div>
              {!isIndividual && (
                <div className="py-[10px] px-[14px] h-[52px] border-2 border-[#dbe0de] flex items-center">
                  <input
                    className="focus-visible:outline-none"
                    onChange={(e) => setTaxcode(e.target.value)}
                    type="text"
                    placeholder="Mã số thuế"
                  />
                </div>
=======
              {isIndividual ? (
                <div className="py-[10px] px-[14px] h-[52px] border-2 border-[#dbe0de] flex items-center">
                  <input
                    className="focus-visible:outline-none"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setFullName(e.target.value);
                    }}
                    type="text"
                    placeholder="Họ và tên"
                  />
                </div>
              ) : (
                <>
                  <div className="py-[10px] px-[14px] h-[52px] border-2 border-[#dbe0de] flex items-center">
                    <input
                      className="focus-visible:outline-none"
                      onChange={(e) => setOrganizationName(e.target.value)}
                      type="text"
                      placeholder="Tên tổ chức"
                    />
                  </div>
                  <div className="py-[10px] px-[14px] h-[52px] border-2 border-[#dbe0de] flex items-center">
                    <input
                      className="focus-visible:outline-none"
                      onChange={(e) => setTaxcode(e.target.value)}
                      type="text"
                      placeholder="Mã số thuế"
                    />
                  </div>
                </>
>>>>>>> b8884514466f89ab739a87b3dcfdceeb403ce8d6
              )}
              <div className="py-[10px] px-[14px] h-[52px] border-2 border-[#dbe0de] flex items-center">
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  className="focus-visible:outline-none"
                  placeholder="Số điện thoại"
                />
              </div>
              <div className="py-[10px] px-[14px] h-[52px] border-2 border-[#dbe0de] flex items-center">
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus-visible:outline-none"
                  placeholder="Email"
                />
              </div>
              <div className="py-[10px] px-[14px] h-[52px] border-2 border-[#dbe0de] flex items-center">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus-visible:outline-none"
                  placeholder="Mật khẩu"
                />
              </div>
              <div className="py-[10px] px-[14px] h-[52px] border-2 border-[#dbe0de] flex items-center">
                <input
                  type="password"
                  className="focus-visible:outline-none"
                  placeholder="Xác nhận mật khẩu"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex mb-[20px]">
                <input
                  type="checkbox"
                  id="confirm_policy"
                  onChange={(e) => setIsAccepted(e.target.checked)}
                  className="mr-[5px]"
                />
                <label className="text-wrap" htmlFor="confirm_policy">
                  Đồng ý tất cả điều khoản trong điều khoản sử dụng
                </label>
              </div>
              <button
                type="submit"
                className="px-[24px] py-[4px] text-white w-fit self-center mb-[24px] rounded-[4px]"
                style={{
                  cursor:
                    isAccepted &&
                    password === confirmPassword &&
                    password !== ""
                      ? "pointer"
                      : "not-allowed",
                  backgroundColor:
                    isAccepted &&
                    password === confirmPassword &&
                    password !== ""
                      ? "#1b2c5a"
                      : "#d3d3d3",
                }}
                disabled={
                  !isAccepted && password !== confirmPassword && password === ""
                }
              >
                Đăng ký
              </button>
            </form>
          </div>
          <div className="flex-1 flex flex-col justify-center px-[40px] max-lg:mt-[20px]">
            <Image
              src={logo}
              alt="logo"
              width={120}
              className="mb-[24px]"
            ></Image>
            <p className="text-wrap text-[#1b2c5a] italic max-w-[260px]">
              &quot;{<span className="font-bold">Đăng ký thành viên EOB</span>}
              <br /> để bắt đầu trao đổi family thiết kế và kiến thức kiến trúc
              - xây dựng&quot;
            </p>
            <div className="w-[79px] border-[1px] border-black my-[16px]"></div>
            <p className="text-[#1b2c5a] font-semibold">
              Quyền lợi thành viên Star:
            </p>
            <ul className="pl-[20px] list-disc">
              {memberBenefits.map((benefit, index) => (
                <li key={index}>
                  <p className="text-wrap">{benefit.content}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
