import {RiCloseFill} from 'react-icons/ri';

function ChatHeader() {
    return <div className="h-[10vh] border-b-2 border-[#2f303d] flex items-center justify-between px-20">
        <div className="flex gap-5 items-center">
            <div className="flex gap-3 items-center justify-center"></div>
            <div className="flex items-center justify-center gap-5">
                
                <RiCloseFill className="text-3xl cursor-pointer duration-300 transition-all"/>
                
            </div>
        </div>
    </div>;
}

export default ChatHeader;