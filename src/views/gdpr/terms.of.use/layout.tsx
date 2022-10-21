import M from "../../../helpers/translate";
import MenuForm from "../../../components/page-components/MenuForm";
import FormManage from "../../../components/page-components/FormManage";
import SubmitButton from "../../../components/page-components/Button/Save";
import DeleteButton from "../../../components/page-components/Button/Delete";
import Editor from "../../../components/page-components/Editor";
import AlertSection from "../../../components/Notifications/AlertSection";
import Logic from "./logic"
import "./style.css"

const TermsOfUse = () => {
    const { save, reset, changeLanguage, setContent, title, message, item } = Logic();
    
    return (
        <>
            <MenuForm title={title} />
            {item && <FormManage>
                <div className="ip">{message && <AlertSection variant="success" description={message} />}</div>
                <div>
                    <div className="control tab">
                        <span onClick={() => changeLanguage(0)} className={item.language === 0 ? "active" : undefined}>TR</span>
                        <span onClick={() => changeLanguage(1)} className={item.language === 1 ? "active" : undefined}>EN</span>
                    </div>
                </div>
                <Editor name="content" value={item.content} onChange={setContent}></Editor>
                <SubmitButton onClick={save} /><DeleteButton setText={M.T("RESET")} onClick={reset} />
            </FormManage>}
        </>
    );
};

export default TermsOfUse;