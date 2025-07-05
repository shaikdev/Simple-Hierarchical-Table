import { Suspense } from "react";
import "./App.scss";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import TableScreen from "screens/table_screen/table.screen";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div />}>
          <Routes>
            {/* <Route
              path="/"
              element={
                <Main>
                  <Test />
                </Main>
              }
            ></Route> */}
              <Route
              path="/"
              element={
                  <TableScreen />
              }
            ></Route>
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}
export default App;
