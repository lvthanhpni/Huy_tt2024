"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FolderList from "@/components/FamilyLibrary/FolderList";
import { IFileItem, IFolderItems } from "@/utils/interfaces";
import { SearchIcon } from "@/public/assets/svg";
import { checkAuthorization, refreshAccessToken } from "@/utils/authorization";
import UploadModal from "@/components/FamilyLibrary/UploadModal";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import FileList from "@/components/FamilyLibrary/FileList";
import InstructionBanner from "@/components/FamilyLibrary/InstructionBanner";
import MaterialDetail from "@/components/FamilyLibrary/MaterialDetail";

function EOBLibrary() {
  const router = useRouter();

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
  const [isLastFolder, setIsLastFolder] = useState(false);
  const [folderName, setFolderName] = useState<string>("");
  const [chosenFolder, setChosenFolder] = useState<IFolderItems | null>(null);
  const [isUploadAvailable, setIsUploadAvailable] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [fileItems, setFileItems] = useState<IFileItem[] | []>([]);
  const [materialDetailId, setMaterialDetailId] = useState<number | null>(null);

  const [rootFolder, setRootFolder] = useState({
    id: 0,
    name: "root",
    children: [],
  });

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

  const handleDeleteFolder = async () => {
    refreshAccessToken();
    if (canDelete) {
      try {
        await axios
          .delete(
            process.env.NEXT_PUBLIC_API_URL + `/folder/${chosenFolder?.id}/`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then(() => {
            fetchFolderData();
            setChosenFolder(null);
            setCanDelete(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCreateFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      axios
        .post(
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
        )
        .then(() => {
          fetchFolderData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRenameFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      axios
        .patch(
          process.env.NEXT_PUBLIC_API_URL + `/folder/${chosenFolder?.id}/`,
          {
            name: folderName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then(() => {
          fetchFolderData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuthorization().then((res) => {
      setIsAuthorized(res.isAuthorized);
    });
    fetchFolderData();
  }, []);

  return (
    <div className="py-[12px] px-[30px] w-full">
      <MaterialDetail />
    </div>
  );
}

export default EOBLibrary;
