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
  avatar: string;
  description: string;
  file_upload: string;
  folder_id: number;
  material_type: string;
  name: string;
  preview_images_get: { id: number; image: string; material: number }[];
  software: string;
  create_user: string;
}

export interface IReviewPost {
  id: number;
  star: number;
  comment: string;
  product_id: number;
  post_user: number;
  post_user_avatar: string;
  post_user_name: string;
  // "id": 1,
  // "star": 4,
  // "comment": "<p>zxzxsada</p>",
  // "product_id": 31,
  // "post_user": 1,
  // "post_user_avatar": "/media/avatars/Miyabi_oJpHGWV.png",
  // "post_user_name": "Nguyen Le Ngoc Huy"
}
