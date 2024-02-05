import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table/Table";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Layouts/Header";
import Signup from "./components/Signup/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseConfig";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
const App = () => {
  const [userAuth, setUserAuth] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("logged in");
        setUserAuth(user);
      } else {
        console.log("logged out");
        setUserAuth(null);
      }
    });
  }, []);
  return (
    <Router>
      <Header userAuth={userAuth} />
      <Routes>
        <Route
          path="/users"
          element={
            <ProtectedRoute userAuth={userAuth}>
              <Table />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login userAuth={userAuth} />} />
        <Route
          path="/reset/password"
          element={<ForgotPassword userAuth={userAuth} />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
