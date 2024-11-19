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
