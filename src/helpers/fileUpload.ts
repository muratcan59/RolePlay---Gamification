import { useEffect } from "react";
import FileService from "../services/FileService";

const fileUpload = {
  submitFile: async (file: any) => {
    const formData = new FormData();
    formData.append("files", file);

    return FileService.postFile(formData);
  },
  submitFiles: async (files: any) => {
    const formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("files", files.item(i));
    }
    return FileService.postFile(formData);
  },
};
export default fileUpload;
