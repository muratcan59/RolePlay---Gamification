import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library, IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import "../assets/layout-shared/web/page.menu.full.css"

interface MenuProps {
    title?: string;
    subTitle?: string;
    menus?: { url: string, name: string, icon: { prefix: string, name: string } }[];
}

const PageMenuReport = (props: React.PropsWithChildren<MenuProps>) => {
    const { title, subTitle, menus } = props;

    library.add(fas, far, fab);

    return (
        <div className="menuSayfa">
            <table cellPadding="0" cellSpacing="0" className="MW">
                <tbody>
                    <tr>
                        <td className="PH">
                            {title ? title : null}
                            {subTitle ? <span className="altBaslik">{subTitle}</span> : null}
                        </td>
                        {menus?.length ?
                            <td className="right" align="right">
                                <table cellPadding="14" cellSpacing="0">
                                    <tbody>
                                        <tr>
                                            {
                                                menus.map((menu: { url: string, name: string, icon: { prefix: string, name: string } }) => (
                                                    <td key={menu.url}>
                                                        <a href={menu.url} title={menu.name}><FontAwesomeIcon icon={[menu.icon.prefix as IconPrefix, menu.icon.name as IconName]} /></a>
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            : null}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PageMenuReport;
