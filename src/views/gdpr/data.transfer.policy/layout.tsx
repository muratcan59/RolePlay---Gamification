import Translate from "../../../shared/translate";
import FormManage from "../../../components/page-components/FormManage";
import NumericInput from "../../../components/page-components/NumericInput";
import Switches from "../../../components/page-components/Switches";
import SubmitButton from "../../../components/page-components/Button/Save";
import MenuForm from "../../../components/page-components/MenuForm";
import AlertSection from "../../../components/Notifications/AlertSection";
import Logic from "./logic"

const DataTransferPolicy = () => {
  const { setValue, save, title, message, item } = Logic();

  return (
    <>
      <MenuForm title={title} />
      {item && <FormManage onSubmit={save}>
        <div className="ip">{message && <AlertSection variant="success" description={message} />}</div>
        <div>
          <div className="title"><Translate code={"TRANSACTION_NUMBER_LIMITATION"} /></div>
          <div className="control"><NumericInput defaultValue={item.transactionNumber} name="transactionNumber" min={10} max={1000} />&nbsp;<Translate code={"TRANSACTION_NUMBER_UNIT"} /></div>
          <div className="description"><Translate code={"TRANSACTION_NUMBER_LIMITATION_DESCRIPTION"} /></div>
        </div>
        <div>
          <div className="title"><Translate code={"TRANSACTION_NUMBER_FOR_NOTIFICATION"} /></div>
          <div className="control">
            <Switches name="isVisibleTransactionNumber" defaultChecked={item.isVisibleTransactionNumber} onChange={setValue} />
            {item.isVisibleTransactionNumber &&
              <>
                <NumericInput name="transactionNumberForNotification" min={0} max={100} defaultValue={item.transactionNumberForNotification ?? 10} />
                &nbsp;<Translate code={"TRANSACTION_NOTIFICATION_UNIT"} />
              </>
            }
          </div>
          <div className="description"><Translate code={"TRANSACTION_NUMBER_FOR_NOTIFICATION_DESCRIPTION"} /></div>
        </div>
        <div>
          <div className="title"><Translate code={"EXCEL_DATA_LIMITATION"} /></div>
          <div className="control"><NumericInput name="excelDataLimit" min={100} max={20000} defaultValue={item.excelDataLimit} />&nbsp;<Translate code={"EXCEL_DATA_SIZE_UNIT"} /></div>
          <div className="description"><Translate code={"EXCEL_DATA_LIMITATION_DESCRIPTION"} /></div>
        </div>
        <div>
          <div className="title"><Translate code={"EXCEL_DATA_SIZE_FOR_NOTIFICATION"} /></div>
          <div className="control">
            <Switches name="isVisibleExcel" defaultChecked={item.excelDataLimitForNotification > 0} onChange={setValue} />
            {item.isVisibleExcel &&
              <>
                <NumericInput name="excelDataLimitForNotification" min={100} max={10000} defaultValue={item.excelDataLimitForNotification ?? 1000} />
                &nbsp;<Translate code={"EXCEL_DATA_NOTIFICATION_UNIT"} />
              </>}
          </div>
          <div className="description"><Translate code={"EXCEL_DATA_SIZE_FOR_NOTIFICATION_DESCRIPTION"} /></div>
        </div>
        <div><div className="buttons"><SubmitButton /></div></div>
      </FormManage>}
    </>
  );
};

export default DataTransferPolicy;