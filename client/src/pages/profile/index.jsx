import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoSave } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import {
  UPDATE_PROFIE_ROUTE,
  ADD_PROFIE_PICTURE_ROUTE,
  REMOVE_PROFIE_PICTURE_ROUTE,
  HOST,
} from "@/utils/constants";
import {
  notify_error,
  notify_success,
  notify_warning,
} from "@/utils/notifications";
import ConfirmDialog from "@/components/custom/ConfirmDialog";

function Profile() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, sethovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [validationError, setValidationError] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setSelectedColor(userInfo.color);
    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const saveChanges = async () => {
    try {
      const response = await apiClient.post(
        UPDATE_PROFIE_ROUTE,
        { firstName, lastName, color: selectedColor },
        { withCredentials: true }
      );

      if (response.status == 200 && response.data) {
        setUserInfo(response.data);
        notify_success("Profile update successfully.");
        navigate("/chat");
      }
    } catch (err) {
      setValidationError(err?.response?.data?.errors);
      notify_error(err?.response?.data?.message);
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      notify_warning("Please update your profile first.");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("profile-image", file);
        const response = await apiClient.post(
          ADD_PROFIE_PICTURE_ROUTE,
          formData,
          { withCredentials: true }
        );

        if (response.status == 200 && response.data) {
          setUserInfo(response.data);
          notify_success("Profile Image update successfully.");
        }

        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setValidationError(err?.response?.data?.errors);
        notify_error(err?.response?.data?.error);
      }
    }
  };

  const handleDeletedImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFIE_PICTURE_ROUTE, {
        withCredentials: true,
      });

      if (response.status == 200 && response.data) {
        setUserInfo(response.data);
        notify_success("Profile Image remove successfully.");
        setImage(null);
      }
    } catch (err) {
      setValidationError(err?.response?.data?.errors);
      notify_error(err?.response?.data?.message);
    }
  };

  return (
    <div className="bg-[#22232c] h-[100vh] w-[100vw] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 md:w-max">
        <div>
          <IoArrowBack
            onClick={() => handleNavigate()}
            className="text-4xl lg:text-6xl text-white/90 cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => sethovered(true)}
            onMouseLeave={() => sethovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full">
                {image ? (
                  <ConfirmDialog
                    dialogButton={
                      <span>
                          <FaTrash className="text-white text-3xl cursor-pointer" />
                      </span>
                    }
                    message="Are you sure you want to delete your profile picture?"
                    onConfirm={() => handleDeletedImage()}
                    confirmText="Yes, Delete it"
                    cancelText="No, Keep it"
                  />
                ) : (
                  <FaPlus
                    className="text-white text-3xl cursor-pointer"
                    onClick={() => handleFileInputClick()}
                  />
                )}
              </div>
            )}
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
            name="profile-image"
            accept=".png, .jpg, .jpeg, .svg, .webp"
          />
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                value={userInfo.email}
                readOnly
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target?.value)}
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
              {validationError.firstName ? (
                <p className="text-xs text-red-400 pl-2">
                  {validationError.firstName[0]}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target?.value)}
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
              {validationError.lastName ? (
                <p className="text-xs text-red-400 pl-2">
                  {validationError.lastName[0]}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedColor === index
                      ? "outline outline-white outline-1"
                      : ""
                  }`}
                  onClick={() => setSelectedColor(index)}
                  key={index}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16  w-full bg-purple-700 hover:bg-purple-900 duration-300"
            onClick={saveChanges}
          >
            <IoSave /> Save Change
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
