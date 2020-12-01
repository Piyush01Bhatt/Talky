import React, { useContext, useEffect, useState } from 'react'
import io from "socket.io-client";
import { useStateValue } from '../../StateProvider';
import axios from "../../helpers/axios"

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({ id, user, children }) {
    const [socket, setSocket] = useState()
    const [state, dispatch] = useStateValue()

    useEffect(() => {
        console.log('SocketProvider')
        const newSocket = io(
            "http://0.0.0.0:8001",
            { query: { id } }
        );
        setSocket(newSocket)

        newSocket.on("received-friend-request", (requestInfo) => {
            dispatch({
                type: 'ADD_REQUEST',
                item: {
                    sentUserName: requestInfo.from,
                    fo_id: requestInfo.id,
                    sentUserStatus: requestInfo.status
                }
            })
        })

        newSocket.on("accepted-request", (acceptedInfo) => {
            const item = {}
            item[acceptedInfo.friendId] = {
                name: acceptedInfo.name,
                status: acceptedInfo.status,
                messages: []
            }
            dispatch({
                item,
                type: 'ADD_ROOM'
            })
        })

        newSocket.on("received-message", (message) => {
            /*state.recent_rooms[message.from_id].messages.push({
                from_name: message.from_name,
                to_name: message.to_name,
                message: message.message,
                timestamp: message.timestamp
            })*/
            dispatch({
                type: "ADD_RECEIVED_MESSAGE",
                item: {
                    from_id: message.from_id,
                    from_name: message.from_name,
                    to_name: message.to_name,
                    message: message.message,
                    timestamp: message.timestamp
                }
            })
        });

        dispatch({
            type: 'SET_USER',
            item: user
        })

        try {
            const query = `/friends/get_requests/${user._id}/${1}/${30}`
            axios.get(query)
                .then((res) => {
                    dispatch({
                        type: 'ADD_REQUESTS',
                        item: res.data.data
                    })
                })
        } catch (err) {
            console.log(err)
        }


        return () => newSocket.close()
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}