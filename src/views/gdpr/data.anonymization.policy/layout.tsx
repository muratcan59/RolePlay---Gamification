import Translate from "../../../shared/translate";
import FormManage from "../../../components/page-components/FormManage";
import SubmitButton from "../../../components/page-components/Button/Save";
import MenuForm from "../../../components/page-components/MenuForm";
import Select from "../../../components/page-components/Select";
import Switches from "../../../components/page-components/Switches";
import AlertSection from "../../../components/Notifications/AlertSection";
import Logic from "./logic"

const DataAnonymizationPolicy = () => {
  const { setValue, save, title, message, item } = Logic();

  return (
    <>
      <MenuForm title={title} />
      {item && <FormManage onSubmit={save}>
        <div className="ip">{message && <AlertSection variant="success" description={message} />}</div>
        <div>
          <div className="title"><Translate code={"CV_ANONYMIZATION_TIME"} /></div>
          <div className="control"><Select name="cvAnonymizationTime" options={item.options} defaultValue={item.cvAnonymizationTime} onChange={setValue} /></div>
          <div className="description"><Translate code={"CV_ANONYMIZATION_TIME_DESCRIPTION"} /></div>
        </div>
        <div>
          <div className="title"><Translate code={"TEMPORARILY_STORE_DATA"} /></div>
          <div className="control"><Switches name="storeDataTemporarily" defaultChecked={item.storeDataTemporarily} /></div>
          <div className="description"><Translate code={"TEMPORARILY_STORE_DATA_DESCRIPTION"} /></div>
        </div>
        <div>
          <div className="buttons"><SubmitButton /></div>
        </div>
      </FormManage>}
    </>
  );
};

export default DataAnonymizationPolicy;