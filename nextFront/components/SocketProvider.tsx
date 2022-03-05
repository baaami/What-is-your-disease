import React, { useEffect, createContext } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { socketInit } from 'store/socket'
import socketIOClient from 'socket.io-client'
import { currentUserInfo } from 'store/userInfo'

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocketData] = useRecoilState(socketInit)
  const [userInfo] = useRecoilState(currentUserInfo)

  useEffect(() => {
    console.log('소켓커넥션실ㄹ행')
    const socketConnection = socketIOClient('http://localhost:4000')
    setSocketData(socketConnection)

    return () => {
      if (socket) {
        socket.emit('disconnecton')
      }
    }
  }, [])

  useEffect(() => {
    console.log('유저인포가바뀜')
    if (socket) {
      if (userInfo._id !== '') {
        socket.emit('login', {
          user: {
            id: userInfo._id,
            nickname: userInfo.info.nickname,
          },
        })
      } else {
        if (socket.connected) {
          socket.emit('disconnection')
        }
      }
    }
  }, [userInfo])

  // useEffect(() => {
  //   // socket.socket.connect()
  //   console.log(socketD.socket.connected)
  // }, [socket])

  return <>{children}</>
}

export default SocketProvider
