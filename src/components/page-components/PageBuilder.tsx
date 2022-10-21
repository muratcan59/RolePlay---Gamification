import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library, IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import "../../assets/layout-shared/web/page.menu.css"
import IPageMenuProps from "../../models/IPageMenuProps";

const PageBuilder = (props: React.PropsWithChildren<IPageMenuProps>) => {
    const { title, subTitle, menus } = props;

    library.add(fas);

    return (
        <table cellSpacing="0" cellPadding="0" className="MW">
            <tbody>
                <tr>
                    {
                        title !== undefined || subTitle ?
                            <td className="PH">
                                {title}
                                {subTitle ? <span className="altBaslik">{subTitle}</span> : null}
                            </td>
                            : null
                    }
                    {
                        menus ?
                            menus.length === 1 ?
                                <td className="right SAD">{menus}</td>
                                :
                                menus.length ?
                                    <td className="right">
                                        <table cellSpacing="0" cellPadding="14">
                                            <tbody>
                                                <tr>
                                                    {menus.map((menu: { url: string, title: string, icon: { prefix: string, name: string } }) => {
                                                        return (
                                                            <td key={menu.url}>
                                                                {menus.map((menu: { url: string, title: string, icon: { prefix: string, name: string } }) => (
                                                                    <a href={menu.url}>
                                                                        <FontAwesomeIcon icon={[menu.icon.prefix as IconPrefix, menu.icon.name as IconName]} />
                                                                        <span>{menu.title}</span>
                                                                    </a>
                                                                ))}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    : null
                            : null
                    }
                </tr>
            </tbody>
        </table>
    )
}

export default PageBuilder;
