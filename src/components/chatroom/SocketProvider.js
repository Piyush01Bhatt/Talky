import React, {useContext, useEffect, useState} from 'react'
import io from "socket.io-client";
import { useStateValue } from '../../StateProvider';
import axios from "../../helpers/axios"

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({id, user, children}) {
    const [socket, setSocket] = useState()
    const [state, dispatch] = useStateValue()

    useEffect(()=>{
        const newSocket = io(
            "http://0.0.0.0:8001", 
            { query: { id } }
        );
        setSocket(newSocket)
        newSocket.on("received-friend-request", (requestInfo) => {
            console.log('request-received')
            console.log(requestInfo)
            dispatch({
                type:'ADD_REQUEST',
                item:{
                    name:requestInfo.from,
                    id:requestInfo.id,
                    status:requestInfo.status
                }
            })
          })
        dispatch({
            type:'SET_USER',
            item:user
        })
        try{
            const query = `/friends/get_requests/${user._id}/${1}/${30}`
            axios.get(query)
                 .then((res)=>{
                    dispatch({
                        type:'ADD_REQUESTS',
                        item:{
                            name:res.data.data.from,
                            id:requestInfo.id,
                            status:requestInfo.status
                        }
                    })
                 })
        } catch (err) {
            console.log(err)
        }


        return () => newSocket.close()
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}