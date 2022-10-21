import Translate from "../../../shared/translate";
import FormManage from "../../../components/page-components/FormManage";
import SubmitButton from "../../../components/page-components/Button/Save";
import MenuForm from "../../../components/page-components/MenuForm";
import Select from "../../../components/page-components/Select";
import AlertSection from "../../../components/Notifications/AlertSection";
import Logic from "./logic"

const DataRetentionPolicy = () => {
  const { setValue, save, title, message, item } = Logic();

  return (
    <>
      <MenuForm title={title} />
      {item && <FormManage onSubmit={save}>
        <div className="ip">{message && <AlertSection variant="success" description={message} />}</div>
        <div>
          <div className="title"><Translate code={"CV_RETENTION_TIME"} /></div>
          <div className="control"><Select name="dataRetentionTime" options={item.options} defaultValue={item.dataRetentionTime} onChange={setValue} /></div>
          <div className="description"><Translate code={"CV_RETENTION_TIME_DESCRIPTION"} /></div>
        </div>
        <div>
          <div className="buttons"><SubmitButton /></div>
        </div>
      </FormManage>}
    </>
  );
};

export default DataRetentionPolicy;