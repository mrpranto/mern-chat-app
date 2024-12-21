import chatLogo from "@/assets/chat-logo.png";
import ProfileInfo from "./components/profile-info";

function ContactChatContainer() {
    return <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
        <div className="pt-3">
            <Logo />
        </div>
        <div className="my-5">
            <div className="flex items-center justify-center pr-10">
                <Title text="Direct Messages" />
            </div>
        </div>
        <div className="my-5">
            <div className="flex items-center justify-center pr-10">
                <Title text="Channels" />
            </div>
        </div>
        <ProfileInfo />
    </div>;
}

export default ContactChatContainer

const Logo = () => {
    return (
        <div className="flex p-5 justify-center items-center gap-2">
            <img className="h-[32px] w-[40px]" src={chatLogo} />
            <span className="text-3xl font-semibold">
                Syncronus
            </span>
        </div>
    )
}

const Title = ({text}) => {
    return (
        <div className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
            {text}
        </div>
    )
}