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
  explanationCandidate: string,
  preparationTime: number,
  presentationTime: number,
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
}

const Logic = (caseStudyId: any) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState<string>();
  const [language, setLanguage] = useState<any>();
  const [showFileUpload1, setVisibleFileUpload1] = useState(true);
  const [showFileUploadGuide1, setVisibleFileUploadGuide1] = useState(true);
  const [item, setItem] = useState<IItem>();
  const [fileKey, setFileKey] = useState<any>();
  const [guideFileKey, setGuideFileKey] = useState<any>();
  const urlParams = new URLSearchParams(window.location.search);
  const qLang = urlParams.get('l');

  const get = async () => {
    await Service.GetCaseStudy({ caseStudyId: caseStudyId, language: language }).then((res: any) => {
      // İngilizcesi yoksa alanlar boş gelsin
      if (res && res.name == null) {
        setItem((c: any) => ({
          ...c,
          name: '',
          title: '',
          scenario: '',
          summary: '',
          guide: '',
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
          criteriaList: res.criteriaList
        }))
      }
      else {
        res && setItem({ ...res });
      }
    });
  };

  const save = async () => {
    if (caseStudyId) {
      await Service.UpdateCaseStudy(caseStudyId, language, item).then(() => M.T("CASE_STUDY_UPDATED").then(setMessage));
    }
    else {
      await Service.CreateCaseStudy(item).then(() => M.T("CASE_STUDY_CREATED").then(setMessage));
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
      var key = await Service.UploadScenarioFile(formData);
      setFileKey(key);
      setVisibleFileUpload1(false);
    }
    else if (type == FilePostType.guide) {
      formData.append("file", file);
      var key = await Service.UploadGuideFile(formData);
      setGuideFileKey(key);
      setVisibleFileUploadGuide1(false);
    }
  }

  const changeLanguage = (language: number) => {
    setLanguage(language);
    setMessage(undefined);
  };

  const showFileUpload = (type: FilePostType) => {
    if (type == FilePostType.scenario) {
      setFileKey('');
      setVisibleFileUpload1(true);
    }
    else if (type == FilePostType.guide) {
      setGuideFileKey('');
      setVisibleFileUploadGuide1(true);
    }
  };

  const fileOnClick = () => {
    navigator.clipboard.writeText("[IMG SRC=/" + fileKey + ".d?db=Global /]")
  };

  const guideFileOnClick = () => {
    navigator.clipboard.writeText("[IMG SRC=/" + guideFileKey + ".d?db=Global /]")
  };

  const deleteCriteria = (id: any) => {
    M.T("CRITERIA_DELETE_WARNING").then(c => {
      if (window.confirm(c)) {
        Service.DeleteCriteria(id).then(() => {
          setItem((c: any) => ({ ...c, criteriaList: item?.criteriaList.filter(p => p.id !== id) }));
          M.T("ITEM_DELETED").then(setMessage);
        });
      }
    });
  };

  useEffect(() => { M.T("TITLE").then(setTitle); }, []);
  useEffect(() => { document.title = title; }, [title]);
  useEffect(() => {
    if (caseStudyId && language >= 0) {
      get();
    }
    else {
      setItem((c: any) => ({ ...c, preparationTime: 60, presentationTime: 3 }));
    }
  }, [language]);
  useEffect(() => { setLanguage(Number(qLang)); }, [qLang]);

  return {
    save, setEditorValue, setInputValue, onFileChange, changeLanguage, showFileUpload, fileOnClick, guideFileOnClick, deleteCriteria,
    title,
    message,
    item,
    language,
    showFileUpload1,
    showFileUploadGuide1,
    fileKey,
    guideFileKey
  }
};

export default Logic;