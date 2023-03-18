import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./update.scss";
import { v4 as uuid} from "uuid";
import { EmailAuthProvider, reauthenticateWithCredential, updateProfile, updateEmail } from "firebase/auth";

const Update = () => {
  const[data,setData]=useState({
    fullname:"",
    newEmail:"",
    oldPassword:"",
  })
  const navigate = useNavigate();
  const {currentUser}=useContext(AuthContext);
  const [img, setImg] = useState(null);

  const handleChange = (e)=>{
    setData((prev)=>({...prev, [e.target.name]: e.target.value}));
  };

  const handleUpdate = (e)=>{
    e.preventDefault();

    if(img){
      const storageRef = ref(storage, "userImages/" + uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on( 
      (error) => {}, 
      () => {
    
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        (currentUser,{
          photoURL : downloadURL,
          displayName: data.fullname,
        });
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          data.oldPassword
          );
           reauthenticateWithCredential(currentUser, credential).then(async()=> {
            updateEmail(currentUser, data.newEmail)
          });
    });
  }
);
} else{
      updateProfile(currentUser,{
      photoURL : downloadURL,
      displayName: data.fullname,
    });
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      data.oldPassword
      );
    

      reauthenticateWithCredential(currentUser, credential).then(async()=> {
        updateEmail(currentUser, data.newEmail)
      });
      }
      navigate("/login");
  };
  console.log(data);
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
              <span>Profile Photo</span>
              <div className="profilePic">
                <img
                  src={img ? URL.createObjectURL(img):"/assets/DefaultProfile.png"}
                  alt=""
                  className="profileImg"
                />
                <label htmlFor="file">
                  <span className="change">Change</span>
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e)=>setImg(e.target.files[0])}
                />
              </div>
            </div>
            <div className="formItem">
              <label>Fullname</label>
              <input
                className="formInput"
                type="text"
                name="fullname"
                placeholder={currentUser.displayName}
                onChange={handleChange}
              />
            </div>
            <div className="formItem">
              <label>Email</label>
              <input
                className="formInput"
                type="email"
                name="newEmail"
                placeholder={currentUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="formItem">
              <label>Password</label>
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