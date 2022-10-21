import { useState, useEffect } from "react";
import Service from "../service";
import M from "../../../../../helpers/translate";

interface IItem {
  id: string;
  name: string;
}

const Logic = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState<string>();
  const [items, setItems] = useState<IItem[]>([]);
  const [language, setLanguage] = useState(0);
  const urlParams = new URLSearchParams(window.location.search);
  const qLang = urlParams.get('l');

  const list = async () => {
    await Service.CaseStudyList({ language: language, startIndex: 0, dataCount: 1000 }).then((res: any) => setItems(res))
  };

  const deleteCaseStudy = (id: any) => {
    M.T("DELETE_WARNING").then(c => {
      if (window.confirm(c)) {
        Service.DeleteCaseStudy(id).then(() => {
          setItems(items.filter(p => p.id !== id));
          M.T("CASE_STUDY_DELETED").then(setMessage);
        });
      }
    });
  };

  const changeLanguage = (language: number) => {
    setLanguage(language);
    setMessage(undefined);
  };

  useEffect(() => { M.T("TITLE").then(setTitle); }, []);
  useEffect(() => { document.title = title; }, [title]);
  useEffect(() => { setLanguage(Number(qLang)); }, [qLang]);
  useEffect(() => { list(); }, [language]);

  return { deleteCaseStudy, changeLanguage, title, message, language, items };
};

export default Logic;