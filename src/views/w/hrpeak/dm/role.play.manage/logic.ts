import { useState, useEffect } from "react";
import Service from "../service";
import M from "../../../../../helpers/translate";
import FilePostType from "../FilePostType";

interface IItem {
    name: string,
    title: string,
    scenario: string,
    summary: string,
    guide: string,
    question: string,
    explanationCandidate: string,
    readingTime: number,
    recordTime: number,
    criteriaList: [{
        id: string;
        competency: string;
        behavioralIndicator: string;
    }]
    competency1: string;
    competency2: string;
    competency3: string;
    competency4: string;
    competency5: string;
    behavioralIndicator1: string;
    behavioralIndicator2: string;
    behavioralIndicator3: string;
    behavioralIndicator4: string;
    behavioralIndicator5: string;
    reactionQuestion1: string;
    reactionQuestion2: string;
    reactionQuestion3: string;
    reactionQuestion4: string;
    reactionQuestion5: string;
    reactionQuestionList: [{
        id: string;
        question: string;
    }]
}

const Logic = (rolePlayId: any) => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState<string>();
    const [language, setLanguage] = useState<any>();
    const [showFileUpload, setVisibleFileUpload] = useState(true);
    const [showFileUploadGuide, setVisibleFileUploadGuide] = useState(true);
    const [item, setItem] = useState<IItem>();
    const [fileKey, setFileKey] = useState<any>();
    const [guideFileKey, setGuideFileKey] = useState<any>();
    const urlParams = new URLSearchParams(window.location.search);
    const qLang = urlParams.get('l');

    const get = async () => {
        await Service.GetRolePlay({ rolePlayId: rolePlayId, language: language }).then((res: any) => {
            // İngilizcesi yoksa alanlar boş gelsin
            if (res && res.name == null) {
                setItem((c: any) => ({
                    ...c,
                    name: '',
                    title: '',
                    scenario: '',
                    summary: '',
                    guide: '',
                    question: '',
                    explanationCandidate: '',
                    competency1: '',
                    competency2: '',
                    competency3: '',
                    competency4: '',
                    competency5: '',
                    behavioralIndicator1: '',
                    behavioralIndicator2: '',
                    behavioralIndicator3: '',
                    behavioralIndicator4: '',
                    behavioralIndicator5: '',
                    criteriaList: res.criteriaList,
                    reactionQuestion1: '',
                    reactionQuestion2: '',
                    reactionQuestion3: '',
                    reactionQuestion4: '',
                    reactionQuestion5: '',
                    reactionQuestionList: res.reactionQuestionList
                }))
            }
            else {
                res && setItem({ ...res });
            }
        });
    };

    const save = async () => {
        if (rolePlayId) {
            await Service.UpdateRolePlay(rolePlayId, language, item).then(() => M.T("ROLE_PLAY_UPDATED").then(setMessage));
        }
        else {
            await Service.CreateRolePlay(item).then(() => M.T("ROLE_PLAY_CREATED").then(setMessage));
        }
    };

    const setEditorValue = (value: any, name: string) => {
        setItem((c: any) => ({ ...c, [name]: value }));
    };

    const setInputValue = (event: any) => {
        setItem((c: any) => ({ ...c, [event.target.name]: event.target.value }));
    };

    const onFileChange = async (e: any, type: FilePostType) => {
        const formData = new FormData();
        var file = e.target.files[0];

        if (type == FilePostType.scenario) {
            formData.append("file", file);
            var key = await Service.UploadRolePlayScenarioFile(formData);
            setFileKey(key);
            setVisibleFileUpload(false);
        }
        else if (type == FilePostType.guide) {
            formData.append("file", file);
            var key = await Service.UploadRolePlayGuideFile(formData);
            setGuideFileKey(key);
            setVisibleFileUploadGuide(false);
        }
    };

    const fileOnClick = (key: any) => {
        navigator.clipboard.writeText("[IMG SRC=/" + key + ".d?db=Global /]")
    };

    const showFileUploadPanel = (type: FilePostType) => {
        if (type == FilePostType.scenario) {
            setFileKey('');
            setVisibleFileUpload(true);
        }
        else if (type == FilePostType.guide) {
            setGuideFileKey('');
            setVisibleFileUploadGuide(true);
        }
    };

    const changeLanguage = (language: number) => {
        setLanguage(language);
        setMessage(undefined);
    };

    const deleteCriteria = (id: any) => {
        M.T("CRITERIA_DELETE_WARNING").then(c => {
            if (window.confirm(c)) {
                Service.DeleteRolePlayCriteria(id).then(() => {
                    setItem((c: any) => ({ ...c, criteriaList: item?.criteriaList.filter(p => p.id !== id) }));
                    M.T("ITEM_DELETED").then(setMessage);
                });
            }
        });
    };

    const deleteReaction = (id: any) => {
        M.T("REACTION_DELETE_WARNING").then(c => {
            if (window.confirm(c)) {
                Service.DeleteReaction(id).then(() => {
                    setItem((c: any) => ({ ...c, reactionQuestionList: item?.reactionQuestionList.filter(p => p.id !== id) }));
                    M.T("REACTION_DELETED").then(setMessage);
                });
            }
        });
    };

    useEffect(() => { M.T("TITLE").then(setTitle); }, []);
    useEffect(() => { document.title = title; }, [title]);
    useEffect(() => {
        if (rolePlayId && language >= 0) {
            get();
        }
        else {
            setItem((c: any) => ({ ...c, readingTime: 60, recordTime: 3 }));
        }
    }, [language]);
    useEffect(() => { setLanguage(Number(qLang)); }, [qLang]);

    return {
        save, setEditorValue, setInputValue, onFileChange, changeLanguage, showFileUploadPanel, fileOnClick, deleteCriteria, deleteReaction,
        title,
        message,
        item,
        language,
        showFileUpload,
        showFileUploadGuide,
        fileKey,
        guideFileKey
    }
}

export default Logic;