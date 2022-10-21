import Logic from "./logic";
import MenuForm from "../../../../../components/page-components/MenuForm";
import FormManage from "../../../../../components/page-components/FormManage";
import AlertSection from "../../../../../components/Notifications/AlertSection";
import Translate from "../../../../../shared/translate";
import Input from "../../../../../components/page-components/Input";
import Required from "../../../../../components/page-components/Required";
import Textarea from "../../../../../components/page-components/Textarea";
import SubmitButton from "../../../../../components/page-components/Button/Save";

const CriteriaManage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const criteriaId = urlParams.get('n');
    const rolePlayId = urlParams.get('r');
    const { save, setInputValue, changeLanguage,
        title,
        message,
        item,
        language,
        redirect
    } = Logic(criteriaId, rolePlayId);

    if (redirect) {
        window.location.replace("role.play.manage?n=" + rolePlayId + "&l=" + language);

        return;
    }
    return (
        <>       
            <MenuForm title={title} menus={[{ url: "role.play.manage?n=" + rolePlayId + "&l=" + language, title: "List", icon: "fa fa-arrow-left" }]} />
            {
                <FormManage onSubmit={save}>
                    <div className="ip">{message && <AlertSection variant="success" description={message} />}</div>
                    {/* {criteriaId ?
                        <div style={{ textAlign: "right", paddingBottom: "0" }}>
                            <div className="control tab">
                                <span onClick={() => changeLanguage(0)} className={language === 0 ? "active" : undefined}>TR</span>
                                <span onClick={() => changeLanguage(1)} className={language === 1 ? "active" : undefined}>EN</span>
                            </div>
                        </div>
                        : null} */}
                    <table className="criteria">
                        <tbody>
                            <tr className="subTitle">
                                <td style={{ width: "30%" }}><Translate code={"COMPETENCY"} /><Required /></td>
                                <td><Translate code={"BEHAVIORAL_INDICATOR"} /><Required /></td>
                            </tr>
                            <tr>
                                <td><Input name="competency" defaultValue={item?.competency} onChange={setInputValue} required={true} className="LONG" /></td>
                                <td><Textarea name="behavioralIndicator" rows="3" defaultValue={item?.behavioralIndicator} className="LONG" onChange={setInputValue} required={true} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div><div className="buttons"><SubmitButton /></div></div>
                </FormManage>
            }
        </>
    );
};

export default CriteriaManage;