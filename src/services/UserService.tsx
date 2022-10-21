import Cookies from "universal-cookie";

const UserService = {
  getUser: async () => {
    try {
      const cookie = new Cookies();
      var user = cookie.get("RU") ?? "";
      var menuLeft = cookie.get("RML") ?? "";
      var menuApp = cookie.get("RMA") ?? "";
      var menuTop = cookie.get("RMT") ?? "";
      
      if (user === "" || menuLeft === "" || menuApp === "" || menuTop === "") {
        window.location.href = process.env.REACT_APP_API_WEBFORM + "/uyelik/react.user.aspx?source=" + window.location.href;
        return Promise.reject("Authorization");
      } else {
        user.LeftMenu = menuLeft;
        user.AppMenu = menuApp;
        user.TopMenu = menuTop;
        return user;
      }
    } catch (error) {
    }
  },
};

export default UserService;