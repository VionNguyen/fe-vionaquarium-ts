import React, { useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'

import { postAuth, putAuth, getAuth } from '../services/index'
import { clear, loadFromStorage, saveToStorage } from '../common/utils/index'
import { AuthContextType, UserSign, ChangeProfile, UserAccessToken, OrInterFace, AndInterFace, MoreUser, SigninUser, UpDateUser, InitStateUser } from '../models/interface-auth'

export const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider({ children } : { children: React.ReactNode }) {
  const [user, setUser] = React.useState<InitStateUser>(loadFromStorage('User'))

  const signup = async (user: UserSign, callback: () => void) => {
    try{
    const data = { email: user.email, password: user.password }
    const params = 1
    const headers = 2
    await postAuth(
      'http://localhost:3000/api/v1/auth/signup',
      data,
      params,
      headers
    )
    callback()
    }
    catch{throw new Error("");
    }
  }

  const signin = async (newUser: InitStateUser , callback: () => void) => {
    try{
      const data = { email: newUser.email, password: newUser.password }
      const params = 1
      const headers = 2
      const response: InitStateUser = await postAuth(
        'http://localhost:3000/api/v1/auth/login',
        data,
        params,
        headers
      )

      setUser({ ...response, email: newUser.email })

      saveToStorage('User', { ...response, email: newUser.email })

      callback()
    }
    catch{throw new Error("");
    }
  }

  const signout = () => {
    setUser({ email: '',
      password: '',
      address1: '',
      address2: '',
      firstName: '',
      isUpDate: false,
      lastName: '',
      username: '',
      access_token: '',
      createdAt: '',
      id: '',
      updateAt: '' })
    clear()
  }

  const changeProfile = async (newUser: ChangeProfile, callback: () => void) => {
    try {
      const data = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        address1: newUser.address1,
        address2: newUser.address2,
        isUpdate: false
      }
      const params = 1
      const headers = 2
      await putAuth('http://localhost:3000/api/v1/user', data, params, headers)
      callback()
    } catch (error) {
      console.log(error)
    }
    
  }

  const getUserInfor = async () => {
    try{
      const params = 1
      const headers = 2
      const response: InitStateUser = await getAuth(
        'http://localhost:3000/api/v1/user',
        params,
        headers
      )
      const dataUser: UpDateUser = loadFromStorage('User')
      const updateDataUser = {
        access_token: dataUser.access_token,
        id: dataUser.id,
        ...response,
      }

      setUser(updateDataUser)
      saveToStorage('User', updateDataUser)
    }
    catch{throw new Error("");
    }
  }

  const isUserLoggedIn = Boolean(user?.access_token)

  const value = {
    signup,
    signin,
    signout,
    changeProfile,
    getUserInfor,
    user,
    isUserLoggedIn,
  }
  
  console.log(AuthContext)
  return <AuthContext.Provider value={{
    signup,
    signin,
    signout,
    changeProfile,
    getUserInfor,
    user,
    isUserLoggedIn,
  }}>{children}</AuthContext.Provider>

}

export function RequireAuth({ children } : {children: React.ReactElement}) {
  const auth = useContext(AuthContext)
  const location = useLocation()

  if (!auth.isUserLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}
