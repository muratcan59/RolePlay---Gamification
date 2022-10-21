import React, { useState, useEffect } from 'react';
import TopMenu from "../../components/layout-components/TopMenu";
import UserMenu from "../../components/layout-components/UserMenu";
import HeaderMenu from "../../components/layout-components/HeaderMenu";
import Footer from "../../components/layout-components/Footer";
import SiteService from "../../services/SiteService";
import UserService from "../../services/UserService";
import IPageMenuProps from "../../models/IPageMenuProps";

interface IProps {
  children: any;
  menuProps: IPageMenuProps
}
const DefaultLayout = ({ children, menuProps }: IProps) => {
  const [site, setSite] = useState({ logo: "", language: "" });
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getSite();
    getUserMenu();
  }, []);

  const getSite = async () => {
    var res = await SiteService.getSiteAsync();
    setSite(res);
  };
  const getUserMenu = async () => {
    var res = await UserService.getUser();
    setMenu(res.menu);
  };

  return (
    <>
      <div className="overlay" id="overlay"></div>
      <div className="page">
        <div className="containerFull">
          <div className="container header">
            <UserMenu />
            <TopMenu site={site} menu={menu as any} />
          </div>
          {/* <HeaderMenu title={menuProps.title} subTitle={menuProps.subTitle} menus={menuProps.menus} /> */}
          <HeaderMenu title="{menuProps.title as any}" subTitle="{menuProps.subTitle as any}" menus={{ url: "", title: "", icon: {prefix: "",name: ""} } as any} />
          <div className="container">
            <div className="content">{children}</div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;