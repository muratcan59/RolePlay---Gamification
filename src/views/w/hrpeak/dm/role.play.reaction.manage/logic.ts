import { useState, useEffect } from "react";
import Service from "../service";
import M from "../../../../../helpers/translate";

interface IItem {
    question: string;
}

const Logic = (reactionId: any, rolePlayId: any) => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState<string>();
    const [language, setLanguage] = useState<any>();
    const [item, setItem] = useState<any>();
    const [redirect, setList] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const qLang = urlParams.get('l');

    const get = async () => {
        await Service.GetRolePlayReaction({ reactionId: reactionId, language: language }).then((res: any) => setItem(res));
    };

    const save = async () => {
        if (reactionId) {
            await Service.UpdateRolePlayReaction(reactionId, language, item).then(() => M.T("ITEM_UPDATED").then(setMessage));
            setList(true)
        }
        else {
            await Service.CreateRolePlayReaction(rolePlayId, item).then(() => M.T("ITEM_CREATED").then(setMessage));
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
        if (reactionId && language >= 0) {
            get();
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