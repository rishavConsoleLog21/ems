import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const fileInputRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const ImageName = new Date().getTime() + image.name;
    const storageRef = ref(storage, ImageName);
    const uploadImage = uploadBytesResumable(storageRef, image);
    uploadImage.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercentage(Math.floor(progress));
    });
    (error) => {
      setImageError(true);
    };
    () => {
      getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
        setFormData({
          ...formData,
          profileImage: downloadURL,
        });
      });
    };
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profileImage || currentUser.profileImage}
          alt="profile image"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileInputRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-500">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className="text-yellow-500">{`Uploading: ${imagePercentage} %`}</span>
          ) : imagePercentage === 100 ? (
            <span className="text-green-500">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-200 rounded-lg p-3"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-200 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-200 rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75">
          Update
        </button>
      </form>
      <div className="flex flex-row justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Logout</span>
      </div>
    </div>
  );
};

export default Profile;
