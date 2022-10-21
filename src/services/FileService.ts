import Service from "../helpers/service";
import { alertService } from "./AlertService";

const URL = "/api/FileTransfer";

export const FileService = {
    postFile,
    postFileGlobalDb
};

function postFile(data: any) {
    try {
        return Service.post(`${URL}/TransferFile`, data).then(response => {
            return response;
        })
    } catch (error) {
        alertService.error("Error :(", { autoClose: false, keepAfterRouteChange: false })
    }
}

function postFileGlobalDb(data: any) {
    try {
        return Service.post(`${URL}/TransferFile?db=global`, data).then(response => {
            return response;
        })
    } catch (error) {
        alertService.error("Error :(", { autoClose: false, keepAfterRouteChange: false })
    }
}

export default FileService;
