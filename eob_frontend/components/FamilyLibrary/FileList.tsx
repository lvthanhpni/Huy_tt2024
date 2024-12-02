import React from "react";
import { AddButtonIcon } from "@/public/assets/svg";
import { IFileItem, IFolderItems } from "@/utils/interfaces";
import { useRouter } from "next/navigation";

function FileList({
  isAuthorized,
  setIsUploadModalOpen,
  fileItems,
  setMaterialDetailId,
  setChosenFolder,
}: {
  isAuthorized: boolean;
  setChosenFolder: React.Dispatch<React.SetStateAction<IFolderItems | null>>;
  setIsUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fileItems: IFileItem[];
  setMaterialDetailId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const router = useRouter();
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <p className="text-[20px] uppercase text-[#1b2c5a] font-bold">
            Model mới &gt;
          </p>
          {isAuthorized && (
            <button
              onClick={() => {
                setIsUploadModalOpen(true);
              }}
              className="text-white bg-red-700 w-[30px]"
            >
              <AddButtonIcon />
            </button>
          )}
        </div>
        {fileItems.length !== 0 ? (
          <div className="grid grid-cols-4 gap-[20px] cursor-pointer justify-around my-[20px]">
            {fileItems.map((items, index) => {
              return (
                <div
                  onClick={() => {
                    setMaterialDetailId(items.id);
                    setChosenFolder(null);
                    router.push(`/family-eob/${items.id}`);
                  }}
                  className="border-[1px] border-gray-300 hover:shadow-lg duration-200"
                  key={index}
                >
                  <div>
                    <img
                      src={
                        process.env.NEXT_PUBLIC_API_SERVER +
                        items.preview_images_get[0].image
                      }
                      alt=""
                    />
                  </div>
                  <div className=" min-h-[100px] flex flex-col justify-around items-center">
                    <div className="font-bold text-[20px]">{items.name}</div>
                    <div>{items.software}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="">Các model mới cập nhật gần đây nhất</p>
        )}
        <div></div>
        <div></div>
      </div>
      <div>
        <p className="text-[20px] uppercase text-[#1b2c5a] font-bold">
          Model theo nhà cung cấp
        </p>
        <p>Các model phân loại theo nhà cung cấp</p>
      </div>
      <div>
        <p className="text-[20px] uppercase text-[#1b2c5a] font-bold">
          Model theo phần mềm
        </p>
        <p>Các model phân loại theo phần mềm thiết kế</p>
      </div>
    </div>
  );
}

export default FileList;
