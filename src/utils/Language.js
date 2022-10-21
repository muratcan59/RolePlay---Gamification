import userService from "../services/UserService";
import axios from "axios";

const Language = {
  getLanguage: async () => {
    var res = await userService.getUser();
    if (res?.Language === 1) {
      return "EN";
    }
    if (res?.Language === 0) {
      return "TR";
    }
    const navLang = navigator.language || navigator.userLanguage;
    if (navLang && navLang.toLowerCase().startsWith("tr")) {
      return "TR";
    }
    return "EN";
  },

  dynamicStringHelpers: (array, vocable) => {
    var newStr;
    var strLength;

    for (let number = 0; number < array.length; number++) {
      var index;
      if (newStr !== undefined) {
        strLength = newStr.length;
        index = newStr.indexOf("{" + number + "}");
        if (index !== -1) {
          newStr =
            newStr.substring(0, index) +
            array[number] +
            newStr.substring(index + 3, strLength);
        }
      } else {
        index = vocable.indexOf("{" + number + "}");
        if (index !== -1) {
          newStr =
            vocable.substring(0, index) +
            array[number] +
            vocable.substring(index + 3, vocable.length);
        } else newStr = vocable;
      }
    }
    return newStr;
  },

  translate: (list, key, array, lang) => {
    if (lang !== undefined) {
      var vocable = list.find((p) => p.KEY_CODE === key);

      if (vocable === undefined) return key;
      if (lang === "TR" && (array == null || array.length === 0)) return vocable.TR;
      if (lang === "TR") return Language.dynamicStringHelpers(array, vocable.TR);
      if (lang === "EN" && (array == null || array.length === 0)) return vocable.EN;
      if (lang === "EN") return Language.dynamicStringHelpers(array, vocable.EN);
    }

    return key;
  },

  getKeys: async (layout, lang) => {
    // if (process.env.NODE_ENV !== "development") {
    //   // fetch('https://cdn.cvmer.com/r/gdpr.candidate.list.a-en.json',{  credentials: 'include'}).then((res)=>{
    //   // })
    //   var cdn = "https://cdn.cvmer.com/r/basvuru.aspx-tr.json";
    //   return axios.get(cdn)
    //     .then(function (response) {

    //       const arr = Object.keys(response.data).map((item) => {

    //         return {
    //           KEY_CODE: item,
    //           [lang]: response.data[item]
    //         }

    //       })

    //       return arr;
    //     })
    //     .catch(function (error) {
    //     })
    // }

    if (layout === "") {
      return require("../shared/language.json");
    }

    if (layout === null) {
      var url = window.location.pathname.split('/').slice(2).join().replaceAll(",", "/");

      try {
        return require("../views/" + url + "/language.json");
      }
      catch
      {
        return [];
      }
    }

    return require("../layouts/" + layout + "/language.json");
  },
};
export default Language;

