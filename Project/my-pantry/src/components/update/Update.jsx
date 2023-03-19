import React, { useContext, useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./update.scss";

const Update = () => {
  const [data, setData] = useState({
    username: "",
    newEmail: "",
    oldPassword: "",
  });
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (img) {
      const storageRef=ref(storage, "userImg/"+ v4());
      //const storageRef = ref(storage, "usersImg/" + uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(currentUser, {
              photoURL: downloadURL,
              displayName: data.username,
            });

            const credential = EmailAuthProvider.credential(
              currentUser.email,
              data.oldPassword
            );

            await reauthenticateWithCredential(currentUser, credential).then(
              async () => {
                // User re-authenticated.
                await updateEmail(currentUser, data.newEmail);
              }
            );
          });
        }
      );
    } else {
      await updateProfile(currentUser, {
        displayName: data.username,
      });
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        data.oldPassword
      );

      await reauthenticateWithCredential(currentUser, credential).then(
        async () => {
          // User re-authenticated.
          await updateEmail(currentUser, data.newEmail);
        }
      );
    }

    navigate("/login");
  };
  // console.log(data);
  return (
    <div className="update">
      <div className="updateWrapper">
        <h3 className="updateTitle">Edit Your Account</h3>
        <span>Email Address: {currentUser.email}</span>
        <button type="submit" className="savedrecipesButton" onClick={()=>{navigate("/savedrecipes")}}>
              View your saved recipes here 
            </button>
        <div className="updateContainer">
          <form onSubmit={handleUpdate}>
            <div className="formItem">
              <label>Fullname</label>
              <input
                className="formInput"
                type="text"
                name="username"
                placeholder={currentUser.displayName}
                onChange={handleChange}
              />
            </div>
            <div className="formItem">
              <label>Email Address</label>
              <input
                className="formInput"
                type="email"
                name="newEmail"
                placeholder={currentUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="formItem">
              <label>Enter current password to confirm changes</label>
              <input
                className="formInput"
                name="oldPassword"
                type="password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="updateButton">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;