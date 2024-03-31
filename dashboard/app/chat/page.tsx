import MainChat from "./components/main-chat";
import CommentSection from "./components/main-chat-display";
import CChat from "./components/duqt";
import ChatSidebar from "./components/sidebar";
export default function Page(){
    return (
        <div className='flex'>
<ChatSidebar/>
<CommentSection/>
        <CChat /></div>
    )
}