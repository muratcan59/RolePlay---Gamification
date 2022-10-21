interface IModel {
  title: any;
  menus?: Link[];
}

interface Link {
  url: string
  title?: string
  icon?: string
}

const MenuForm = ({ title, menus }: IModel) => {
  return (
    <div className="menuSayfa">
      <div className="hd">
        <span className="baslik">{title}</span>
        {menus ?
          <span className="mn">{menus && menus.map(c => <a key={c.url} href={c.url} title={c.title}><i className={c.icon}></i></a>)}</span>
          : null}
      </div>
    </div>
  );
};
export default MenuForm;
