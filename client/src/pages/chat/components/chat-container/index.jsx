import ChatHeader from "./components/chat-header";
import MessageBar from "./components/message-bar";
import MessageContainer from "./components/message-container";

function ChatContainer() {
    return (
        <div className="fixed top-0 h-[100vh] w-[100vw] md:w-[65vw] lg:w-[70vw] xl:w-[80vw] bg-[#1c1d25] flex flex-col md:static md:flex-1">
            <ChatHeader />
            <MessageContainer />
            <MessageBar />
        </div>
    );
}

export default ChatContainer;