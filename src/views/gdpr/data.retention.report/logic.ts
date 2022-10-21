import { useState, useEffect } from "react";
import Service from "../service";
import M from "../../../helpers/translate";

const Logic = () => {
    const [title, setTitle] = useState("");
    const [items, setItems] = useState([]);

    const report = async () => {
        await Service.DataRetentionReport().then((res: any) => setItems(res));
    };

    useEffect(() => { M.T("TITLE").then(setTitle); report(); }, []);
    useEffect(() => { document.title = title; }, [title]);

    return { title, items };
};

export default Logic;