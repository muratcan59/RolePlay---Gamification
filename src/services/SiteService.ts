import Service from "../helpers/service";
const URL = "/api/Site";

const SiteService = {
  getSiteAsync: async () => {
    try {
      return await Service
        .get(`${URL}/GetSiteInfo`)
        .then((res: any) => {
          return res;
        }
        )
    } catch (error) {
      // alertService.error("Hata",{autoClose: false,keepAfterRouteChange: false})
    }
  }
};
export default SiteService;
