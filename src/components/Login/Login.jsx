import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = ({ userAuth }) => {
  const naviagte = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user.email);
      toast.success("Logged in successfully.");
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (userAuth) {
      naviagte("/users");
    }
  }, [userAuth]);
  return (
    <div>
      <h2 className="heading">LOGIN</h2>
      <form>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <small>
          <Link to={'/reset/password'} style={{ fontWeight: "bold", cursor: "pointer" }}>Forgot password ?</Link>
        </small>
        <button type="submit" className="form-btn" onClick={formSubmitHandler}>
          Login
        </button>
        <p>
          New user ?{" "}
          <Link
            to={"/signup"}
            style={{ fontWeight: "bold", cursor: "pointer" }}
          >
            Signup
          </Link>{" "}
          here
        </p>
      </form>
    </div>
  );
};

export default Login;
