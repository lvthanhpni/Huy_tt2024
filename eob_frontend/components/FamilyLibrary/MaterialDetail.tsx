"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { IFileItem, IReviewPost } from "@/utils/interfaces";
import { useParams } from "next/navigation";
import { Button, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FacebookIconNonBackground,
  LinkedInNonBackgroundIcon,
} from "@/public/assets/svg";
import XSocialMedia from "@/public/assets/svg/XSocialMedia";
import DownloadIcon from "@/public/assets/svg/DownloadIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ReactQuill from "react-quill";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      // onClick={handleRatingPost}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function MaterialDetails() {
  const [fileDetail, setFileDetail] = useState<IFileItem | null>();
  const param = useParams();
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const [value, setValue] = useState(0);
  const [ratingValue, setRatingValue] = useState<number>(5);

  const [comment, setComment] = useState<string | null>(null);

  const [postList, setPostList] = useState<IReviewPost[] | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleRatingPost = () => {
    console.log(param.fileid[0]);
    axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/review/",
      {
        star: ratingValue,
        comment: comment,
        product_id: param.fileid[0],
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      }
    );
  };

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/files/" + param.fileid)
      .then((response) => {
        setFileDetail(response.data);
        setUserAvatar(response.data.create_user_avatar);
      });

    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/review/" +
          `?product_id=${param.fileid}`
      )
      .then((response) => {
        setPostList(response.data);
        console.log(response.data);
      });
  }, []);
  return (
    <div className="w-full">
      <div className="flex flex-1 justify-around">
        <div>
          <Image
            src={
              fileDetail
                ? process.env.NEXT_PUBLIC_API_SERVER +
                  fileDetail?.preview_images_get[0].image
                : ""
            }
            alt="Preview Image"
            width={600}
            height={300}
          />
          <div className="w-[600px] mt-[48px]">
            <Swiper
              slidesPerView={3}
              loop={false}
              spaceBetween={10}
              onSlideChange={(e) => console.log(e)}
              centeredSlides={true}
            >
              {fileDetail?.preview_images_get.map((item, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={process.env.NEXT_PUBLIC_API_SERVER + item.image}
                    alt="Preview Image"
                    width={365}
                    height={300}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className=" overflow-hidden"></div>
        </div>
        <div className="flex-1 px-8 flex flex-col justify-between">
          <div className="flex justify-around">
            <div className="font-bold text-[20px]">{fileDetail?.name}</div>
            <div>
              <p>Cung cấp bởi:</p>
              <p className="uppercase text-[#ed1d47]">
                {fileDetail?.create_user}
              </p>
              <div className="h-[100px] w-[100px] text-center overflow-hidden">
                {userAvatar && (
                  <Image
                    src={process.env.NEXT_PUBLIC_API_SERVER + userAvatar}
                    alt="Avatar"
                    width={200}
                    height={100}
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <p>
              Giá:{" "}
              <span className="text-[18px] text-[#1b2c5a] font-bold">
                Miễn phí
              </span>
            </p>
            <div className="flex">
              <p>Chia sẻ: </p>
              <div className="flex gap-[10px]">
                <FacebookIconNonBackground className="w-[20px] h-[20px] text-[#1b2c5a]" />
                <XSocialMedia className="w-[20px] h-[20px] text-[#1b2c5a]" />
                <LinkedInNonBackgroundIcon className="text-[#1b2c5a] w-[20px] h-[20px]" />
              </div>
            </div>
            <div className="flex gap-[20px]">
              <Button sx={{ backgroundColor: "#1b2c5a", color: "white" }}>
                <div className="flex gap-[10px] items-center">
                  <DownloadIcon className="h-[15px] w-[15px]" />
                  <p>Tải family</p>
                </div>
              </Button>
              <Button sx={{ backgroundColor: "#ed1d47", color: "white" }}>
                <div className="flex gap-[10px] items-center">
                  <DownloadIcon className="h-[15px] w-[15px] " />
                  <p>Tải tài liệu</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[8px]">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="MÔ TẢ" {...a11yProps(0)} />
            <Tab label="ĐÁNH GIÁ" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div
            dangerouslySetInnerHTML={{ __html: fileDetail?.description || "" }}
          ></div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="flex">
            <div className="flex-1">
              <p className="text-[#1b2c5a] text-[24px]">
                {postList ? postList.length : 0} đánh giá
              </p>
              <div className="flex flex-col">
                {postList?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex border-2 border-gray-200 p-[10px] m-[10px]"
                    >
                      <div className="flex flex-col">
                        <div className="font-bold text-[20px]">
                          {item.post_user_name}
                        </div>
                        <div className="flex">
                          <div>
                            <StyledRating
                              name="read-only"
                              value={item.star}
                              readOnly
                            />
                          </div>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.comment }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[20px]">
              <p className="text-[24px]">Đánh giá</p>
              <p className="text-[12px]">Những trường bắt buộc</p>
              <div className="flex">
                <p>Bạn đã đánh giá:</p>
                <StyledRating
                  name="simple-uncontrolled"
                  onChange={(event, newValue) => {
                    setRatingValue(newValue ? newValue : 5);
                  }}
                  defaultValue={ratingValue}
                />
              </div>
              <label htmlFor="user-rating-text" className="block">
                Nhận xét của tôi:
              </label>
              <div className="h-[200px]">
                <ReactQuill
                  theme="snow"
                  value={comment ? comment : ""}
                  onChange={setComment}
                  style={{ height: "150px" }}
                />
              </div>

              <Button
                onClick={handleRatingPost}
                className="w-fit"
                size="small"
                sx={{ backgroundColor: "#1b2c5a", color: "white" }}
              >
                Gửi
              </Button>
            </div>
          </div>
        </CustomTabPanel>
      </div>
    </div>
  );
}

export default MaterialDetails;
