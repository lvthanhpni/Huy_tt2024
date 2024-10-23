import { NavigationArrowRight } from "@/public/assets/svg";
import news1 from "../../public/assets/images/news1.jpg";
import news2 from "../../public/assets/images/news2.jpg";
import news3 from "../../public/assets/images/news3.jpg";
import news4 from "../../public/assets/images/news4.jpg";
import Image from "next/image";

const news_data = [
  {
    title: "Festival KTS trẻ toàn quốc lần thứ IX - Yên Bái 2023",
    summary:
      "Kỳ liên hoan sắc màu !! Vượt qua bao gian khó, bao áp lực... ngày trở về trọn niềm vui. Đi xin từng tấm hình cùng với anh em, bởi nhớ lắm từng nục cười giữa anh em.",
    image: news1,
  },
  {
    title: "Dulux kỷ niệm 20 năm colourfutures - Màu Dulux của năm",
    summary:
      "Năm 2023 đánh dấu một mốc quan trọng - kỷ niệm 20 năm chiến dịch Màu Dulux Của Năm. Tìm nguồn cảm hứng từ những câu chuyện mà sắc trong một ấn phẩm ColourFutures đặc biệt, và khám phá tất cả những màu sắc ra mắt trong hai thập kỷ qua. Hãy để màu sắc biến đổi cuộc sống của bạn.",
    image: news2,
  },
  {
    title: "LỘ DIỆN TOP 10 CHUNG KẾT AN CƯỜNG INTERIOR DESIGN AWARD 2023",
    summary:
      "Kỳ liên hoan sắc màu  !!! <br>Ngày 17 tháng 10 vừa qua, tại Sheraton Hotel, An Cường interior Design Award 2023 đã cùng Hội đồng Giám khảo tiến hành chọn ra Top 10 dự án xuất sắc nhất trong 21 dự án vào Bán kết được công bố vào ngày 6 thánh 9 vừa qua.",
    image: news3,
  },
  {
    title: "AREUS Atelier đối thoại với văn hóa bằng nội thất CHẤM",
    summary:
      "Thiết kế của BST nội thất - Chấm Collection được lấy cảm hứng từ trạng thái của giọt mực và nét bút khi thi triển thư pháp.",
    image: news4,
  },
];

function NewsSection() {
  return (
    <div className="pt-[48px] mb-[48px]">
      <p className="px-[144px] text-[#1b2c5a] text-[17.6px] font-bold mb-[16px]">
        Tin tức cập nhật
      </p>
      <div className="grid grid-cols-4 px-[144px] gap-[30px]">
        {news_data.map((item, index) => (
          <div
            className="flex flex-col justify-between w-full h-full border-2 border-[#dee2e6]"
            key={index}
          >
            <div>
              <div className="">
                <Image src={item.image} alt="Picture"></Image>
              </div>
              <div className="p-[16px] flex flex-col justify-between ">
                <div>
                  <p className="mt-[16px] mb-[8px] text-wrap text-[#263d7d] font-bold uppercase">
                    {item.title}
                  </p>
                  <p className="pt-[24px] mb-[16px] text-wrap">
                    {item.summary}
                  </p>
                </div>
              </div>
            </div>
            <button className="flex text-[#262d7d] font-bold items-center self-end mt-[10px] mb-[20px] mr-[15px]">
              Xem thêm
              <NavigationArrowRight className="h-[19px]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsSection;
