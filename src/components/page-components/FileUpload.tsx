import {useState} from 'react';
import FileService from "../../services/FileService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUploadAlt} from "@fortawesome/free-solid-svg-icons";
import "../../assets-react/file.upload.css";
import {useDropzone} from "react-dropzone";

const FileUpload = () => {
    const [fileKey, setFileKey] = useState('' as any);
    const [fileName, setFileName] = useState('');
    const [acceptedFile, setAcceptedFile] = useState(null as any);
    const [previewFile, setPreview] = useState('');
    const [isImage, setImage] = useState(false);
    const {getRootProps, getInputProps} = useDropzone({
        onDrop: acceptedFiles => {
            let file = acceptedFiles[0];
            setPreview(URL.createObjectURL(file));
            setFileName(file.name);
            setAcceptedFile(file);
            setImage(file.type.indexOf('image') !== -1)
        }
    });

    const submitFile = async () => {
        const formData = new FormData()
        formData.append('file', acceptedFile);

        const key = await FileService.postFile(formData);
        setFileKey(key);
    }

    return (
        <div>
            <div className="section">
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="navIcon"/>
                    <p>Drag 'n' drop some files here,<br/>or<br/>click to select file</p>
                </div>
            </div>
            <aside>
                <div key={fileName}>
                    <div>
                        {isImage ? <img src={previewFile}/> : <a href={previewFile} target="_blank">{fileName}</a>}
                    </div>
                </div>
            </aside>
            <button type="submit" className="btn btn-primary" onClick={() => submitFile()}>Submit</button>
        </div>
    )
}
export default FileUpload;