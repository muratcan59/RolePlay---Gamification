import { useState, useEffect } from "react";
import Service from "../service";
import M from "../../../helpers/translate";

interface IItem {
    transactionNumber: number,
    transactionNumberForNotification: number,
    excelDataLimit: number,
    excelDataLimitForNotification: number,
    isVisibleTransactionNumber: boolean
    isVisibleExcel: boolean
}

const Logic = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState<string>();
    const [item, setItem] = useState<IItem>();

    const get = async () => {
        await Service.DataTransferPolicyGet().then((res: any) => {
            res && setItem({
                ...res,
                isVisibleTransactionNumber: res.transactionNumberForNotification > 0,
                isVisibleExcel: res.excelDataLimitForNotification > 0
            });
        });
    };

    const setValue = (name: string, value: any) => {
        setItem((c: any) => ({ ...c, [name]: value }))
    };

    const save = async (data: any) => {
        if (data.isVisibleTransactionNumber !== true) data.TransactionNumberForNotification = null;
        if (data.isVisibleExcel !== true) data.ExcelDataLimitForNotification = null;

        await Service.DataTransferPolicySet(data).then(() => M.T("SAVE_OK").then(setMessage));
    };

    useEffect(() => { M.T("TITLE").then(setTitle); }, []);
    useEffect(() => { document.title = title; }, [title]);
    useEffect(() => { get(); }, []);

    return { setValue, save, title, message, item };
};

export default Logic;