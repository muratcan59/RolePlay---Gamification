import { useState, useEffect } from "react";
import Service from "../service";
import M from "../../../helpers/translate";

const Logic = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState<string>();
    const [language, setLanguage] = useState(0);
    const [content, setContent] = useState<string>();

    const get = async () => {
        await Service.PrivacyPolicyGet(language).then((res: any) => setContent(res));
    };

    const save = async () => {
        await Service.PrivacyPolicySet({ language: language, content: content }).then(() => M.T("SAVE_OK").then(setMessage));
    };

    const changeLanguage = (language: number) => {
        setLanguage(language);
        setMessage(undefined);
    };

    useEffect(() => { M.T("TITLE").then(setTitle); }, []);
    useEffect(() => { document.title = title; }, [title]);
    useEffect(() => { get(); }, [language]);

    return { save, changeLanguage, setContent, title, message, item: content === undefined ? null : { language, content } };
};

export default Logic;