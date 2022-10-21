import { useState, useEffect } from "react";
import Service from "../service";
import M from "../../../helpers/translate";

interface IItem {
    cvAnonymizationTime: number;
    storeDataTemporarily: boolean;
    options: Array<any>
}

const Logic = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState<string>();
    const [item, setItem] = useState<IItem>();

    const get = async () => {
        var options = new Array<any>();

        M.T("OPTION_1_HOUR").then(value => options.push({ key: 0, value: value }));
        M.T("OPTION_1_DAY").then(value => options.push({ key: 1, value: value }));
        M.T("OPTION_1_WEEK").then(value => options.push({ key: 2, value: value }));
        M.T("OPTION_1_MONTH").then(value => options.push({ key: 3, value: value }));

        await Service.DataAnonymizationPolicyGet().then((res: any) => res && setItem({ ...res, options: options }));
    };

    const setValue = (name: string, value: any) => {
        setItem((c: any) => ({ ...c, [name]: value }))
    };

    const save = async (data: any) => {
        await Service.DataAnonymizationPolicySet(data).then(res => {
            if (res) {
                M.T("SAVE_OK").then(setMessage);
            } else {
                setMessage(undefined);
            }
        });
    };

    useEffect(() => { M.T("TITLE").then(setTitle); }, []);
    useEffect(() => { document.title = title; }, [title]);
    useEffect(() => { get();}, []);

    return { setValue, save, title, message, item };
};

export default Logic;