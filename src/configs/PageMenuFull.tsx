import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library, IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import "../assets/layout-shared/web/page.menu.css";

interface MenuProps {
  title?: string;
  subTitle?: string;
  backUrl?: string;
  urlFilter?: string;
  menus?: { url: string; title: string; icon: {prefix:string,name:string} }[];
}

const PageMenuFull = (props: React.PropsWithChildren<MenuProps>) => {
  const { title, subTitle, menus } = props;

  library.add(fas,far,fab);

  return (
    <table className="MW" cellPadding="0" cellSpacing="0">
      <tbody>
        <tr>
          {title ? (
            <td className="PH">
              {title}
              {subTitle ? <span className="altBaslik">{subTitle}</span> : null}
            </td>
          ) : null}
          {menus?.length ? (
            menus?.length === 1 ? (
              <td align="right" className="right SAD"></td>
            ) : (
              <td align="right" className="right">
                <table cellPadding="14" cellSpacing="0">
                  <tbody>
                    <tr>
                      {menus.map(
                        (menu: {
                          url: string;
                          title: string;
                          icon: {prefix:string,name:string};
                        }) => (
                          <a href={menu.url}>
                            <FontAwesomeIcon icon={[menu.icon.prefix as IconPrefix, menu.icon.name as IconName]} />
                            {menu.title}
                          </a>
                        )
                      )}
                    </tr>
                  </tbody>
                </table>
              </td>
            )
          ) : null}
        </tr>
      </tbody>
    </table>
  );
};

export default PageMenuFull;
