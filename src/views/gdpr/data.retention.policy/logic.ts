import { useState, useEffect } from "react";
import Service from "../service";
import M from "../../../helpers/translate";

interface IItem {
    dataRetentionTime: number;
    options: Array<any>
}

const Logic = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState<string>();
    const [item, setItem] = useState<IItem>();

    const get = async () => {
        var options = new Array<any>();

        M.T("OPTION_6_MONTHS").then(value => options.push({ key: 0, value: value }));
        M.T("OPTION_1_YEAR").then(value => options.push({ key: 1, value: value }));
        M.T("OPTION_2_YEAR").then(value => options.push({ key: 2, value: value }));
        M.T("OPTION_3_YEAR").then(value => options.push({ key: 3, value: value }));
        M.T("OPTION_4_YEAR").then(value => options.push({ key: 4, value: value }));
        M.T("OPTION_5_YEAR").then(value => options.push({ key: 5, value: value }));

        await Service.DataRetentionPolicyGet().then((res: any) => res !== undefined && setItem({ dataRetentionTime: res, options: options }));
    };

    const setValue = (name: string, value: any) => {
        setItem((c: any) => ({ ...c, [name]: value }))
    };

    const save = async (data: IItem) => {
        await Service.DataRetentionPolicySet(data.dataRetentionTime).then(res => {
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