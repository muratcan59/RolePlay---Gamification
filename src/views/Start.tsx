import { useLayoutEffect } from "react";
import Cookies from "universal-cookie";

const Start = () => {
  useLayoutEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let token = params.get("u");
    let url = params.get("url");
    
    if (token === null || url === null) {
      window.location.href = "/";
      return;
    }

    const cookies = new Cookies();
    cookies.set("RT", token, { path: '/' });

    window.location.href = url.startsWith("http") ? url : ("/r" + url);
  }, []);

  return <></>;
};
export default Start;
