import { useAppStore } from "@/store";
import { notify_warning } from "@/utils/notifications";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactChatContainer from "./components/contact-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

function Chat() {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgresss,
    fileDownloadProgress,
  } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      notify_warning("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
        {
            isUploading && <div className="h-[100vh] w-[100vw] fixed z-10 top-0 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
                <h5 className="text-5xl animate-pulse">Uploading Files</h5>
                {fileUploadProgresss}%
            </div>
        }
        {
            isDownloading && <div className="h-[100vh] w-[100vw] fixed z-10 top-0 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
                <h5 className="text-5xl animate-pulse">Downloading Files</h5>
                {fileDownloadProgress}%
            </div>
        }
      <ContactChatContainer />
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
      {/* <EmptyChatContainer /> */}
      {/* <ChatContainer /> */}
    </div>
  );
}

export default Chat;
