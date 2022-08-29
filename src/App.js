import { Fragment, Suspense } from "react";
import "~/App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "~/styles/GlobalStyles";
import { publicRoutes } from "./routes";
import DefaultLayout from "./components/DefaultLayout";
import { useSelector } from "react-redux";
import Loading from "./components/loading/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const { theme } = useSelector((state) => state.global);
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <ToastContainer></ToastContainer>
        <GlobalStyles></GlobalStyles>
        <Suspense fallback={<></>}>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <DefaultLayout>
                      <Page />
                    </DefaultLayout>
                  }
                ></Route>
              );
            })}
          </Routes>
        </Suspense>
        ;
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
