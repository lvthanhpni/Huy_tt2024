"use client";
import { useEffect, useState } from "react";
import { checkAuthorization } from "@/utils/authorization";
import Image from "next/image";

const navigation_left = [
  { title: "Công trình tiêu biểu", link: "/" },
  { title: "Tin tức", link: "/" },
];

const navigation_right = [
  {
    title: "Đăng ký thành viên",
    link: "/register",
  },
  { title: "VLXD Đăng ký", link: "/" },
  {
    title: "Đăng nhập",
    link: "/login",
  },
];

interface IUserInformation {
  name: string;
  email: string;
  phone_number: string;
  avatar: string;
}

function NavigationBar() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<IUserInformation>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthorized(false);
  };

  useEffect(() => {
    const getUserInformation = async () => {
      const { isAuthorized, user } = await checkAuthorization();
      setIsAuthorized(isAuthorized);
      setUser(user);
      console.log(user);
    };
    getUserInformation();
  }, []);

  return (
    <div>
      <div className="px-[16px] flex w-full justify-between h-[47px] bg-[#1c2d5a] text-white text-[0.8rem]">
        <div className="px-[4px] flex">
          {navigation_left.map((item) => (
            <a
              className="px-[16px] h-full flex items-center"
              key={item.title}
              href={item.link}
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="px-[15px] flex">
          {isAuthorized && user ? (
            <div
              className="flex items-center relative"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center cursor-pointer hover:bg-[#233975] p-[5px] duration-200">
                <Image
                  src={process.env.NEXT_PUBLIC_API_SERVER + user?.avatar}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px] rounded-full mr-[10px]"
                />
                <div>
                  <p>{user.name}</p>
                </div>
              </div>
              <div
                className={`absolute bg-white top-[49px] duration-500 overflow-hidden flex flex-col justify-around text-[#1b2c5a] w-fit text-[16px] ${
                  isDropdownOpen ? "h-[82px] border-2" : "h-0 border-0"
                }`}
              >
                <div
                  onClick={() => (window.location.href = "/profile")}
                  className="px-[24px] py-[4px] cursor-pointer hover:bg-gray-200"
                >
                  <p>Thông tin tài khoản</p>
                </div>
                <div
                  onClick={handleLogout}
                  className="px-[24px] py-[4px] cursor-pointer hover:bg-gray-200"
                >
                  <a>Đăng xuất</a>
                </div>
              </div>
            </div>
          ) : (
            navigation_right.map((item) => (
              <a
                key={item.title}
                className="px-[16px] h-full flex items-center"
                href={item.link}
              >
                {item.title}
              </a>
            ))
          )}
          <button className="ml-[8px] py-[4px] px-[8px]">Vi</button>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
