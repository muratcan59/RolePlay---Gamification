import { useState, useEffect } from "react";
import UtilsLanguage from "../utils/Language";
import { useRecoilState } from "recoil";
import keyState from "../store/language-atoms";

const Translate = ({ code, arr = [], type }: any) => {
  const [lang, setLang] = useState("");
  const [translateKey, setTranslateKey] = useState("");
  const [keys, setKeys] = useRecoilState<any>(keyState);

  useEffect(() => {
    UtilsLanguage.getLanguage().then((res: any) => { setLang(res); });
  }, [lang]);

  useEffect(() => {
    if (lang && type === undefined) {
      if (!keys.length) {
        UtilsLanguage.getKeys(null, lang).then(setKeys);
      }
    }
  }, [lang]);

  useEffect(() => {
    UtilsLanguage.getLanguage().then((res: any) => { setTranslateKey(UtilsLanguage.translate(keys, code, arr, res)); });
  }, [keys])

  return <>{translateKey}</>;
};

export default Translate;