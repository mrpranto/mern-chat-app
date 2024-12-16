import { useAppStore } from "@/store";
import { notify_warning } from "@/utils/notifications";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Chat() {

    const { userInfo } = useAppStore();
    const navigate = useNavigate();

    useEffect(() => {

        if(!userInfo.profileSetup){
            notify_warning("Please setup profile to continue.")
            navigate("/profile")
        }

    }, [userInfo, navigate])

    return <h1>Hello from chat</h1>;
}

export default Chat;