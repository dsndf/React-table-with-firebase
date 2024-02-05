import { confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Firebase/firebaseConfig";

const ForgotPassword = async ({ userAuth }) => {
  const [email, setEmail] = useState("");
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email);
  };
  return (
    <div>
      <h2 className="heading">FORGOT PASSWORD</h2>
      <form>
        <input
          type="email"
          value={email}
          placeholder="Enter email to send reset link"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="form-btn" onClick={formSubmitHandler}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
