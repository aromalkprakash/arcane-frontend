import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { extractTime } from "@/lib/extractTime";
import { GetMe } from "@/api/userUrl";
import { deleteMessageThunk } from "@/redux/thunk";
import "../../../styles/chat/chatContainer.scss";

const Message: React.FC<MessageProps> = ({ message }) => {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [contextMenu, setContextMenu] = useState<{ visible: boolean, x: number, y: number } | null>(null);
    const dispatch = useDispatch();
    const messageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const user = await GetMe();
                setAuthUser(user);
            } catch (error) {
                console.error('Failed to fetch authenticated user', error);
            }
        };

        fetchAuthUser();
    }, []);

    const selectedUserId = useSelector((state: { conversations: ConversationsState }) => state.conversations.selectedUserId);
    const selectedUser = useSelector((state: { conversations: ConversationsState }) =>
        state.conversations.chatUsersList.find(user => user._id === selectedUserId)
    );

    const fromMe = authUser && message.senderId === authUser._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? (authUser.image || '/no-avatar.png') : (selectedUser?.image || '/no-avatar.png');
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const formattedTime = extractTime(message.createdAt);
    const shakeClass = message.shouldShake ? "shake" : "";

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY
        });
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                await dispatch(deleteMessageThunk(message._id) as any);
                setContextMenu(null); // Close context menu after deletion
            } catch (error) {
                console.error("Failed to delete message", error);
            }
        }
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (contextMenu && messageRef.current && !messageRef.current.contains(e.target as Node)) {
                handleCloseContextMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [contextMenu]);

    return (
        <div className={`chat ${chatClassName}`} ref={messageRef}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img
                        alt='Profile'
                        src={profilePic}
                    />
                </div>
            </div>
            <div
                className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
                onContextMenu={handleContextMenu} // Attach event directly to chat-bubble
            >
                {message.message}
            </div>
            <div className='chat-footer opacity-100 text-xs flex gap-1 items-center'>{formattedTime}</div>

            {contextMenu && (
                <div
                    className="context-menu"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default Message;
