import MenuPage from "../../../components/page-components/MenuPage";
import Translate from "../../../shared/translate";
import Form from "../../../components/page-components/Form";
import Logic from "./logic"

const DataRetentionReport = () => {
  const { title, items } = Logic();

  return (
    <>
      <MenuPage title={title} />
      {items && <Form>
        <table className="G" cellSpacing="0" cellPadding="6">
          <tbody>
            <tr className="GH">
              <th className="GHN"></th>
              <th><Translate code={"CANDIDATE"} /></th>
              <th><Translate code={"ACTION_DATE"} /></th>
              <th><Translate code={"DELETE_DATE"} /></th>
            </tr>
            {items.map((item: any, index: any) => {
              return (
                <tr key={index} className={index % 2 === 0 ? "GR" : "GAR"}>
                  <td className="GN">{index + 1}.</td>
                  <td><a className="GL" href={process.env.REACT_APP_API_WEBFORM + "/cv/kart.aspx?c=" + item.cvId} target="_blank">{item.nameSurname}</a></td>
                  <td>{item.actionDate}</td>
                  <td>{item.deleteDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Form>}
    </>
  );
};

export default DataRetentionReport;