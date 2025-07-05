import { Suspense } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import TableScreen from "screens/table_screen/table.screen";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
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
      </BrowserRouter>
    </Provider>
  );
}
export default App;
