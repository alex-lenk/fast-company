import React, {useState} from 'react'
import LoginForm from '../components/ui/LoginForm'
import {useParams} from 'react-router-dom'
import RegisterForm from '../components/ui/RegisterForm'

const Login = () => {
  const {type} = useParams()
  const [formType, setFormType] = useState(type === 'register' ? 'register' : 'login')

  const toggleFormType = () => {
    setFormType(prevState => prevState === 'register' ? 'login' : 'register')
  }

  return (
    <div className="pt-5 mb-5 row">
      <div className="col-md-6 offset-3 shadow p-4">
        {
          formType === 'register' ?
          <>
            <h3 className="mb-3">Register</h3>
            <RegisterForm/>
            <p className="mt-3">
              У вас есть аккаунт? &nbsp;
              <span className="link-primary" role="button" onClick={toggleFormType}>Войти</span>
            </p>
          </>
          :
          <>
            <h3 className="mb-3">Login</h3>
            <LoginForm/>
            <p className="mt-3">
              У вас нет аккаунт? &nbsp;
              <a className="link-primary" role="button" onClick={toggleFormType}>Зарегистрироваться</a>
            </p>
          </>
        }
      </div>
    </div>
  )
}

export default Login
