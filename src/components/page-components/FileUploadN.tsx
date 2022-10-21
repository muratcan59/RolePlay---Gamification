import React from "react";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import "../../assets-react/file.upload.css";
import FileService from "../../services/FileService";

const FileUploadN = () => {
    const getUploadParams = () => {
        return {url: 'https://httpbin.org/post'}
    }

    const handleChangeStatus = ({meta}: any, status: any) => {
    }

    const handleSubmit = (files: any, allFiles: any) => {
        allFiles.forEach((f: any) => f.remove())
        const formData = new FormData()
        formData.append('file', files[0].file);

        return FileService.postFile(formData);
    }

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            maxFiles={1}
            multiple={false}
        />
    )
}

export default FileUploadN;