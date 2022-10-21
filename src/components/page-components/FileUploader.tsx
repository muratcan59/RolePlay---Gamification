interface Props {
    fileOnChange?: any,
    fileAccept?: any
}

const FileUploader = ({ fileOnChange, fileAccept }: Props) => {
    return (
        <span className="file-uploader">
            <input type="file" onChange={fileOnChange} accept={fileAccept} />
        </span>
    );
}

export default FileUploader;