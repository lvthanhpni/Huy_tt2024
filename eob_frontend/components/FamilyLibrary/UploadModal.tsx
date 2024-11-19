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
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CloseButtonIcon } from "@/public/assets/svg";

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
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
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
          <form className="flex flex-col gap-[20px]">
            <TextField label="Tên file upload" variant="outlined" />
            <div className="flex justify-around gap-[20px]">
              <FormControl className="flex-1">
                <InputLabel id="software-select">Chọn phần mềm</InputLabel>
                <Select labelId="software-select" label="Chọn phần mềm">
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
                <Select labelId="material-type-select" label="Loại vật liệu">
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
                  onChange={(event) => console.log(event.target.files)}
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
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>
            </div>
            <div className="flex flex-col">
              <label htmlFor="description-input">Mô tả</label>
              <textarea
                rows={5}
                name=""
                id="description-input"
                className="text-wrap border-2 border-gray-300 rounded-md p-[5px]"
              ></textarea>
            </div>
            <div className="flex justify-end gap-[20px]">
              <Button variant="contained">Upload</Button>
              <Button variant="contained">Đặt lại</Button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
}

export default UploadModal;
