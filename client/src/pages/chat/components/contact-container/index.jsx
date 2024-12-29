import chatLogo from "@/assets/chat-logo.png";
import ProfileInfo from "./components/profile-info";
import NewDM from "./components/new-dm";
import { useEffect } from "react";
import apiClient from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTES } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "@/components/custom/ContactList";
import CreateChannel from "./components/create-channel";

function ContactChatContainer() {

    const {directMessageContacts, setDirectMessageContacts} = useAppStore();

    useEffect(() => {
        const getContacts = async () => {
            const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
                withCredentials: true
            });

            if(response.data.contacts){
                setDirectMessageContacts(response.data.contacts)
            }
        }

        getContacts()

    }, []);

    return (
        <div className="relative bg-[#1b1c24] border-r-2 border-[#2f303b] w-[100vw] md:w-[35vw] lg:w-[30vw] xl:w-[20vw]">
        <div className="pt-3">
            <Logo />
        </div>
        <div className="my-5">
            <div className="flex items-center justify-between pr-10">
                <Title text="Direct Messages" />
                <NewDM />
            </div>
            <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
                <ContactList contacts={directMessageContacts}/>
            </div>
        </div>
        <div className="my-5">
            <div className="flex items-center justify-between pr-10">
                <Title text="Channels" />
                <CreateChannel />
            </div>
        </div>
        <ProfileInfo />
    </div>
    );
}

export default ContactChatContainer

const Logo = () => {
    return (
        <div className="flex p-5 justify-start items-center gap-2">
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