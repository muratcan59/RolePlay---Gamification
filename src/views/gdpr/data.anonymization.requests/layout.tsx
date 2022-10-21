import MenuPage from "../../../components/page-components/MenuPage";
import Translate from "../../../shared/translate";
import Form from "../../../components/page-components/Form";
import CDN from "../../../helpers/cdn";
import AlertSection from "../../../components/Notifications/AlertSection";
import Logic from "./logic"

const DataAnonymizationRequests = () => {
  const { cancel, remove, title, message, items } = Logic();
  return (
    <>
      <MenuPage title={title} />
      {items ? <Form>
        {message && <AlertSection variant="success" description={message} />}
        <table className="G" cellSpacing="0" cellPadding="6">
          <tbody>
            <tr className="GH">
              <th className="GHN"></th>
              <th><Translate code={"CANDIDATE"} /></th>
              <th><Translate code={"REQUESTOR"} /></th>
              <th><Translate code={"REQUEST_DATE"} /></th>
              <th className="GHC"><Translate code={"REQUEST_CANCEL"} /></th>
              <th className="GHC"><Translate code={"CANDIDATE_DATA_DELETE"} /></th>
            </tr>
            {items.map((item, index) => {
              return (
                <tr key={index} className={index % 2 === 0 ? "GR" : "GAR"}>
                  <td className="GN">{index + 1}.</td>
                  <td><a className="GL" href={process.env.REACT_APP_API_WEBFORM + "/cv/kart.aspx?c=" + item.cvId} target="_blank">{item.cvNameSurname}</a></td>
                  <td>{item.employerNameSurname}</td>
                  <td dangerouslySetInnerHTML={{ __html: item.requestDate }}></td>
                  <td style={{ textAlign: "center", cursor: "pointer" }}>{item.canCanceled && <i className="fa fa-undo" onClick={() => cancel(item.cvId)}></i>}</td>
                  <td style={{ textAlign: "center", cursor: "pointer" }}><i className="fa fa-trash" onClick={() => remove(item.cvId)}></i></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Form> : <img src={CDN("/images/l.gif")} />}
    </>
  );
};

export default DataAnonymizationRequests;