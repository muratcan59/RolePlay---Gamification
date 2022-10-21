import React, { useState, useEffect } from 'react';
import UserService from "../../services/UserService";
import SiteService from "../../services/SiteService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from '@fortawesome/fontawesome-svg-core';
// import Language from "../../utils/Language";
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';

// library.add(far);

const UserMenu = () => {
  const [topMenu, setMenu] = useState([]);
  const [site, setSite] = useState({ logo: "", language: "" });
  // const userLang = "TR" ? "English" : "Türkçe";
  // const newLanguage = userLang === "English" ? 1 : 0;

  useEffect(() => {
    getMenu();
    getSite();
  }, []);

  const getMenu = async () => {
    var res = await UserService.getUser();
    if (res) {
      setMenu(res.topMenu);
    }
  }
  const getSite = async () => {
    var res = await SiteService.getSiteAsync();
    setSite(res);
  };

  return (
    <div className="menuUst">
      {topMenu ?
        topMenu.map((item: any) => {
          return (
            <span key={item.url}>
              <FontAwesomeIcon icon={[item.Icon.prefix, item.Icon.name as IconName]} />
              <a href={process.env.REACT_APP_API_WEBFORM + "/" + item.url} style={{ paddingRight: "8px" }}>{item.title}</a>
            </span>
          );
        })
        : null}
      {!site?.language ?
        (
          <span>
            <FontAwesomeIcon icon={faGlobeAmericas} />
            {/* <a
              href={
                process.env.REACT_APP_API_WEBFORM +
                "uyelik/react.change.language.aspx?source=" +
                window.location.href
                + "&amp;language=" + newLanguage
              }
              id="navButton"
              className="topLang"
            >
              {userLang}
            </a> */}
          </span>
        ) : null}
    </div>

  );
};

export default UserMenu;