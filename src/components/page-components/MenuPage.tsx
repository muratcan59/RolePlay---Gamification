interface IModel {
  title: any;
  addLink?: string;
  listLink?: string;
}

const MenuPage = ({ title, addLink, listLink }: IModel) => {
  return (
    <div className="menuSayfa">
      <div className="page-grid-head">
        <span className="page-grid-head-title">{title}</span>
        {addLink &&
          <span className="page-grid-head-menu">
            <span className="page-grid-head-menu-add" title="Add">
              <a href={addLink}><i className="fa fa-plus"></i></a>
            </span>
          </span>}
        {listLink &&
          <span className="page-grid-head-menu">
            <span className="page-grid-head-menu-add">
              <a href={listLink}><i className="fa fa-reply"></i></a>
            </span>
          </span>}
      </div>
    </div>
  );
};

export default MenuPage;
