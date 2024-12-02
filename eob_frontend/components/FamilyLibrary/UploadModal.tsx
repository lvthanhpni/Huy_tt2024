import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CloseButtonIcon } from "@/public/assets/svg";
import { IFolderItems } from "@/utils/interfaces";
import axios from "axios";
import { refreshAccessToken } from "@/utils/authorization";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const SoftwareList = ["Revit", "Auto CAD", "Sketch UP", "Archi CAD", "Tekla"];
const MaterialType = ["Kiến trúc", "Kết cấu", "MEP"];

function UploadModal({
  isOpen,
  setIsOpen,
  chosenFolder,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  chosenFolder: IFolderItems | null;
}) {
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<FileList | null>(null);
  const [description, setDescription] = useState<string>("");
  const [software, setSoftware] = useState<string>("Revit");
  const [materialType, setMaterialType] = useState<string>("Kiến trúc");
  const [fileName, setFileName] = useState<string>("");

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file_upload", fileUpload!);
    data.append("name", fileName);
    data.append("software", software);
    data.append("material_type", materialType);
    data.append("description", description);
    if (chosenFolder?.id !== undefined) {
      data.append("folder_id", chosenFolder.id.toString());
    }

    if (previewImage) {
      Array.from(previewImage).forEach((image) => {
        data.append("preview_images_post", image);
      });
    }

    try {
      refreshAccessToken();
      axios
        .post(process.env.NEXT_PUBLIC_API_URL + "/files/", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          setIsOpen(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <div className="flex justify-between">
          <h1 className="text-[20px]">Upload file</h1>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <CloseButtonIcon className="w-[20px]" />
          </button>
        </div>
        <hr className="border-gray-300" />
        <div className="mt-[20px]">
          <form
            onSubmit={(e) => handleUpload(e)}
            className="flex flex-col gap-[20px]"
          >
            <TextField
              label="Tên file upload"
              variant="outlined"
              onChange={(e) => setFileName(e.target.value)}
            />
            <div className="flex justify-around gap-[20px]">
              <FormControl className="flex-1">
                <InputLabel id="software-select">Chọn phần mềm</InputLabel>
                <Select
                  onChange={(e) => {
                    setSoftware(e.target.value);
                  }}
                  defaultValue={software}
                  labelId="software-select"
                  label="Chọn phần mềm"
                >
                  {SoftwareList.map((solfware, index) => {
                    return (
                      <MenuItem key={index} value={solfware}>
                        {solfware}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl className="flex-1">
                <InputLabel id="material-type-select">Loại vật liệu</InputLabel>
                <Select
                  onChange={(e) => {
                    setMaterialType(e.target.value);
                  }}
                  defaultValue={materialType}
                  labelId="material-type-select"
                  label="Loại vật liệu"
                >
                  {MaterialType.map((material, index) => (
                    <MenuItem key={index} value={material}>
                      {material}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="flex justify-between">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                className="w-[200px]"
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => {
                    setFileUpload(event.target.files![0]);
                    console.log(event.target.files);
                  }}
                  multiple
                />
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                className="w-[200px]"
              >
                Hình preview
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => {
                    console.log(event.target.files);
                    setPreviewImage(event.target.files);
                  }}
                  multiple
                />
              </Button>
            </div>
            <div className="flex flex-col">
              <label htmlFor="description-input">Mô tả</label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
              />
              {/* <textarea
                rows={5}
                name=""
                onChange={(e) => setDescription(e.target.value)}
                id="description-input"
                className="text-wrap border-2 border-gray-300 rounded-md p-[5px]"
              ></textarea> */}
            </div>
            <div className="flex justify-end gap-[20px]">
              <Button type="submit" variant="contained">
                Upload
              </Button>
              <Button variant="contained">Đặt lại</Button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
}

export default UploadModal;
