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

const CvSummary = (props: React.PropsWithChildren<MenuProps>) => {
    const { title, subTitle, menus } = props;

    library.add(fas, far, fab);

    return (
            <table className="ozgecmis">
                <tbody>
                    <tr style={{verticalAlign:"top"}}>
                        <td style={{verticalAlign:"center"}}>
                            {title ? title : null}
                            {subTitle ? <span className="altBaslik">{subTitle}</span> : null}
                        </td>
                        <td style={{verticalAlign:"top"}} className="ikonMenuContainer"></td>
                    </tr>
                </tbody>
            </table>
    )
}

export default CvSummary;