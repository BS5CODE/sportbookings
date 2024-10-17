import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import Home from "./pages/Home";
import { useEffect, useState } from "react";


function App() {

  const [mode, setMode] = useState(
    localStorage.getItem("mode") === "dark" ? "dark" : "light"
  );
  useEffect(() => {
    console.log(mode);
    if (mode === "dark") {
      setMode("dark");
      localStorage.setItem("mode", "dark");
    } else {
      setMode("light");
      localStorage.setItem("mode", "light");
    }
  }, [mode]);
  return (
    <div className={`${mode} h-[100%]`}>
      <Routes>
        <Route
          path="/"
          element={
            <div className={`${mode}`}>
              <div className="dark:bg-black dark:text-white">
                <Home />
              </div>
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className={`${mode}`}>
              <div className="dark:bg-black dark:text-white">
                <Login />
              </div>
            </div>
          }
        />
        <Route
          path={"/signup"}
            element={
                <div className={`${mode}`}>
                <div className="dark:bg-black dark:text-white">
                    <SignUpPage />
                </div>
                </div>
            }
          />
      </Routes>
    </div>
  );
}

export default App;
