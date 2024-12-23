import { useAppStore } from "@/store";
import { notify_warning } from "@/utils/notifications";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactChatContainer from "./components/contact-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

function Chat() {

    const { userInfo, selectedChatType } = useAppStore();
    const navigate = useNavigate();

    useEffect(() => {

        if(!userInfo.profileSetup){
            notify_warning("Please setup profile to continue.")
            navigate("/profile")
        }

    }, [userInfo, navigate])

    return (
        <div className="flex h-[100vh] text-white overflow-hidden">
        <ContactChatContainer />
        {
            selectedChatType === undefined ? (<EmptyChatContainer /> ) : (<ChatContainer/>)
        }
        {/* <EmptyChatContainer /> */}
        {/* <ChatContainer /> */}
    </div>
    );
}

export default Chat;