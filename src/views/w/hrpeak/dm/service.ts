import { alertService } from "../../../../services/AlertService";
import Service from "../../../../helpers/service";
const URL = "/api/HRPEAK";

function catchEx(error: any) {
    if (error?.response?.status === 401) {
        window.location.href = process.env.REACT_APP_API_WEBFORM + "/uyelik/react.user.aspx?source=" + window.location.href;
        return;
    }

    alertService.error(error?.response?.data?.title ?? error?.response?.data?.split('\n').slice(0, 1), {
        autoClose: false, keepAfterRouteChange: false,
    });
}

const HRPEAKService = {
    CaseStudyList: async (data: any) => {
        try {
            return await Service.get(`${URL}/CaseStudyList?language=${data.language}&startIndex=${data.startIndex}&dataCount=${data.dataCount}`);
        } catch (error: any) {
            catchEx(error);
        }
    },
    CreateCaseStudy: async (data: any) => {
        try {
            return await Service.post(`${URL}/CreateCaseStudy`, data).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    UpdateCaseStudy: async (id: string, language: number, data: any) => {
        try {
            return await Service.post(`${URL}/UpdateCaseStudy?caseStudyId=${id}&language=${language}`, data).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    DeleteCaseStudy: async (id: string) => {
        try {
            return await Service.post(`${URL}/DeleteCaseStudy?caseStudyId=${id}`).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    GetCaseStudy: async (data: any) => {
        try {
            return await Service.get(`${URL}/GetCaseStudy?caseStudyId=${data.caseStudyId}&language=${data.language}`);
        } catch (error: any) {
            catchEx(error);
        }
    },
    UploadScenarioFile: async (data: any) => {
        try {
            return await Service.post(`${URL}/UploadScenarioFile`, data);
        } catch (error: any) {
            catchEx(error);
        }
    },
    UploadGuideFile: async (data: any) => {
        try {
            return await Service.post(`${URL}/UploadGuideFile`, data);
        } catch (error: any) {
            catchEx(error);
        }
    },
    GetCriteriaList: async (data: any) => {
        try {
            return await Service.get(`${URL}/GetCriteriaList?caseStudyId=${data.caseStudyId}&language=${data.language}&startIndex=${data.startIndex}&dataCount=${data.dataCount}`);
        } catch (error: any) {
            catchEx(error);
        }
    },
    CreateCriteria: async (caseStudyId: string, language: any, data: any) => {
        try {
            return await Service.post(`${URL}/CreateCriteria?caseStudyId=${caseStudyId}&language=${language}`, data).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    UpdateCriteria: async (id: string, language: number, data: any) => {
        try {
            return await Service.post(`${URL}/UpdateCriteria?criteriaId=${id}&language=${language}`, data).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    DeleteCriteria: async (id: string) => {
        try {
            return await Service.post(`${URL}/DeleteEvaluationCriteria?criteriaId=${id}`).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    GetCriteria: async (data: any) => {
        try {
            return await Service.get(`${URL}/GetCriteria?criteriaId=${data.criteriaId}&language=${data.language}`);
        } catch (error: any) {
            catchEx(error);
        }
    },
    CreateRolePlay: async (data: any) => {
        try {
            return await Service.post(`${URL}/CreateRolePlay`, data).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    UpdateRolePlay: async (id: string, language: number, data: any) => {
        try {
            return await Service.post(`${URL}/UpdateRolePlay?rolePlayId=${id}&language=${language}`, data).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    RolePlayList: async (data: any) => {
        try {
            return await Service.get(`${URL}/RolePlayList?language=${data.language}&startIndex=${data.startIndex}&dataCount=${data.dataCount}`);
        } catch (error: any) {
            catchEx(error);
        }
    },
    DeleteRolePlay: async (id: string) => {
        try {
            return await Service.post(`${URL}/DeleteRolePlay?rolePlayId=${id}`).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    GetRolePlay: async (data: any) => {
        try {
            return await Service.get(`${URL}/GetRolePlay?rolePlayId=${data.rolePlayId}&language=${data.language}`);
        } catch (error: any) {
            catchEx(error);
        }
    },
    UploadRolePlayScenarioFile: async (data: any) => {
        try {
            return await Service.post(`${URL}/UploadRolePlayScenarioFile`, data);
        } catch (error: any) {
            catchEx(error);
        }
    },
    UploadRolePlayGuideFile: async (data: any) => {
        try {
            return await Service.post(`${URL}/UploadRolePlayGuideFile`, data);
        } catch (error: any) {
            catchEx(error);
        }
    },
    GetRolePlayCriteriaList: async (data: any) => {
        try {
            return await Service.get(`${URL}/GetRolePlayCriteriaList?rolePlayId=${data.rolePlayId}&language=${data.language}&startIndex=${data.startIndex}&dataCount=${data.dataCount}`);
        } catch (error: any) {
            catchEx(error);
        }
    },
    CreateRolePlayCriteria: async (rolePlayId: string, language: any, data: any) => {
        try {
            return await Service.post(`${URL}/CreateRolePlayCriteria?rolePlayId=${rolePlayId}&language=${language}`, data).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    UpdateRolePlayCriteria: async (id: string, language: number, data: any) => {
        try {
            return await Service.post(`${URL}/UpdateRolePlayCriteria?criteriaId=${id}&language=${language}`, data).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    DeleteRolePlayCriteria: async (id: string) => {
        try {
            return await Service.post(`${URL}/DeleteRolePlayEvaluationCriteria?criteriaId=${id}`).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    GetRolePlayCriteria: async (data: any) => {
        try {
            return await Service.get(`${URL}/GetRolePlayCriteria?criteriaId=${data.criteriaId}&language=${data.language}`);
        } catch (error: any) {
            catchEx(error);
        }
    },
    GetRolePlayReaction: async (data: any) => {
        try {
            return await Service.get(`${URL}/GetReaction?reactionId=${data.reactionId}&language=${data.language}`);
        } catch (error: any) {
            catchEx(error);
        }
    },
    DeleteReaction: async (id: string) => {
        try {
            return await Service.post(`${URL}/DeleteReaction?reactionId=${id}`).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    CreateRolePlayReaction: async (rolePlayId: string, data: any) => {
        try {
            return await Service.post(`${URL}/CreateRolePlayReaction?rolePlayId=${rolePlayId}`, data).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    },
    UpdateRolePlayReaction: async (id: string, language: number, data: any) => {
        try {
            return await Service.post(`${URL}/UpdateRolePlayReaction?reactionId=${id}&language=${language}`, data).then(() => { (window as any).scrollTo(0, 0); });
        } catch (error: any) {
            catchEx(error);
        }
    }
};

export default HRPEAKService;