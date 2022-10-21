import MenuPage from "../../../components/page-components/MenuPage";
import Translate from "../../../shared/translate";
import Form from "../../../components/page-components/Form";
import Logic from "./logic"

const DataTransferReport = () => {
  const { title, items } = Logic();

  return (
    <>
      <MenuPage title={title} />
      {items && <Form>
        <table className="G" cellSpacing="0" cellPadding="6">
          <tbody>
            <tr className="GH">
              <th className="GHN"></th>
              <th><Translate code={"USER"} /></th>
              <th><Translate code={"PROCESS"} /></th>
              <th><Translate code={"DATE"} /></th>
              <th style={{ textAlign: "right" }}><Translate code={"DATA_LENGTH"} /></th>
            </tr>
            {items.map((item: any, index: any) => {
              return (
                <tr key={index} className={index % 2 === 0 ? "GR" : "GAR"}>
                  <td className="GN">{index + 1}.</td>
                  <td>{item.employerNameSurname}</td>
                  <td>{item.processName}</td>
                  <td>{item.transferDate}</td>
                  <td style={{ textAlign: "right" }}>{item.numberOfRecords}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Form>}
    </>
  );
};

export default DataTransferReport;