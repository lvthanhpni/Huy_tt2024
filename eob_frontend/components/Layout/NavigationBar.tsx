"use client";
import { useEffect, useState } from "react";
import { checkAuthorization } from "@/utils/authorization";

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
}

function NavigationBar() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<IUserInformation>();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthorized(false);
  };

  useEffect(() => {
    const getUserInformation = async () => {
      const { isAuthorized, user } = await checkAuthorization();
      setIsAuthorized(isAuthorized);
      setUser(user);
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
              onClick={handleLogout}
              className="flex cursor-pointer items-center"
            >
              Welcome, {user.name}
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
