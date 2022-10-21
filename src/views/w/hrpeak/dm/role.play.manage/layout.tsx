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
import "./style.css";
import FilePostType from "../FilePostType";

const Manage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('n');

    const { save, setEditorValue, setInputValue, onFileChange, changeLanguage, showFileUploadPanel, fileOnClick, deleteCriteria, deleteReaction,
        title,
        message,
        item,
        language,
        showFileUpload,
        showFileUploadGuide,
        fileKey,
        guideFileKey
    } = Logic(id);

    return (
        <>
            <MenuForm title={title} menus={[{ url: "role.play.list?l=" + language, title: "List", icon: "fa fa-arrow-left" }]} />
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
                        <div className="title"><Translate code={"ROLE_PLAY_NAME"} /><Required /></div>
                        <div className="control"><Input name="name" required={true} maxlength={100} className="full" defaultValue={item?.name} onChange={setInputValue} /></div>
                    </div>
                    <div>
                        <div className="title"><Translate code={"ROLE_PLAY_TITLE"} /></div>
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
                                            {showFileUpload ?
                                                <FileUploader
                                                    fileAccept={"image/*"}
                                                    fileOnChange={(e: any) => onFileChange(e, FilePostType.scenario)}
                                                />
                                                : null
                                            }
                                            {fileKey ?
                                                <>
                                                    <a target='_blank' href={process.env.REACT_APP_API_WEBFORM + "/" + fileKey + ".d?db=Global"}><span className="link"><i className="fa fa-file"></i><Translate code={"SHOW_FILE"} /></span></a>
                                                    <span onClick={(e: any) => showFileUploadPanel(FilePostType.scenario)} className={showFileUpload ? "hide link" : "link"}><i className="fa fa-plus"></i><Translate code={"ADD_FILE"} /></span>
                                                </>
                                                : null
                                            }
                                        </td>
                                        <td>{fileKey ?
                                            <>
                                                {"[IMG SRC=/" + fileKey + ".d?db=Global /]"}
                                                <span title="copy" className="copyLink" onClick={() => fileOnClick(fileKey)}><i className="fa fa-copy"></i></span>
                                            </> : null}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="title"><Translate code={"SCENARIO_QUESTION"} /><Required /></div>
                        <div className="control"><Textarea name="question" className="full" rows="12" defaultValue={item?.question} onChange={setInputValue} required={true} /></div>
                    </div>
                    {id ?
                        <>
                            {language == 0 ? <div><a className="editLink" href={"role.play.reaction.manage?r=" + id + "&l=" + language}><i className="fa fa-pencil-square-o"></i><Translate code={"ADD_REACTION"} /></a></div> : null}
                            {item?.reactionQuestionList ?
                                <table className="G" cellSpacing="0" cellPadding="6">
                                    <tbody>
                                        <tr className="GH">
                                            <th className="GHN"></th>
                                            <th><Translate code={"REACTION_QUESTION"} /></th>
                                            <th className="GHC">EN <Translate code={"EDIT"} /></th>
                                            <th className="GHC">TR <Translate code={"EDIT"} /></th>
                                            <th className="GHC"><Translate code={"DELETE"} /></th>
                                        </tr>
                                        {
                                            item?.reactionQuestionList.map((k, index) => {
                                                return (
                                                    <tr id={k.id} key={index} className={index % 2 === 0 ? "GR" : "GAR"}>
                                                        <td className="GN">{index + 1}.</td>
                                                        <td>{k.question}</td>
                                                        <td style={{ textAlign: "center", cursor: "pointer" }}><a className="GL" href={"role.play.reaction.manage?r=" + id + "&n=" + k.id + "&l=1"}><i className="fa fa-language"></i></a></td>
                                                        <td style={{ textAlign: "center", cursor: "pointer" }}><a className="GL" href={"role.play.reaction.manage?r=" + id + "&n=" + k.id + "&l=0"}><i className="fa fa-pencil-square-o"></i></a></td>
                                                        <td style={{ textAlign: "center", cursor: "pointer" }}><i className="fa fa-trash-o" onClick={() => deleteReaction(k.id)}></i></td>
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
                                    <td><Translate code={"REACTION"} /></td>
                                </tr>
                                <tr>
                                    <td><Textarea name="reactionQuestion1" rows="3" placeholder="#1" defaultValue={item?.reactionQuestion1} onChange={setInputValue} /></td>
                                </tr>
                                <tr>
                                    <td><Textarea name="reactionQuestion2" rows="3" placeholder="#2" defaultValue={item?.reactionQuestion2} onChange={setInputValue} /></td>
                                </tr>
                                <tr>
                                    <td><Textarea name="reactionQuestion3" rows="3" placeholder="#3" defaultValue={item?.reactionQuestion3} onChange={setInputValue} /></td>
                                </tr>
                                <tr>
                                    <td><Textarea name="reactionQuestion4" rows="3" placeholder="#4" defaultValue={item?.reactionQuestion4} onChange={setInputValue} /></td>
                                </tr>
                                <tr>
                                    <td><Textarea name="reactionQuestion5" rows="3" placeholder="#5" defaultValue={item?.reactionQuestion5} onChange={setInputValue} /></td>
                                </tr>
                            </tbody>
                        </table>
                    }
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
                                            {showFileUploadGuide ?
                                                <FileUploader
                                                    fileAccept={"image/*"}
                                                    fileOnChange={(e: any) => onFileChange(e, FilePostType.guide)}
                                                />
                                                : null
                                            }
                                            {guideFileKey ?
                                                <>
                                                    <a href={process.env.REACT_APP_API_WEBFORM + "/" + guideFileKey + ".d?db=Global"} target="_blank"><span className="link"><i className="fa fa-file"></i><Translate code={"SHOW_FILE"} /></span></a>
                                                    <span onClick={(e: any) => showFileUploadPanel(FilePostType.guide)} className={showFileUploadGuide ? "hide link" : "link"}><i className="fa fa-plus"></i><Translate code={"ADD_FILE"} /></span>
                                                </>
                                                : null
                                            }
                                        </td>
                                        <td>{guideFileKey ?
                                            <>
                                                {"[IMG SRC=/" + guideFileKey + ".d?db=Global /]"}
                                                <span title="copy" className="copyLink" onClick={() => fileOnClick(guideFileKey)}><i className="fa fa-copy"></i></span>
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
                        <div className="title"><Translate code={"READING_TIME"} /><Required /></div>
                        <div className="control"><NumericInput name="readingTime" defaultValue={item?.readingTime} min={30} max={180} onChange={setInputValue} required={true} />&nbsp;<Translate code={"MINUTE"} /></div>
                    </div>
                    <div>
                        <div className="title"><Translate code={"RECORD_TIME"} /></div>
                        <div className="control"><NumericInput name="recordTime" defaultValue={item?.recordTime} min={1} max={20} onChange={setInputValue} />&nbsp;<Translate code={"MINUTE"} /></div>
                    </div>
                    <div>
                        <div className="title"><Translate code={"EVALUATION_FORM"} /></div>
                    </div>
                    {id ?
                        <>
                            {language == 0 ? <div><a className="editLink" href={"role.play.criteria.manage?r=" + id + "&l=" + language}><i className="fa fa-pencil-square-o"></i><Translate code={"ADD"} /></a></div> : null}
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
                                                        <td style={{ textAlign: "center", cursor: "pointer" }}><a className="GL" href={"role.play.criteria.manage?r=" + id + "&n=" + k.id + "&l=1"}><i className="fa fa-language"></i></a></td>
                                                        <td style={{ textAlign: "center", cursor: "pointer" }}><a className="GL" href={"role.play.criteria.manage?r=" + id + "&n=" + k.id + "&l=0"}><i className="fa fa-pencil-square-o"></i></a></td>
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

export default Manage;