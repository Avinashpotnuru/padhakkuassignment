import "./App.css";
import Login from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

import { createContext, useContext, useState } from "react";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Users from "./components/Users";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PriviteRoute";

export const store = createContext();

function App() {
  const [auth, setAuth] = useState(false);

  console.log("auth", auth);
  return (
    <store.Provider value={[auth, setAuth]}>
      <Header />
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </store.Provider>
  );
}

export default App;
