import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, imgDb } from "../../Firebase/firebaseConfig";
import { userServiceProvider } from "../../Firebase/services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid";
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const getFileToUpload = (e) => {
    const file = e.target.files[0];
    const uploadPath = ref(imgDb, `images/${uniqid("id", "QR")}`);
    uploadBytes(uploadPath, file).then((data) => {
      getDownloadURL(data.ref).then((url) => {
        console.log(url);
      });
    });
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const data = await userServiceProvider.addUser({
        name,
        email,
        createdAt: user.metadata.creationTime,
      });
      console.log(data.id);
      navigate("/users");
      toast.success("Signed up successfully.");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <h2 className="heading">SIGNUP</h2>
      <form>
        <input
          type="text"
          value={name}
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          accept="/*"
          name=""
          onChange={getFileToUpload}
          id=""
        />
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
        <button type="submit" className="form-btn" onClick={formSubmitHandler}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
