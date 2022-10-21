import Logic from "./logic";
import MenuPage from "../../../../../components/page-components/MenuPage";
import Form from "../../../../../components/page-components/Form";
import CDN from "../../../../../helpers/cdn";
import AlertSection from "../../../../../components/Notifications/AlertSection";
import Translate from "../../../../../shared/translate";

const List = () => {
    const { deleteRolePlay, changeLanguage, title, message, language, items } = Logic();

    return (
        <>
            {/* <MenuPage title={title} addLink="role.play.manage" /> */}
            <MenuPage title={title} />
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
                            <th><Translate code={"ROLE_PLAY"} /></th>
                            <th className="GHC"><Translate code={"DUZENLE"} /></th>
                            <th className="GHC"><Translate code={"SIL"} /></th>
                        </tr>
                        {
                            items.map((item, index) => {
                                return (
                                    <tr key={index} className={index % 2 === 0 ? "GR" : "GAR"}>
                                        <td className="GN">{index + 1}.</td>
                                        <td><a className="GL" href={"/r/w/hrpeak/dm/role.play.manage?n=" + item.id + "&l=" + language} target="_blank">{item.name}</a></td>
                                        <td style={{ textAlign: "center", cursor: "pointer" }}><a className="GL" href={"/r/w/hrpeak/dm/role.play.manage?n=" + item.id + "&l=" + language} target="_blank"><i className="fa fa-pencil-square-o"></i></a></td>
                                        <td style={{ textAlign: "center", cursor: "pointer" }}><i className="fa fa-trash-o" onClick={() => deleteRolePlay(item.id)}></i></td>
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

export default List;