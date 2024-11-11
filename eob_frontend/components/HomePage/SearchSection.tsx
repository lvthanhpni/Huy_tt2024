import React from "react";
import bg_search from "../../public/assets/images/bg_search.jpg";
import SearchIcon from "@/public/assets/svg/SearchIcon";

function SearchSection() {
  const [searchFolder, setSearchFolder] = React.useState("Tất cả NCC");
  return (
    <div
      className="h-[484px] flex items-end "
      style={{
        background: `url(${bg_search.src}) no-repeat center center/cover`,
      }}
    >
      <div className="h-[173px] px-[24px] py-[16px] w-full flex justify-center items-center bg-[#fbf9f9b3] flex-col">
        <p className="text-[24px] mb-[5px] text-[#1c2d5a] font-bold">
          Công trình tiêu biểu
        </p>
        <div className="h-[52px] w-[25%] flex rounded-[50px]">
          <input
            type="text"
            className="h-[52px] flex-1 p-[10px] focus-visible:outline-none rounded-l-[50px]"
            placeholder="Tìm kiếm"
          />
          <div className="flex relative gap-[10px] rounded-r-[50px] border-2">
            <button className="">{searchFolder}</button>
            <div className=""></div>
            <button className="w-[16px] mr-[10px] h-[52px] flex items-center justify-center">
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
