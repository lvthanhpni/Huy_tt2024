import "./globals.css";
import logo from "../public/assets/images/logo.png";
import Image from "next/image";
import {
  SearchIcon,
  LocationIcon,
  MailIcon,
  NavigationArrowRight,
  TwitterIcon,
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
  DropdownIcon,
} from "../public/assets/svg";
import NavigationBar from "@/components/Layout/NavigationBar";

const footer_navigation = [
  {
    title: "Trang chủ",
    link: "/",
  },
  {
    title: "Tất cả thư viện",
    link: "/family",
  },
  {
    title: "Thư viện EOB",
    link: "/family-eob",
  },
  {
    title: "Thư viện VLXD",
    link: "/family-vlxd",
  },
];

const other_links = [
  {
    title: "Hoạt động",
    link: "/",
  },

  {
    title: "Khóa học",
    link: "/",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>EOB</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <div className="w-full fixed shadow-[2px_2px_7px_rgba(48,57,91,0.5)] z-50">
          <NavigationBar />
          <div className="py-[8px] px-[16px] flex justify-between bg-white">
            <div className="flex items-center flex-1">
              <a href="/">
                <Image
                  src={logo}
                  alt="logo"
                  className="w-[120px] my-[8px] ml-[15px]"
                />
              </a>
              <div className="relative px-[20px] py-[10px] ml-[58px]">
                <p className="uppercase font-bold text-[#1c2d5a] flex">
                  Thư viện Model
                  <DropdownIcon className="w-[24px] h-[24px] ml-[5px]" />
                </p>
                {/* <div className="absolute w-full text-[#263d7d] flex flex-col items-center right-0 top-[40px] bg-white border-[1px] border-gray-300 py-[8px]">
                  <a href="" className="py-[4px]">
                    <p>Tất cả thư viện</p>
                  </a>
                  <a href="" className="py-[4px]">
                    <p>Thư viện EOB</p>
                  </a>
                  <a href="" className="py-[4px]">
                    Thư viện VLXD
                  </a>
                </div> */}
              </div>
            </div>
            <div className="px-[15px] flex items-center flex-1 justify-end">
              <div className="h-[54px] mx-[15px] px-[10px] rounded-[40px] justify-between w-[40%] border-2 border-[#dbe0be] flex items-center">
                <input
                  type="text"
                  className="h-[54px] flex items-center bg-transparent focus-visible:outline-none "
                  placeholder="Tìm kiếm"
                />
                <div className="w-[24px] h-[24px]">
                  <SearchIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[144px]">{children}</div>
        <div className="bg-[#1b2c5a] text-white pt-[96px] px-[31px]">
          <div className="flex mb-[48px]">
            <div className="w-[34%] pr-[48px]">
              <p className="uppercase text-[20px] mb-[24px] text-wrap">
                Công ty cổ phần Era Of Bim (EOB)
              </p>
              <p className="text-wrap flex items-start">
                <LocationIcon className="w-[24px] h-[24px] mr-[16px]" />
                Tầng 4 62A Huỳnh Mẫn Đạt, Phường 19, Quận Bình Thạnh, Tp.Hồ Chí
                Minh, Việt Nam
              </p>
              <p className="flex">
                <MailIcon className="w-[20px] h-[20px] mr-[16px]" />
                info.eob@gmail.com
              </p>
            </div>
            <div className="grid grid-cols-3 flex-1">
              <div className="flex flex-col">
                <p className="mb-[24px] uppercase text-[20px]">
                  Truy cập nhanh
                </p>
                {footer_navigation.map((item, index) => (
                  <a className="mb-[0.5rem] flex" key={index} href={item.link}>
                    <span className="h-full flex items-center">
                      <NavigationArrowRight className="h-[16px] w-[8xp]" />
                    </span>
                    {item.title}
                  </a>
                ))}
              </div>
              <div className="flex flex-col">
                <p className="mb-[24px] text-[20px] uppercase">Khác</p>
                {other_links.map((item, index) => (
                  <a className="mb-[0.5rem] flex" key={index} href={item.link}>
                    <span className="h-full flex items-center">
                      <NavigationArrowRight className="h-[16px] w-[8xp]" />
                    </span>
                    {item.title}
                  </a>
                ))}
              </div>
              <div>
                <p className="mb-[24px] text-[20px] uppercase">
                  Theo dõi chúng tôi
                </p>
                <div className="flex gap-[8px]">
                  <a href="x.com">
                    <TwitterIcon className="w-[40px] h-[40px]" />
                  </a>
                  <a href="facebook.com">
                    <FacebookIcon className="w-[40px] h-[40px]" />
                  </a>
                  <a href="linkedin.com">
                    <LinkedInIcon className="w-[40px] h-[40px]" />
                  </a>
                  <a href="instagram.com">
                    <InstagramIcon className="w-[40px] h-[40px]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-[48px] py-[24px] border-t-2 border-white">
            <p>
              © <a href="/">Eob.vn.</a>All Rights Reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
