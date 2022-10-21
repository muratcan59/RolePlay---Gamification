import { useState, useEffect } from "react";
import Service from "../service";
import M from "../../../../../helpers/translate";

interface IItem {
    competency: string,
    behavioralIndicator: string
}

const Logic = (criteriaId: any, caseStudyId: any) => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState<string>();
    const [language, setLanguage] = useState<any>();
    const [item, setItem] = useState<IItem>();
    const [redirect, setList] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const qLang = urlParams.get('l');

    const get = async () => {
        await Service.GetCriteria({ criteriaId: criteriaId, language: language }).then((res: any) => {
            // İngilizcesi yoksa alanlar boş gelsin
            if (res && res.competency == null) {
                setItem((c: any) => ({
                    ...c,
                    competency: '',
                    behavioralIndicator: '',
                }))
            }
            else {
                res && setItem({ ...res });
            }
        });
    };

    const save = async () => {
        if (criteriaId) {
            await Service.UpdateCriteria(criteriaId, language, item).then(() => M.T("ITEM_UPDATED").then(setMessage));
            setList(true)
        }
        else {
            await Service.CreateCriteria(caseStudyId, language, item).then(() => M.T("ITEM_CREATED").then(setMessage));
            setList(true)
        }
    };

    const setInputValue = (event: any) => {
        setItem((c: any) => ({ ...c, [event.target.name]: event.target.value }));
    };

    const changeLanguage = (language: number) => {
        setLanguage(language);
        setMessage(undefined);
    };

    useEffect(() => { M.T("TITLE").then(setTitle); }, []);
    useEffect(() => { document.title = title; }, [title]);
    useEffect(() => { setLanguage(Number(qLang)); }, [qLang]);
    useEffect(() => {
        if (criteriaId && language >= 0) {
            get();
        }
        else {
            setItem((c: any) => ({ ...c, preparationTime: 60, presentationTime: 3 }));
        }
    }, [language]);

    return {
        save, setInputValue, changeLanguage,
        title,
        message,
        item,
        language,
        redirect
    }
};

export default Logic;