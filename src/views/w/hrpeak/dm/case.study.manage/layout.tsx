import Logic from "./logic";
import MenuForm from "../../../../../components/page-components/MenuForm";
import FormManage from "../../../../../components/page-components/FormManage";
import AlertSection from "../../../../../components/Notifications/AlertSection";
import Translate from "../../../../../shared/translate";
import Input from "../../../../../components/page-components/Input";
import Required from "../../../../../components/page-components/Required";
import Editor from "../../../../../components/page-components/Editor";
import Textarea from "../../../../../components/page-components/Textarea";
import NumericInput from "../../../../../components/page-components/NumericInput";
import SubmitButton from "../../../../../components/page-components/Button/Save";
import FileUploader from "../../../../../components/page-components/FileUploader";
import "./style.css"
import FilePostType from "../FilePostType";

const CaseStudyManage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('n');

    const { save, setEditorValue, setInputValue, onFileChange, changeLanguage, showFileUpload, fileOnClick, guideFileOnClick, deleteCriteria,
        title,
        message,
        item,
        language,
        showFileUpload1,
        showFileUploadGuide1,
        fileKey,
        guideFileKey
    } = Logic(id);

    return (
        <>
            <MenuForm title={title} menus={[{ url: "case.study.list?l=" + language, title: "List", icon: "fa fa-arrow-left" }]} />
            {
                <FormManage onSubmit={save}>
                    <div className="ip">{message && <AlertSection variant="success" description={message} />}</div>
                    {id ?
                        <div style={{ textAlign: "right", paddingBottom: "0" }}>
                            <div className="control tab">
                                <span onClick={() => changeLanguage(0)} className={language === 0 ? "active" : undefined}>TR</span>
                                <span onClick={() => changeLanguage(1)} className={language === 1 ? "active" : undefined}>EN</span>
                            </div>
                        </div>
                        : null}
                    <div>
                        <div className="title"><Translate code={"CASE_STUDY_NAME"} /><Required /></div>
                        <div className="control"><Input name="name" required={true} maxlength={100} className="full" defaultValue={item?.name} onChange={setInputValue} /></div>
                    </div>
                    <div>
                        <div className="title"><Translate code={"CASE_STUDY_TITLE"} /></div>
                        <div className="control"><Input name="title" maxlength={100} className="full" defaultValue={item?.title} onChange={setInputValue} /></div>
                    </div>
                    <div>
                        <div className="title"><Translate code={"SCENARIO"} /><Required /></div>
                        <div className="control"><Editor name="scenario" value={item?.scenario} onChange={setEditorValue} required={false}></Editor></div>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            {showFileUpload1 ?
                                                <FileUploader
                                                    fileAccept={"image/*"}
                                                    fileOnChange={(e: any) => onFileChange(e, FilePostType.scenario)}
                                                />
                                                : null
                                            }
                                            {fileKey ?
                                                <>
                                                    <a target='_blank' href={process.env.REACT_APP_API_WEBFORM + "/" + fileKey + ".d?db=Global"}><span className="link"><i className="fa fa-file"></i><Translate code={"SHOW_FILE"} /></span></a>
                                                    <span onClick={(e: any) => showFileUpload(FilePostType.scenario)} className={showFileUpload1 ? "hide link" : "link"}><i className="fa fa-plus"></i><Translate code={"ADD_FILE"} /></span>
                                                </>
                                                : null
                                            }
                                        </td>
                                        <td>{fileKey ?
                                            <>
                                                {"[IMG SRC=/" + fileKey + ".d?db=Global /]"}
                                                <span title="copy" className="copyLink" onClick={fileOnClick}><i className="fa fa-copy"></i></span>
                                            </> : null}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="title"><Translate code={"SCENARIO_SUMMARY"} /></div>
                        <div className="control"><Textarea name="summary" className="full" rows="12" defaultValue={item?.summary} onChange={setInputValue} /></div>
                    </div>
                    <div>
                        <div className="title"><Translate code={"SCENARIO_GUIDE"} /></div>
                        <div className="control"><Editor name="guide" value={item?.guide} onChange={setEditorValue}></Editor></div>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            {showFileUploadGuide1 ?
                                                <FileUploader
                                                    fileAccept={"image/*"}
                                                    fileOnChange={(e: any) => onFileChange(e, FilePostType.guide)}
                                                />
                                                : null
                                            }
                                            {guideFileKey ?
                                                <>
                                                    <a href={process.env.REACT_APP_API_WEBFORM + "/" + guideFileKey + ".d?db=Global"} target="_blank"><span className="link"><i className="fa fa-file"></i><Translate code={"SHOW_FILE"} /></span></a>
                                                    <span onClick={(e: any) => showFileUpload(FilePostType.guide)} className={showFileUploadGuide1 ? "hide link" : "link"}><i className="fa fa-plus"></i><Translate code={"ADD_FILE"} /></span>
                                                </>
                                                : null
                                            }
                                        </td>
                                        <td>{guideFileKey ?
                                            <>
                                                {"[IMG SRC=/" + guideFileKey + ".d?db=Global /]"}
                                                <span title="copy" className="copyLink" onClick={guideFileOnClick}><i className="fa fa-copy"></i></span>
                                            </> : null}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="title"><Translate code={"CANDIDATE_INFO"} /></div>
                        <div className="control"><Textarea name="explanationCandidate" className="full" rows="12" defaultValue={item?.explanationCandidate} onChange={setInputValue} /></div>
                    </div>
                    <div>
                        <div className="title"><Translate code={"PREPARATION_TIME"} /><Required /></div>
                        <div className="control"><NumericInput name="preparationTime" defaultValue={item?.preparationTime} min={30} max={180} onChange={setInputValue} required={true} />&nbsp;<Translate code={"MINUTE"} /></div>
                    </div>
                    <div>
                        <div className="title"><Translate code={"PRESENTATION_TIME"} /></div>
                        <div className="control"><NumericInput name="presentationTime" defaultValue={item?.presentationTime} min={1} max={20} onChange={setInputValue} />&nbsp;<Translate code={"MINUTE"} /></div>
                    </div>
                    <div>
                        <div className="title"><Translate code={"EVALUATION_FORM"} /></div>
                    </div>
                    {id ?
                        <>
                            {language == 0 ? <div><a className="editLink" href={"case.study.criteria.manage?c=" + id + "&l=" + language}><i className="fa fa-pencil-square-o"></i><Translate code={"ADD"} /></a></div> : null}
                            {item?.criteriaList ?
                                <table className="G" cellSpacing="0" cellPadding="6">
                                    <tbody>
                                        <tr className="GH">
                                            <th className="GHN"></th>
                                            <th><Translate code={"COMPETENCY"} /></th>
                                            <th><Translate code={"BEHAVIORAL_INDICATOR"} /></th>
                                            <th className="GHC">EN <Translate code={"EDIT"} /></th>
                                            <th className="GHC">TR <Translate code={"EDIT"} /></th>
                                            <th className="GHC"><Translate code={"DELETE"} /></th>
                                        </tr>
                                        {
                                            item?.criteriaList.map((k, index) => {
                                                return (
                                                    <tr id={k.id} key={index} className={index % 2 === 0 ? "GR" : "GAR"}>
                                                        <td className="GN">{index + 1}.</td>
                                                        <td>{k.competency}</td>
                                                        <td>{k.behavioralIndicator}</td>
                                                        <td style={{ textAlign: "center", cursor: "pointer" }}><a className="GL" href={"case.study.criteria.manage?c=" + id + "&n=" + k.id + "&l=1"}><i className="fa fa-language"></i></a></td>
                                                        <td style={{ textAlign: "center", cursor: "pointer" }}><a className="GL" href={"case.study.criteria.manage?c=" + id + "&n=" + k.id + "&l=0"}><i className="fa fa-pencil-square-o"></i></a></td>
                                                        <td style={{ textAlign: "center", cursor: "pointer" }}><i className="fa fa-trash-o" onClick={() => deleteCriteria(k.id)}></i></td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                                : null
                            }
                        </>
                        :
                        <table className="criteria">
                            <tbody>
                                <tr className="subTitle">
                                    <td><Translate code={"COMPETENCY"} /></td>
                                    <td><Translate code={"BEHAVIORAL_INDICATOR"} /></td>
                                </tr>
                                <tr>
                                    <td><Input name="competency1" placeholder="#1" defaultValue={item?.competency1} onChange={setInputValue} /></td>
                                    <td><Textarea name="behavioralIndicator1" rows="3" placeholder="#1" defaultValue={item?.behavioralIndicator1} onChange={setInputValue} /></td>
                                </tr>
                                <tr>
                                    <td><Input name="competency2" placeholder="#2" defaultValue={item?.competency2} onChange={setInputValue} /></td>
                                    <td><Textarea name="behavioralIndicator2" rows="3" placeholder="#2" defaultValue={item?.behavioralIndicator2} onChange={setInputValue} /></td>
                                </tr>
                                <tr>
                                    <td><Input name="competency3" placeholder="#3" defaultValue={item?.competency3} onChange={setInputValue} /></td>
                                    <td><Textarea name="behavioralIndicator3" rows="3" placeholder="#3" defaultValue={item?.behavioralIndicator3} onChange={setInputValue} /></td>
                                </tr>
                                <tr>
                                    <td><Input name="competency4" placeholder="#4" defaultValue={item?.competency4} onChange={setInputValue} /></td>
                                    <td><Textarea name="behavioralIndicator4" rows="3" placeholder="#4" defaultValue={item?.behavioralIndicator4} onChange={setInputValue} /></td>
                                </tr>
                                <tr>
                                    <td><Input name="competency5" placeholder="#5" defaultValue={item?.competency5} onChange={setInputValue} /></td>
                                    <td><Textarea name="behavioralIndicator5" rows="3" placeholder="#5" defaultValue={item?.behavioralIndicator5} onChange={setInputValue} /></td>
                                </tr>
                            </tbody>
                        </table>
                    }
                    <div><div className="buttons"><SubmitButton /></div></div>
                </FormManage>
            }
        </>
    );
};

export default CaseStudyManage;