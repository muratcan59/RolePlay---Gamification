import PageBuilder from "../../components/page-components/PageBuilder";
import IPageMenuProps from "../../models/IPageMenuProps";

const HeaderMenu = ({ title, subTitle, menus }: IPageMenuProps) => {
  return (
    <div className="containerFull menuSayfaContainer">
      <div className="container siteTema">
        <div className="menuSayfa">
          <div>
            <PageBuilder title={title} subTitle={subTitle} menus={menus as []} />
          </div>
        </div>
      </div>
    </div>
  )
};
export default HeaderMenu;