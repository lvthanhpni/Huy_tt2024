import { Dispatch, SetStateAction, useState } from "react";
import { IFolderItems } from "@/utils/interfaces";
import { FolderArrow, FolderIcon } from "@/public/assets/svg";
import { Collapse } from "@mui/material";
import axios from "axios";
import { refreshAccessToken } from "@/utils/authorization";

function FolderList({
  data,
  level,
  setIsLastFolder,
  setIsUploadAvailable,
  setChosenFolder,
  chosenFolder,
  setCanDelete,
}: {
  data: IFolderItems[];
  level: number;
  setIsLastFolder?: Dispatch<SetStateAction<boolean>>;
  setIsUploadAvailable?: Dispatch<SetStateAction<boolean>>;
  chosenFolder?: IFolderItems | null;
  setChosenFolder?: Dispatch<SetStateAction<IFolderItems | null>>;
  setCanDelete?: Dispatch<SetStateAction<boolean>>;
}) {
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  const checkDeletePermission = async (level: number) => {
    refreshAccessToken();
    await axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/user/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        if (
          response.data.user_id ===
          data.find((folder) => folder.id === level)?.owner
        ) {
          if (setCanDelete) {
            console.log("Can delete");
            setCanDelete(true);
          }
        } else {
          if (setCanDelete) {
            setCanDelete(false);
          }
        }
      });
  };

  const handleFolderClick = () => {
    checkDeletePermission(level);

    const folder = data.find((folder) => folder.id === level);
    const hasChildren = folder && folder.children.length > 0;

    setIsFolderOpen(!isFolderOpen);

    if (setChosenFolder) {
      if (folder) {
        setChosenFolder(folder);
      }
    }
    if (setIsLastFolder) {
      setIsLastFolder(!hasChildren);
    }

    if (folder?.can_upload) {
      if (setIsUploadAvailable) {
        setIsUploadAvailable(true);
      }
    } else {
      if (setIsUploadAvailable) {
        setIsUploadAvailable(false);
      }
    }
  };

  return (
    <div className="ml-[10px]">
      <div>
        {data.map((folder, index) => {
          if (folder.id === level) {
            return (
              <div
                onClick={handleFolderClick}
                className={`flex h-[24px] items-center cursor-pointer ${
                  chosenFolder?.id === folder.id ? "bg-blue-300" : ""
                } hover:bg-gray-200`}
                key={index}
              >
                {folder.children.length > 0 && (
                  <div
                    style={{ rotate: isFolderOpen ? "45deg" : "0deg" }}
                    className="duration-200"
                  >
                    <FolderArrow className="h-[15px]" />
                  </div>
                )}
                <FolderIcon className="h-[15px] mr-[10px]" />
                <p>{folder.name}</p>
              </div>
            );
          }
        })}
      </div>
      {data.map((folder) => {
        if (folder.id === level) {
          return folder.children.map((child, index) => (
            <Collapse key={index} className="ml-[20px]" in={isFolderOpen}>
              <FolderList
                key={index}
                data={data}
                level={child}
                setIsLastFolder={setIsLastFolder}
                setIsUploadAvailable={setIsUploadAvailable}
                setChosenFolder={setChosenFolder}
                chosenFolder={chosenFolder}
                setCanDelete={setCanDelete}
              />
            </Collapse>
          ));
        }
      })}
    </div>
  );
}

export default FolderList;
