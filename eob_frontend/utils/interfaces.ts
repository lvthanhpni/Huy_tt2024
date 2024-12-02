export interface ISVGIcon {
  className?: string;
}
export interface IFolderItems {
  id: number;
  name: string;
  children: number[];
  is_root: boolean;
  can_upload: boolean;
  owner: number;
}

export interface IFileItem {
  id: number;
  description: string;
  file_upload: string;
  folder_id: number;
  material_type: string;
  name: string;
  preview_images_get: { id: number; image: string; material: number }[];
  software: string;
  create_user: string;
}
