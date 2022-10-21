import { useState, useEffect, useLayoutEffect } from "react";
import SiteService from "../../services/SiteService";
import UserService from "../../services/UserService";
import CDN from "../../helpers/cdn";
import M from "../../helpers/translate";
interface IProps {
  children: any;
}

const BusinessLayout = ({ children }: IProps) => {
  const [user, setUser] = useState({
    Name: "",
    Photo: "",
    Language: 0,
    Company: "",
    Role: "",
    App: "",
    TopLang: "",
    MultiRole: false,
    TopNotify: false,
    SiteMap: false,
    LeftMenu: [],
    AppMenu: [],
    TopMenu: [],
  });

  const [site, setSite] = useState({
    logo: "",
    theme: "",
  });

  const [isVisibleAppMenu, setIsVisibleAppMenu] = useState("none");
  const [isMenuPinIcon, setIsMenuPinIcon] = useState("fa fa-angle-double-left");
  const [isVisibleSmallMenu, setIsVisibleSmallMenu] = useState("page-menu");
  const [isVisibleDropdownList, setIsVisibleDropdownList] = useState("");
  const [isVisibleDropdownPlus, setIsVisibleDropdownPlus] = useState("");
  const [isVisibleProcessGif, setIsVisibleProcessGif] = useState("none");
  const [nameSurnameStr, setNameSurnameStr] = useState("");
  const [selectAppStr, setSelectAppStr] = useState("");
  const [addStr, setAddStr] = useState("");
  const [notfSettingsStr, setNotifySettingsStr] = useState("");
  const [myAccountStr, setMyAccountStr] = useState("");
  const [siteMappingStr, setSiteMappingStr] = useState("");
  const [careerSiteStr, setCareerSiteStr] = useState("");
  const [changeRoleStr, setChangeRoleStr] = useState("");
  const [logoutStr, setLogoutStr] = useState("");
  const [logoStr, setLogoStr] = useState("");

  const appMenuHandle = async () => {
    isVisibleAppMenu === "none" ? setIsVisibleAppMenu("block") : setIsVisibleAppMenu("none");
    setIsVisibleProcessGif("none");
  };

  const search = async () => {
    var txt = (document.getElementById("search") as HTMLInputElement).value;

    if (txt.trim().length > 0) {
      window.location.href = process.env.REACT_APP_API_WEBFORM + "/aday/liste.aspx?i=" + encodeURI(txt);
    }
  };

  useLayoutEffect(() => {
    sessionStorage.getItem("solMenuMini") === "true" && setIsVisibleSmallMenu("page-menu mini");
    getSite();
  }, []);

  useEffect(() => {
    getUser();
    M.T("AD_SOYAD", "business").then(setNameSurnameStr);
    M.T("UYGULAMA_SEC", "business").then(setSelectAppStr);
    M.T("ADD", "business").then(setAddStr);
    M.T("BILDIRIM_AYARLARI", "business").then(setNotifySettingsStr);
    M.T("HESABIM", "business").then(setMyAccountStr);
    M.T("SITE_HARITASI", "business").then(setSiteMappingStr);
    M.T("KARIYER_SITE", "business").then(setCareerSiteStr);
    M.T("ROL_DEGISTIR", "business").then(setChangeRoleStr);
    M.T("CIKIS", "business").then(setLogoutStr);
    M.T("LOGO_YUKLE", "business").then(setLogoStr);
  }, []);

  const getUser = async () => {
    var res = await UserService.getUser();
    if (res === undefined) return;
    setUser(res);
  };

  const getSite = async () => {
    var res = await SiteService.getSiteAsync();
    if (res === undefined) return;
    setSite(res);
  };

  const menuPinHandle = async () => {
    if (isVisibleSmallMenu === "page-menu") {
      setIsVisibleSmallMenu("page-menu mini");
      sessionStorage.setItem("solMenuMini", "true");
      setIsMenuPinIcon("fa fa-angle-double-right");
    } else {
      setIsVisibleSmallMenu("page-menu");
      sessionStorage.removeItem("solMenuMini");
      setIsMenuPinIcon("fa fa-angle-double-left");
    }
  };

  return (
    <>
      <link type="text/css" rel="stylesheet" href={CDN("/css/kurumsal.css")}></link>
      {site?.theme && (<link type="text/css" rel="stylesheet" href={CDN("/css/theme/" + site.theme + ".css")}></link>)}
      <table className="head">
        <tbody>
          <tr>
            <td className="head-menu-pin" style={{ display: "none" }}>
              <i className="fa fa-bars"></i>
            </td>
            <td className="head-app-menu" style={{ visibility: user?.AppMenu.length > 0 ? "visible" : "hidden" }}>
              <img src={CDN("/images/dot.menu.png")} title={selectAppStr} onClick={() => appMenuHandle()} />
              <i className="fa fa-hand-pointer-o"></i>
              {user?.AppMenu.length > 0 &&
                <ul className="app-selection-area" style={{ display: isVisibleAppMenu }}>
                  {user.AppMenu.map((item: any) => {
                    return (
                      <li key={item.Title}>
                        <a href={process.env.REACT_APP_API_WEBFORM + "/isveren/change.app.aspx?a=" + item.Url} dangerouslySetInnerHTML={{ __html: "<i class='fa fa-" + item.Icon + "'></i>" + item.Title }} onClick={() => setIsVisibleProcessGif("block")}></a>
                      </li>
                    );
                  })}
                  <li><img src={CDN("/images/li.gif")} style={{ display: isVisibleProcessGif }} /></li>
                </ul>
              }
            </td>
            <td className="head-app" dangerouslySetInnerHTML={{ __html: user?.App }}></td>
            <td className="head-menu">
              <div className="head-search">
                <input type="text" id="search" maxLength={50} placeholder={nameSurnameStr} />
                <span onClick={search}><i className="fa fa-search"></i></span>
              </div>
              {user?.TopMenu.length > 0 &&
                <div className="dropdown menu-item" onMouseOver={() => setIsVisibleDropdownPlus("active")} onMouseLeave={() => setIsVisibleDropdownPlus("")}>
                  <span title={addStr}><i className="fa fa-plus top-menu"></i></span>
                  <ul className={isVisibleDropdownPlus}>
                    {user?.TopMenu &&
                      user.TopMenu.map((item: any) => {
                        return (
                          <li key={item.Title}>
                            <a href={process.env.REACT_APP_API_WEBFORM + item.Url}>
                              <i className={"fa fa-" + item.Icon} title={item.Title}></i>
                              <span>{item.Title}</span>
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              }
              {user?.TopNotify && <a href={process.env.REACT_APP_API_WEBFORM + "/isveren/bildirim.aspx"} title={notfSettingsStr}><i className="fa fa-bell top-menu notify-icon"></i></a>}
              {user?.TopLang && <a className="language" href={process.env.REACT_APP_API_WEBFORM + "/uyelik/react.change.language.aspx?source=" + window.location.href}>{user.TopLang}</a>}
              <div className="dropdown" onMouseOver={() => setIsVisibleDropdownList("active")} onMouseLeave={() => setIsVisibleDropdownList("")}>
                <span className="user">
                  <span className="letter">
                    {user?.Photo ? <img src={process.env.REACT_APP_API_WEBFORM + "/" + user.Photo + ".d"} /> : user?.Name?.charAt(0)}
                  </span>
                  <span className="user-info">
                    <span>{user?.Name}</span>
                    <span>{user?.Role}</span>
                  </span>
                </span>
                <ul className={isVisibleDropdownList}>
                  <li>
                    <a href={process.env.REACT_APP_API_WEBFORM + "/kurumsal/uyelik.aspx"} style={{ paddingRight: "8px" }}>
                      <i className="fa fa-home"></i>{myAccountStr}
                    </a>
                  </li>
                  {user?.SiteMap &&
                    <li>
                      <a href={process.env.REACT_APP_API_WEBFORM + "/kurumsal/harita.aspx"}>
                        <i className="fa fa-sitemap"></i>{siteMappingStr}
                      </a>
                    </li>
                  }
                  <li className="career-site">
                    <a href={process.env.REACT_APP_API_WEBFORM + "/"}>
                      <i className="fa fa-laptop"></i>{careerSiteStr}
                    </a>
                  </li>
                  {user?.MultiRole && (
                    <li>
                      <a href={process.env.REACT_APP_API_WEBFORM + "/uyelik/profil.sec.aspx"} style={{ paddingRight: "8px" }}>
                        <i className="fa fa-user"></i>{changeRoleStr}
                      </a>
                    </li>
                  )}
                  <li>
                    <a href={process.env.REACT_APP_API_WEBFORM + "/uyelik/cikis.aspx"}>
                      <i className="fa fa-sign-out"></i>{logoutStr}
                    </a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="page notMobile">
        <tbody>
          <tr>
            <td className={isVisibleSmallMenu}>
              <div>
                <div className="firma-bilgi">
                  <div className="firma-logo">
                    {site?.logo ?
                      <a href={process.env.REACT_APP_API_WEBFORM + "/"}>
                        <img src={process.env.REACT_APP_API_WEBFORM + "/" + site?.logo + ".d"} />
                      </a> :
                      <div className="logo-upload">
                        <a className="LB" href="/site/logo.aspx" title={logoStr}><i className="fa fa-camera"></i>{logoStr}</a>
                      </div>
                    }
                  </div>
                  <div className="firma-ad">{user?.Company}</div>
                </div>
                <ul>
                  {user?.LeftMenu &&
                    user.LeftMenu.map((item: any) => {
                      return (
                        <li key={item.Title}>
                          <a href={process.env.REACT_APP_API_WEBFORM + item.Url} title={item.Title} >
                            <i className={"fa fa-" + item.Icon}></i>
                            <span>{item.Title}</span>
                          </a>
                        </li>
                      );
                    })}
                  <li className="menu-pin" onClick={() => menuPinHandle()}>
                    <i className={isMenuPinIcon}></i>
                  </li>
                </ul>
              </div>
            </td>
            <td className="container">{children}</td>
          </tr>
        </tbody>
      </table>
      <div className="sub-text">
        <a href="https://www.hrpeak.com/" target="_blank" title="HRPeak">
          <img src={CDN("/images/hrpeak.g.png")} alt="HRPeak" style={{ maxHeight: "20px" }} />
        </a>
      </div>
    </>
  );
};
export default BusinessLayout;