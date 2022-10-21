import { useEffect, useState } from "react";
import UserService from "../services/UserService";

const GuardedLayout = ({ children, roles }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    UserService.getUser().then((res:any) => {   
      if(res){
        const hasRoles = res.role.indexOf(roles);
        setIsVisible(hasRoles != -1);
      }
    });
  }, []);

  return isVisible && children;
};

export default GuardedLayout;
