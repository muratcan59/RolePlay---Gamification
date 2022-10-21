import { useEffect, useState } from "react";
import UserService from "../services/UserService";

const GuardedComponent = ({ children, permissions }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    UserService.getUser().then((res:any) => {
      const hasPermission = res.permissions.filter((p: any) =>
        permissions.includes(p)
      );
      setIsVisible(hasPermission.length > 0);
    });
  }, []);

  return isVisible && children;
};

export default GuardedComponent;
