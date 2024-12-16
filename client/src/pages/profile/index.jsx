import { useAppStore } from "@/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {IoArrowBack} from "react-icons/io5";

function Profile() {

    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useAppStore();
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [image, setimage] = useState(null);
    const [hovered, sethovered] = useState(false);
    const [selectedColor, setselectedColor] = useState(0);

    const saveChanges = async () => {

    }

    return (
        <div className="bg-[#22232c] h-[100vh] flex items-center justify-center flex-col gap-10">
            <div className="flex flex-col gap-10 w-[100vw] md:w-max">
                <div>
                    <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
                </div>
                <div className="grid grid-cols-2">
                    <div 
                        className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
                        onMouseEnter={() => sethovered(true)}
                        onMouseLeave={() => sethovered(false)}
                    >

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;