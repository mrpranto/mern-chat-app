import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoPowerSharp } from "react-icons/io5";
import { notify_error, notify_success } from "@/utils/notifications";
import apiClient from "@/lib/api-client";

function ProfileInfo() {
  const { userInfo, setUserInfo } = useAppStore();
  const { image, firstName, lastName, color } = userInfo;
  const navigate = useNavigate();
  
  const logout = async() => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE, {},
        { withCredentials: true }
      );

      if (response.status == 200 && response.data) {
        notify_success(response.data.message);
        setUserInfo(null);
        navigate("/auth");
      }
    } catch (err) {
      notify_error(err?.response?.data?.message);
    }
  }

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-5 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center columns-8">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {image ? (
              <AvatarImage
                src={`${HOST}/${image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  color
                )}`}
              >
                {firstName
                  ? firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>{firstName && lastName ? `${firstName} ${lastName}` : ""}</div>
      </div>
      <div className="flex gap-3 items-center justify-center columns-4">

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="border-none bg-[#2a2b33] p-0">
              <FaEdit className="text-purple-500 text-xl font-medium" onClick={() => navigate('/profile')}/>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="border-none bg-[#2a2b33] p-0">
              <IoPowerSharp className="text-red-500 text-xl font-medium" onClick={() => logout()}/>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProfileInfo;
