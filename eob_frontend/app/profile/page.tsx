"use client";
import { checkAuthorization, refreshAccessToken } from "@/utils/authorization";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "@/public/assets/images/logo.png";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import avatar_alt from "@/public/assets/images/avatar-alt.png";
import { CameraIcon } from "@/public/assets/svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IFolderItems } from "@/utils/interfaces";
import FolderList from "@/components/FamilyLibrary/FolderList";

interface IUser {
  avatar: string;
  email: string;
  name: string;
  occupation: string;
  organization: string;
  phone_number: string;
  user_rank: number;
}

interface IOccupation {
  id: number;
  name: string;
}

const software_list = ["Revit", "Auto CAD", "Sketch UP", "Archi CAD", "Tekla"];

const organization = [
  "Trường Đại học Sư phạm",
  "Trường Đại học Công nghệ",
  "Trường Đại học Xây dựng",
  "Trường Đại học Bất động sản",
  "Khác",
];

const member_rank = ["Star", "Pro"];

const material_type_list = ["Kiến trúc", "Kết cấu", "MEP"];

function ProfilePage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [downloadMonth, setDownloadMonth] = useState(3);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [occupations, setOccupations] = useState<IOccupation[]>([
    {
      id: 0,
      name: "Chưa có update",
    },
  ]);
  const [rootFolder, setRootFolder] = useState({
    id: 0,
    name: "root",
    children: [],
  });

  const [chosenFolder, setChosenFolder] = useState<IFolderItems | null>(null);
  const [isUploadAvailable, setIsUploadAvailable] = useState(false);
  const [folderListData, setFolderListData] = useState<IFolderItems[]>([
    {
      id: 0,
      name: "root",
      children: [],
      is_root: true,
      can_upload: false,
      owner: 1,
    },
  ]);
  const [avatar, setAvatar] = useState<string | File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [software, setSoftware] = useState<string>("");
  const [materialType, setMaterialType] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [folderName, setFolderName] = useState<string>("");
  const [canDelete, setCanDelete] = useState(false);

  const router = useRouter();

  const fetchFolderData = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/folder"
      );
      setFolderListData(response.data);
      setRootFolder(
        response.data.reduce((min: number, item: IFolderItems) => {
          return item.id < min ? item.id : min;
        })
      );
    } catch {
      console.log("Error fetching folder data");
    }
  };

  const handleCreateFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/folder/",
        {
          name: folderName,
          parent: chosenFolder?.id,
          is_root: false,
          can_upload: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    fetchFolderData();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];
    if (files) {
      setAvatar(files);
      setAvatarPreview(URL.createObjectURL(files)); // Preview image
    }
  };

  const handleDeleteFolder = async () => {
    refreshAccessToken();
    console.log(chosenFolder);
    if (canDelete) {
      try {
        const response = await axios.delete(
          process.env.NEXT_PUBLIC_API_URL + `/folder/${chosenFolder?.id}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchFolderData();
  };

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", fileName);
    data.append("folder_id", chosenFolder?.id.toString() || "1");
    data.append("description", description);
    data.append("software", software);
    data.append("material_type", materialType);
    if (previewImage) {
      data.append("preview_image", previewImage);
    }
    if (fileUpload) {
      data.append("file_upload", fileUpload);
    }
    data.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    checkAuthorization();
    axios.post(process.env.NEXT_PUBLIC_API_URL + "/files/", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", user?.name || "");
    data.append("email", user?.email || "");
    data.append("phone_number", user?.phone_number || "");
    data.append("organization", user?.organization || "");
    data.append("occupation", user?.occupation || "");
    data.append("user_rank", user?.user_rank.toString() || "");
    if (avatar) {
      data.append("avatar", avatar);
    }
    console.log(localStorage.getItem("access"));
    checkAuthorization();
    try {
      axios
        .put(process.env.NEXT_PUBLIC_API_URL + "/user/", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuthorization().then((auth) => {
      setUser(auth.user);
      console.log(auth.user);
      if (!auth.user) {
        router.push("/login");
      }
    });
    const getOccupations = async () => {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/occupation"
      );
      setOccupations(response.data);
    };

    fetchFolderData();
    getOccupations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => (prevUser ? { ...prevUser, [name]: value } : null));
  };

  return (
    <div className="py-[12px]">
      <div className="flex flex-col items-center">
        <div className="max-w-[1138px] w-[75%] shadow-[0px_20px_20px_-5px_#dbe0de] rounded-[10px] overflow-hidden">
          <div className="h-[17px] bg-[#1b2c5a] "></div>
          <div className="p-[8px]">
            <div className="flex flex-col items-center">
              <Image src={logo} alt="eob" className="max-w-[120px] mt-[8px]" />
              <p className="uppercase mt-[24px] mb-[8px] text-[24px] font-bold text-[#1b2c5a]">
                Thông tin thành viên eob của tôi
              </p>
            </div>
            <form
              method="POST"
              onSubmit={handleSubmit}
              className="min-h-[490px] px-[72px] flex flex-col items-center"
            >
              <div className="grid grid-cols-2 gap-[160px]">
                <div className="flex flex-col justify-between">
                  <div className="flex gap-[10px] items-end">
                    <p className="font-bold text-[#1b2c5a]">
                      Thành viên {member_rank[user?.user_rank || 0]}
                    </p>
                    <a href="/upgrade" className="text-[12px]">
                      Thăng hạng thành viên pro
                    </a>
                  </div>
                  <TextField
                    id="name"
                    name="name"
                    label="Họ và tên"
                    variant="standard"
                    defaultValue={user?.name || " "}
                    onChange={handleChange}
                  />
                  <div className="w-full">
                    <InputLabel
                      id="organization-select"
                      className="text-[12px]"
                    >
                      Tổ chức
                    </InputLabel>
                    <Select
                      variant="standard"
                      defaultValue={user?.organization || ""}
                      labelId="organization-select"
                      className="flex"
                      onChange={(e) =>
                        setUser((prevUser) =>
                          prevUser
                            ? { ...prevUser, organization: e.target.value }
                            : null
                        )
                      }
                    >
                      {organization.map((value, index) => {
                        return (
                          <MenuItem key={index} value={value}>
                            {value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                  <TextField
                    id="phone_number"
                    name="phone_number"
                    label="Điện thoại*"
                    variant="standard"
                    defaultValue={user?.phone_number || " "}
                    onChange={handleChange}
                  />
                  <div className="w-full">
                    <InputLabel id="occupation-select" className="text-[12px]">
                      Lĩnh vực
                    </InputLabel>
                    <Select
                      variant="standard"
                      labelId="occupation-select"
                      className="flex"
                      value={user?.occupation || ""}
                      onChange={(e) => {
                        setUser((prevUser) =>
                          prevUser
                            ? { ...prevUser, occupation: e.target.value }
                            : null
                        );
                        console.log(user);
                      }}
                    >
                      {occupations.map((value, index) => {
                        return (
                          <MenuItem key={index} value={value.id}>
                            {value.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                  <TextField
                    id="email"
                    name="email"
                    label="email*"
                    variant="standard"
                    defaultValue={user?.email || " "}
                    onChange={handleChange}
                  />
                </div>
                <div className="pr-[64px] mt-[48px]">
                  <p className="mb-[8px] text-[12px] font-bold">
                    Hình đại diện (W 350 x H 150 pixel)
                  </p>
                  <div className="h-[120px] w-[120px] relative rounded-full overflow-hidden mb-[72px]">
                    <Image
                      src={
                        avatarPreview ||
                        (user?.avatar
                          ? process.env.NEXT_PUBLIC_API_SERVER + user?.avatar
                          : avatar_alt)
                      }
                      alt="avatar"
                      width={120}
                      height={120}
                      style={{ width: "auto", height: "100%" }}
                    ></Image>
                    <div className="absolute bottom-0 bg-[#3b3b3b33] w-[120px] h-[40px] flex justify-center cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        id="file-upload"
                        onChange={handleFileUpload}
                        className="hidden" // Ẩn input file mặc định
                      />
                      <label
                        htmlFor="file-upload"
                        className="w-full h-full flex items-center justify-center cursor-pointer"
                      >
                        <CameraIcon className="h-full" />
                      </label>
                    </div>
                  </div>
                  <ul className="list-disc list-inside mb-[16px]">
                    <li className="text-wrap">
                      Điền đầy đủ thông tin để tham gia các hoạt động của EOB
                      dành cho thành viên
                    </li>
                  </ul>
                  <p>
                    <span className="font-bold">
                      Tổng điểm: <span className="text-green-600">0</span>
                    </span>{" "}
                    (tải các family/tài liệu tính phí)
                  </p>
                  <a href="/" className="text-[#b4b4b4] text-[12px]">
                    Nạp thêm tiền
                  </a>
                  <a href="/" className="mt-[24px] block">
                    Đổi mật khẩu
                  </a>
                </div>
              </div>
              <div className="w-full flex justify-center mt-[8px] mb-[16px] self-end text-[14.4px] ">
                <button
                  type="submit"
                  className="text-white bg-[#1b2c5a] py-[4px] px-[24px] rounded-[0.25rem]"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-[48px] max-w-[1200px] w-full">
          <p className="text-[20px] font-bold text-[#1b2c5a] uppercase">
            Upload file
          </p>
          <div className="mb-[16px] flex">
            <div>
              <input
                placeholder="Tên thư mục mới"
                type="text"
                className="border-2 mb-[10px] h-[40px]"
                onChange={(e) => setFolderName(e.target.value)}
              />
              <button
                onClick={handleCreateFolder}
                disabled={!isUploadAvailable}
                className={`text-white bg-[#1b2c5a] px-[15px] h-[40px] ${
                  isUploadAvailable
                    ? "text-[#b4b4b4] bg-[#1b2c5a]"
                    : "text-white bg-[#f3f3f3]"
                }`}
              >
                Thư mục mới
              </button>
              <button
                onClick={handleDeleteFolder}
                className={`text-white bg-red-600 px-[15px] h-[40px] ${
                  canDelete
                    ? "text-white bg-red-600"
                    : "text-white bg-[#ffadad]"
                }`}
              >
                Xóa
              </button>
              <div className="w-[400px] p-[8px] border-[#dbe0de] border-[1px] h-fit">
                <FolderList
                  data={folderListData}
                  level={rootFolder.id}
                  setIsUploadAvailable={setIsUploadAvailable}
                  chosenFolder={chosenFolder}
                  setChosenFolder={setChosenFolder}
                  setCanDelete={setCanDelete}
                />
              </div>
            </div>
            <div className="flex-1">
              <form onSubmit={handleUpload}>
                <div className="flex flex-col p-[20px] gap-[10px]">
                  <TextField
                    className="mb-[10px]"
                    label="Tên file thiết kế"
                    variant="outlined"
                    onChange={(e) => {
                      setFileName(e.target.value);
                    }}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="software-label">
                      Phần mềm thiết kế
                    </InputLabel>
                    <Select
                      defaultValue={"Revit"}
                      labelId="software-label"
                      label="Phần mềm thiết kế"
                      onChange={(e) => {
                        setSoftware(e.target.value);
                      }}
                    >
                      {software_list.map((value, index) => {
                        return (
                          <MenuItem key={index} value={value}>
                            {value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="material-type-label">
                      Loại vật liệu
                    </InputLabel>
                    <Select
                      defaultValue={"Kiến trúc"}
                      labelId="material-type-label"
                      label="Loại vật liệu"
                      onChange={(e) => setMaterialType(e.target.value)}
                    >
                      {material_type_list.map((value, index) => {
                        return (
                          <MenuItem key={index} value={value}>
                            {value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <label htmlFor="preview-image">Hình Preview</label>
                  <input
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0]; // Lấy file đầu tiên
                      if (file) {
                        setPreviewImage(file);
                      } else {
                        setPreviewImage(null);
                      }
                    }}
                    id="preview-image"
                    accept="image/*"
                    type="file"
                  />
                  <label htmlFor="design-file">File Upload</label>
                  <input
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0]; // Lấy file đầu tiên
                      if (file) {
                        setFileUpload(file);
                      } else {
                        setFileUpload(null);
                      }
                    }}
                    id="design-file"
                    type="file"
                    // accept=".rvt,.dwg,.dxf,.skp,.pln,.mod,.teklastructures"
                  />
                  <label htmlFor="description">Mô tả</label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    className="border-2 border-gray-200"
                  ></textarea>
                  <div className="flex justify-end gap-[10px]">
                    <button
                      type="submit"
                      disabled={!isUploadAvailable}
                      className={`px-[10px] py-[5px] ${
                        isUploadAvailable
                          ? "cursor-pointer bg-[#1b2c5a] text-white"
                          : "cursor-not-allowed bg-[#e9e9e9] text-[#b4b4b4] "
                      }`}
                    >
                      Upload
                    </button>
                    <button className="px-[10px] py-[5px] bg-red-700 text-white">
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-[48px] max-w-[800px] w-full">
          <p className="text-[20px] font-bold text-[#1b2c5a] uppercase">
            Family chưa được tải về sau &gt;
          </p>
          <FormControl className="w-[300px] mt-[8px] mb-[24px]" size="small">
            <InputLabel id="month-amount">Số tháng</InputLabel>
            <Select
              className="w-[300px]"
              defaultValue={3}
              labelId="month-amount"
              label="Số tháng"
              onChange={(e) => setDownloadMonth(Number(e.target.value))}
            >
              <MenuItem value={3}>3 Tháng</MenuItem>
              <MenuItem value={5}>5 Tháng</MenuItem>
            </Select>
          </FormControl>
          <div className="mb-[16px]">
            <p className="text-center h-[40px]">
              Chưa có family nào chưa được tải về {downloadMonth} gần đây.
            </p>
          </div>
        </div>
        <div className=" w-full max-w-[800px] mb-[48px]">
          <div className="flex justify-between w-full mt-[48px]">
            <p className="text-[20px] font-bold text-[#1b2c5a] uppercase">
              Giao dịch đã thanh toán &gt;
            </p>
            <button>Export CSV</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
