import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from '../hooks/useAuth'
import { AndInterFace, AuthContextType, ChangeProfile, InitStateUser, MoreUser, OrInterFace, SigninUser, UpDateUser, UserAccessToken, UserSign, DataSign } from '../models/interface-auth'

import Hide from '../assets/icon/hidden.png'
import Show from '../assets/icon/show.png'

export const Signup: React.FC = () => {
  const navigate = useNavigate()
  const auth: any = useAuth()
  const [userInfo, setUserInfo] = useState<any>()
  const [passwordShow, setPasswordShow] = useState<boolean>(false)

  const handleOnChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [name]: e.target.value,
    })
  }

  const togglePassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setPasswordShow(!passwordShow)
    navigate('/signup')
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const data: DataSign = { email: userInfo.email, password: userInfo.password }
    auth.signup(data, () => {
      navigate('/signin')
      toast(`Đăng ký thành công, vui lòng đăng nhập`)
    })
  }

  return (
    <>
      <div className="mt-10 mb-10 text-primary">
        <form className="box-border border-2 border-orange-200 w-3/5 ml-auto mr-auto">
          <div className="mt-7">
            <div className="text-center text-2xl font-bold">
              <p>Vui Lòng Nhập Thông Tin</p>
            </div>
          </div>
          <div className="box-border border-2 w-96 ml-auto mr-auto mt-10">
            <label>
              <input
                onChange={handleOnChange('email')}
                name="email"
                className="w-full"
                type="text"
                placeholder="Tên đăng nhập(email)..."
              />
            </label>
          </div>
          <div className="box-border border-2 w-96 ml-auto mr-auto mt-10">
            <label>
              <input
                onChange={handleOnChange('password')}
                name="password"
                className="w-10/12"
                placeholder="Mật khẩu..."
                type={passwordShow ? 'text' : 'password'}
              />
              <button
                className="w-5 ml-8"
                onClick={togglePassword}
              >
                {!passwordShow ? (
                  <img src={Hide} alt="" />
                ) : (
                  <img src={Show} alt="" />
                )}
              </button>
            </label>
          </div>

          <div className="w-40 ml-auto mr-auto mt-10 mb-10">
            <button
              className="box-border border-2 border-orange-200 w-36 h-11 font-bold text-xl hover:bg-orange-600 hover:text-white"
              onClick={handleSubmit}
            >
              Đăng Ký
            </button>
          </div>

          <div className="text-center underline mb-10">
            <Link to="/signin">Bạn đã có tài khoản? Đăng nhập</Link>
          </div>
        </form>
      </div>
    </>
  )
}
