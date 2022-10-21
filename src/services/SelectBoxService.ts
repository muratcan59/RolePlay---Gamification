import { alertService } from "./AlertService";
import Service from "../helpers/service";
const URL = "/api/DataTransferPolicy";
const SelectBoxService ={
  getProcessTypes: async () => {
    try {
      return await Service.get(`${URL}/GetProcessTypes`);
    } catch (error:any) {
      alertService.error(error?.response?.data, {
        autoClose: false,
        keepAfterRouteChange: false,
      });
    }
  },
  getUsers: async () => {
    try {
      return await Service.get(`${URL}/GetUsers`);
    } catch (error:any) {
      alertService.error(error?.response?.data, {
        autoClose: false,
        keepAfterRouteChange: false,
      });
    }
  }
}
export default SelectBoxService;