import Language from "../utils/Language";

const M = {

  T: async (code: string, layout?: string): Promise<string> => {
    var lng = await Language.getLanguage();
    const arr: any[] = [];

    if (lng) {
      if (layout === "") {
        return Language.translate(await Language.getKeys("", lng), code, arr, lng)?.toString();
      }

      if (layout) {
        return Language.translate(await Language.getKeys(layout + "-layout", lng), code, arr, lng)?.toString();
      }

      return Language.translate(await Language.getKeys(null, lng), code, arr, lng)?.toString();

    }

    return code;
  }
}
export default M;