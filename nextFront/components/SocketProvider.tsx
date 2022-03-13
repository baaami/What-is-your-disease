import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { socketInit } from 'store/socket'
import socketIOClient from 'socket.io-client'
import { currentUserInfo } from 'store/userInfo'
import { BASE_URL } from 'shared/api_constant'
const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocketData] = useRecoilState(socketInit)
  const [is_socket_login, setIsSocketLogin] = useState(false)
  const [userInfo] = useRecoilState(currentUserInfo)

  useEffect(() => {
    const socketConnection = socketIOClient(`${BASE_URL}`)
    setSocketData(socketConnection)

    return () => {
      if (socket) {
        socket.emit('disconnecton')
      }
    }
  }, [])

  useEffect(() => {
    console.log(userInfo._id)
    if (socket) {
      if (userInfo._id !== '' && !is_socket_login) {
        socket.emit('login', {
          user: {
            id: userInfo._id,
            nickname: userInfo.info.nickname,
          },
        })
        setIsSocketLogin(true)
      } else if (is_socket_login && userInfo._id === '') {
        if (socket.connected) {
          console.log('이 if문이 실행')
          socket.emit('disconnecton')
        }
        setIsSocketLogin(false)
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
