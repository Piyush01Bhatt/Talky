import React, {useContext, useEffect, useState} from 'react'
import io from "socket.io-client";
import { useStateValue } from '../../StateProvider';

const SocketContext = React.createContext()

export function useSocket() {
    return useContext(SocketContext)
}

export function SocketProvider({id, user, children}) {
    const [socket, setSocket] = useState()
    const [state,dispatch] = useStateValue()

    useEffect(()=>{
        const newSocket = io(
            "http://localhost:8001", 
            { query: { id } }
        );
        setSocket(newSocket)

        dispatch({
            type:'SET_USER',
            item:user
        })

        return () => newSocket.close()
    }, [id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}