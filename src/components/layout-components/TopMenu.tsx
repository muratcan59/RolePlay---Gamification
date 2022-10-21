import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from '@fortawesome/fontawesome-svg-core';

interface IProps {
  site: {
    logo: string,
    language: string
  },
  menu: []
}

const TopMenu = ({ site, menu }: IProps) => {
  return (
    <>
      <Logo logo={site.logo} />
      <div className="menu">
        <div className="menuClose">×</div>
        <ul className="menu">
          {
            menu ?
              menu.map((item: any) => {
                return (
                  // TODO: Menüde react tarafında yazılmış bir sayfa yer alırsa active class ı verilmesi gerekecek, şimdilik gerek yok
                  <li className="ripple" key={item.name}>
                    <a href={item.url}>
                      <FontAwesomeIcon icon={[item.icon.prefix, item.icon.name as IconName]} className="navIcon" />
                      {item.name}
                    </a>
                  </li>
                );
              })
              : null
          }
        </ul>
      </div>
    </>
  )
}
export default TopMenu;