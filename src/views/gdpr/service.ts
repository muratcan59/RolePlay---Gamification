import { alertService } from "../../services/AlertService";
import Service from "../../helpers/service";
const URL = "/api/GDPR";

function catchEx(error: any) {
  if (error?.response?.status === 401) {
    window.location.href = process.env.REACT_APP_API_WEBFORM + "/uyelik/react.user.aspx?source=" + window.location.href;
    return;
  }

  alertService.error(error?.response?.data?.title ?? error?.response?.data?.split('\n').slice(0, 1), {
    autoClose: false, keepAfterRouteChange: false,
  });
}

const GDPRService = {
  DataAnonymizationPolicyGet: async () => {
    try {
      return await Service.get(`${URL}/DataAnonymizationPolicyGet`);
    } catch (error: any) {
      catchEx(error);
    }
  },
  DataAnonymizationPolicySet: async (data: any) => {
    try {
      return await Service.post(`${URL}/DataAnonymizationPolicySet`, data);
    } catch (error: any) {
      catchEx(error);
    }
  },
  DataAnonymizationRequestList: async (data: any) => {
    try {
      return await Service.get(`${URL}/DataAnonymizationRequestList?startIndex=${data.startIndex}&dataCount=${data.dataCount}`);
    } catch (error: any) {
      catchEx(error);
    }
  },
  DataAnonymizationCancel: async (cvId: string) => {
    try {
      return await Service.post(`${URL}/DataAnonymizationCancel?cvId=${cvId}`);
    } catch (error: any) {
      catchEx(error);
    }
  },
  DataAnonymizationDelete: async (cvId: string) => {
    try {
      return await Service.delete(`${URL}/DataAnonymizationDelete?cvId=${cvId}`);
    } catch (error: any) {
      catchEx(error);
    }
  },
  DataRetentionPolicyGet: async () => {
    try {
      return await Service.get(`${URL}/DataRetentionPolicyGet`);
    } catch (error: any) {
      catchEx(error);
    }
  },
  DataRetentionPolicySet: async (dataRetentionTime: number) => {
    try {
      return await Service.post(`${URL}/DataRetentionPolicySet?dataRetentionTime=${dataRetentionTime}`);
    } catch (error: any) {
      catchEx(error);
    }
  },
  DataRetentionReport: async () => {
    try {
      return await Service.get(`${URL}/DataRetentionReport`);
    } catch (error: any) {
      catchEx(error);
    }
  },
  DataTransferPolicyGet: async () => {
    try {
      return await Service.get(`${URL}/DataTransferPolicyGet`);
    } catch (error: any) {
      catchEx(error);
    }
  },
  DataTransferPolicySet: async (data: any) => {
    try {
      return await Service.post(`${URL}/DataTransferPolicySet`, data);
    } catch (error: any) {
      catchEx(error);
    }
  },
  DataTransferReport: async (data: any) => {
    try {
      return await Service.get(`${URL}/DataTransferReport?startIndex=${data.startIndex}&dataCount=${data.dataCount}`);
    } catch (error: any) {
      catchEx(error);
    }
  },
  TermsOfUseGet: async (language: number) => {
    try {
      return await Service.get(`${URL}/TermsOfUseGet?language=${language}`);
    } catch (error: any) {
      catchEx(error);
    }
  },
  TermsOfUseSet: async (data: any) => {
    try {
      return await Service.post(`${URL}/TermsOfUseSet`, data);
    } catch (error: any) {
      catchEx(error);
    }
  },
  TermsOfUseReset: async (language: number) => {
    try {
      return await Service.delete(`${URL}/TermsOfUseReset?language=${language}`);
    } catch (error: any) {
      catchEx(error);
    }
  },
  PrivacyPolicyGet: async (language: number) => {
    try {
      return await Service.get(`${URL}/PrivacyPolicyGet?language=${language}`);
    } catch (error: any) {
      catchEx(error);
    }
  },
  PrivacyPolicySet: async (data: any) => {
    try {
      return await Service.post(`${URL}/PrivacyPolicySet`, data);
    } catch (error: any) {
      catchEx(error);
    }
  }
};

export default GDPRService;