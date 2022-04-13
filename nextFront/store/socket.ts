import { atom } from 'recoil'
import { Socket } from 'socket.io-client'
export const socketInit = atom<Socket>({
  key: 'socketData',
  default: {} as Socket,
  dangerouslyAllowMutability: true,
})
