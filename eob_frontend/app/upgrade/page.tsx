"use client";
import { useState } from "react";
import axios from "axios";
import { checkAuthorization } from "@/utils/authorization";

function UpgradeUserRankPage() {
  const [isAcceptPolicy, setIsAcceptPolicy] = useState(false);

  const handleUpgradeClick = async () => {
    checkAuthorization();
    try {
      const response = await axios.patch(
        process.env.NEXT_PUBLIC_API_URL + "/user/",
        {
          user_rank: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      console.log(response);
      console.log("Cập nhật hạng người dùng thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-[48px] flex justify-center gap-[32px]">
      <div className="w-[488px] rounded-[10px] overflow-hidden shadow-[0rem_0.5rem_1rem_#00000026]">
        <div className="uppercase py-[8px] mb-[32px] text-center text-[17.6px] bg-[#ed1d47] font-bold text-white">
          <p>Thành viên Star</p>
        </div>
        <div className="px-[64px]">
          <ul className="list-disc">
            <li className="text-wrap">
              Tải miễn phí và không giới hạn các family thiết kế chất lượng
            </li>
            <li className="text-wrap">
              Xem các bài viết chuyên ngành của các chuyên gia hàng đầu
            </li>
            <li className="text-wrap">
              Tham gia các hoạt động chuyên môn và giao lưu với các đơn vị VLXD
            </li>
            <li className="text-wrap">
              Tham gia chương trình tích điểm thành viên
            </li>
          </ul>
        </div>
      </div>
      <div className="w-[488px] rounded-[10px] overflow-hidden shadow-[0rem_0.5rem_1rem_#00000026]">
        <div className="uppercase py-[8px] mb-[32px] text-center text-[17.6px] bg-[#ed1d47] font-bold text-white">
          <p>Thành viên Pro</p>
        </div>
        <div className="px-[64px] flex flex-col">
          <ul className="list-disc">
            <li className="text-wrap">
              Tải miễn phí và không giới hạn các family thiết kế chất lượng
            </li>
            <li className="text-wrap">
              Xem các bài viết chuyên ngành của các chuyên gia hàng đầu
            </li>
            <li className="text-wrap">
              Tham gia các hoạt động chuyên môn và giao lưu với các đơn vị VLXD
            </li>
            <li className="text-wrap">
              Tham gia chương trình tích điểm thành viên
            </li>
            <li className="text-wrap">
              300MB lưu trữ - chia sẻ các family và thu phí
            </li>
            <li className="text-wrap">
              Đăng bài viết chuyên môn không giới hạn
            </li>
            <li className="text-wrap">
              Kết nối làm các family cho các đơn vị VLXD
            </li>
          </ul>
          <div className="mt-[48px] mb-[24px]">
            <input
              onChange={() => {
                setIsAcceptPolicy(!isAcceptPolicy);
              }}
              defaultChecked={isAcceptPolicy}
              type="checkbox"
              id="accept-policy"
              className="mr-[7px]"
            />
            <label htmlFor="accept-policy">
              Đồng ý tất cả điều khoản trong điều khoản sử dụng
            </label>
          </div>
          <div className="flex justify-center w-full mb-[64px]">
            <button
              onClick={handleUpgradeClick}
              disabled={!isAcceptPolicy}
              className={`w-fit uppercase py-[4px] px-[10px] rounded-md ${
                isAcceptPolicy
                  ? "text-white bg-[#1b2c5a] cursor-pointer"
                  : "text-[#00000042] bg-[#0000001f] cursor-not-allowed"
              }`}
            >
              Yêu cầu nâng cấp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradeUserRankPage;
