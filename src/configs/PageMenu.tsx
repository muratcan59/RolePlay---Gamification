import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faBars, faReply } from "@fortawesome/free-solid-svg-icons";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library, IconName } from '@fortawesome/fontawesome-svg-core';
import "../assets/layout-shared/web/page.menu.css"

interface MenuProps {
    title?: string;
    subTitle?: string;
    backUrl?: string;
    urlFilter?: string;
    menus?: { url: string, title: string, icon: string }[];
}

const PageMenu = (props: React.PropsWithChildren<MenuProps>) => {
    const { title, subTitle, backUrl, urlFilter, menus } = props;
    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
    };

    library.add(fas);

    return (
        <div className="hd">
            {title ? <span className="baslik">{title}</span> : null}
            {subTitle ? <span className="altBaslik">{subTitle}</span> : null}
            {(backUrl !== null || urlFilter !== null || menus?.length) ?
                <span className="mn">
                    {backUrl ?
                        <a href={backUrl} title="go back" target="_blank"><FontAwesomeIcon icon={faReply} /></a> : null}
                    {urlFilter ? <a href={urlFilter} title="filter" target="_blank"><FontAwesomeIcon icon={faFilter} /></a> : null}
                    {menus?.length ?
                        <div>
                            <span onClick={() => handleToggle()}><FontAwesomeIcon icon={faBars} /></span>
                            <div className="subMenu" style={{ display: isActive ? "block" : "none" }}>
                                {menus.map((menu: { url: string, title: string, icon: string }) => (
                                    <a href={menu.url}>{menu.title}<FontAwesomeIcon icon={['fas', menu.icon as IconName]} /></a>
                                ))}
                            </div>
                        </div>
                        : null}
                </span>
                : null}
        </div>
    )
}

export default PageMenu;
