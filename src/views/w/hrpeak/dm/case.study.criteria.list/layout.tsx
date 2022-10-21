import Logic from "./logic";
import MenuPage from "../../../../../components/page-components/MenuPage";
import Form from "../../../../../components/page-components/Form";
import CDN from "../../../../../helpers/cdn";
import AlertSection from "../../../../../components/Notifications/AlertSection";
import Translate from "../../../../../shared/translate";

const CaseStudyCriteria = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const caseStudyId = urlParams.get('n');

    const { deleteCriteria, changeLanguage, title, message, language, items } = Logic(caseStudyId);

    return (
        <>
            <MenuPage title={title} addLink={"case.study.criteria.manage?c=" + caseStudyId + "&l=" + language} listLink={"case.study.manage?n=" + caseStudyId + "&l=" + language} />
            {items ? <Form>
                {message && <AlertSection variant="success" description={message} />}
                <div style={{ textAlign: "right", marginBottom: "20px" }}>
                    <div className="control tab">
                        <span onClick={() => changeLanguage(0)} className={language === 0 ? "active" : undefined}>TR</span>
                        <span onClick={() => changeLanguage(1)} className={language === 1 ? "active" : undefined}>EN</span>
                    </div>
                </div>
                <table className="G" cellSpacing="0" cellPadding="6">
                    <tbody>
                        <tr className="GH">
                            <th className="GHN"></th>
                            <th><Translate code={"COMPETENCY"} /></th>
                            <th><Translate code={"BEHAVIORAL_INDICATOR"} /></th>
                            <th className="GHC"><Translate code={"DUZENLE"} /></th>
                            <th className="GHC"><Translate code={"SIL"} /></th>
                        </tr>
                        {
                            items.map((item, index) => {
                                return (
                                    <tr id={item.id} key={index} className={index % 2 === 0 ? "GR" : "GAR"}>
                                        <td className="GN">{index + 1}.</td>
                                        <td>{item.competency}</td>
                                        <td>{item.behavioralIndicator}</td>
                                        <td style={{ textAlign: "center", cursor: "pointer" }}><a className="GL" href={"case.study.criteria.manage?c=" + caseStudyId + "&n=" + item.id}><i className="fa fa-pencil-square-o"></i></a></td>
                                        <td style={{ textAlign: "center", cursor: "pointer" }}><i className="fa fa-trash-o" onClick={() => deleteCriteria(item.id)}></i></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </Form>
                : <img src={CDN("/images/l.gif")} />
            }
        </>
    );
};

export default CaseStudyCriteria;