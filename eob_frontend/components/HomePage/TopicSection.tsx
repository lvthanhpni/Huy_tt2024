import { NavigationArrowRight } from "@/public/assets/svg";
import topic1 from "../../public/assets/images/topic1.jpg";
import topic2 from "../../public/assets/images/topic2.jpg";
import topic3 from "../../public/assets/images/topic3.jpg";
import topic4 from "../../public/assets/images/topic4.jpg";
import Image from "next/image";

const topic = [
  {
    image: topic1,
    title: "Thư viện family thiết kế",
    summary:
      "Thư viện family thiết kế gồm các family do các KTS và đơn vị VLXD uy tính chia sẻ. Hãy đăng ký và trở thành thành viên EOB để tải các family miễn phí cho các bản vẽ công trình.",
  },
  {
    image: topic2,
    title: "Hoạt động chuyên đề",
    summary:
      "Các hoạt động chuyên đề phong phú như hội thảo, coffee talk, luncheon, lunch box với các chủ đề hấp dẫn và diễn giả đầu ngành. Hãy theo dõi và tham gia các hoạt động giành cho các thành viên EOB.",
  },
  {
    image: topic3,
    title: "Bài viết chuyên đề",
    summary:
      "Tập hợp các bài viết kiến trúc xây dựng của các thành viên EOB pro, các diễn giả đầu ngành và các giải pháp VLXD uy tính. Hãy theo dõi để không bỏ lỡ các bài viết bổ ích.Thư viện family thiết kế gồm các family do các KTS và đơn vị VLXD uy tính chia sẻ. Hãy đăng ký và trở thành thành viên EOB để tải các family miễn phí cho các bản vẽ công trình.",
  },
  {
    image: topic4,
    title: "Khoá học thiết kế chuyên đề",
    summary:
      "Các khoá học thiết kế phong phú được chia sẻ bởi các chuyên gia đầu ngành. Theo dõi để tham gia các khóa học phù hợp.",
  },
];
function TopicSection() {
  return (
    <div className="px-[144px] grid grid-cols-2 gap-[32px] pt-[96px] mb-[24px]">
      {topic.map((item, index) => (
        <div
          key={index}
          className="p-[15px] flex border-[1px] border-[#dee2e6] hover:shadow-[0_0_30px_rgba(221,221,221,1)] duration-300"
        >
          <div className="h-[300px] w-auto flex items-center">
            <Image
              className="min-w-[200px]"
              src={item.image.src}
              alt="picture1"
              width={196}
              height={196}
            />
          </div>
          <div className="pl-[15px] justify-between flex flex-col">
            <div>
              <p className="text-wrap text-center font-bold text-[#1c2d5a]">
                {item.title}
              </p>
              <p className="text-wrap text-[12.8px]">{item.summary}</p>
            </div>
            <div className="cursor-pointer self-end flex items-center text-[#1c2d5a] font-bold text-[14px]">
              Đọc thêm
              <NavigationArrowRight className="h-[19px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopicSection;
