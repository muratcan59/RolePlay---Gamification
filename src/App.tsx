import { Suspense } from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import { RecoilRoot } from "recoil";
import RoutePaths from "./configs/RoutePathsConfig";
import Alert from "../src/components/Notifications/Alert";

function App() {
  return (
    <Suspense fallback="loading">
      <div className="App">
        <RecoilRoot>
          <BrowserRouter basename={"/r"}>
            <Switch>
              {RoutePaths.map((item: any) => {
                return (
                  <Route path={item.path} key={item.path} render={(props) => (
                      <item.layout {...props}>
                        <Alert/>
                        <item.component {...props} />
                      </item.layout>
                    )}
                  />
                );
              })}
              <Route path="/multi-alerts" component={() => <h3>multi alerts</h3>}/>
            </Switch>
          </BrowserRouter>
        </RecoilRoot>
      </div>
    </Suspense>
  );
}

export default App;