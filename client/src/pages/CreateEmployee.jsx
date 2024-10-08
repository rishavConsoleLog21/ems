import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Helmet } from "react-helmet";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleLimitPhoneNumber = (e) => {
    const value = e.target.value;
    if (value.length <= 10 && value.match(/^[0-9]*$/)) {
      setPhone(value);
    }
    if (value.length > 10) {
      alert("Phone number should be 10 digits");
    }
  };

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const ImageName = new Date().getTime() + image.name;
    const storageRef = ref(storage, ImageName);
    const uploadImage = uploadBytesResumable(storageRef, image);
    setLoading(true);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.floor(progress));
      },
      (error) => {
        setImageError(true);
        setLoading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadImage.snapshot.ref);
          setFormData({
            ...formData,
            image: downloadURL,
          });
          setLoading(false);
        } catch (error) {
          setImageError(true);
          setLoading(false);
        }
      }
    );
  };

  const handleSaveEmployee = async () => {
    if (!formData.image) {
      toast.error("Please wait until the image is uploaded");
      return;
    }

    const data = {
      name,
      email,
      phone,
      designation,
      gender,
      course: course.join(", "),
      image: formData.image,
    };
    setLoading(true);

    try {
      const res = await fetch("/api/v1/employees/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      setLoading(false);
      if (response.success) {
        toast.success("Employee added successfully");
        navigate("/employee");
      } else {
        toast.error("Failed to create employee");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Helmet>
        <title>Add New Employee</title>
        <meta
          name="description"
          content="Add a new employee to the employee list"
        />
      </Helmet>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4">
        <BackButton />
        <h1 className="text-3xl my-4 font-semibold text-center">
          Add New Employee
        </h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col">
          <div className="my-4">
            <label className="text-xl mr-4 text-slate-600">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter full name"
              className="border-2 border-slate-500 px-4 rounded-lg py-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-slate-600">Email📧</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
              className="border-2 border-slate-500 px-4 rounded-lg py-2 w-full lowercase"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-slate-600">Phone📞</label>
            <input
              id="phone"
              type="text"
              placeholder="Enter phone number (10 digits)"
              className="border-2 border-slate-500 px-4 rounded-lg py-2 w-full"
              value={phone}
              onChange={handleLimitPhoneNumber}
              required
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-slate-600">Designation</label>
            <select
              id="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="border-2 border-slate-500 px-4 rounded-lg py-2 w-full"
              required
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="flex space-x-4 my-4">
            <div className="flex-1">
              <label className="text-xl mr-4 text-slate-600 ">
                Gender🚹/🚺
              </label>
              <div>
                <label className="mr-2 text-blue-500">
                  <input
                    type="radio"
                    value="M"
                    checked={gender === "M"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  M
                </label>
                <label className="mr-2 text-pink-500">
                  <input
                    type="radio"
                    value="F"
                    checked={gender === "F"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  F
                </label>
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xl mr-4 text-slate-600">Course</label>
              <div id="course">
                <label className="mr-2">
                  <input
                    type="checkbox"
                    value="MCA"
                    checked={course.includes("MCA")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCourse([...course, "MCA"]);
                      } else {
                        setCourse(course.filter((c) => c !== "MCA"));
                      }
                    }}
                  />
                  MCA
                </label>
                <label className="mr-2">
                  <input
                    type="checkbox"
                    value="BCA"
                    checked={course.includes("BCA")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCourse([...course, "BCA"]);
                      } else {
                        setCourse(course.filter((c) => c !== "BCA"));
                      }
                    }}
                  />
                  BCA
                </label>
                <label className="mr-2">
                  <input
                    type="checkbox"
                    value="BSC"
                    checked={course.includes("BSC")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCourse([...course, "BSC"]);
                      } else {
                        setCourse(course.filter((c) => c !== "BSC"));
                      }
                    }}
                  />
                  BSC
                </label>
              </div>
            </div>
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-slate-600">Image</label>
            <input
              id="image"
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 w-24 h-24 cursor-pointer rounded-full self-center object-cover"
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
                <span className="text-green-500">
                  Image uploaded successfully
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <button
            id="save"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-85"
            onClick={handleSaveEmployee}
            disabled={
              loading ||
              !name ||
              !email ||
              !phone ||
              !designation ||
              !gender ||
              course.length === 0 ||
              !formData.image
            }
          >
            Save Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
