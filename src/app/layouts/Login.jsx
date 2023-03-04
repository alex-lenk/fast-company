import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import LoginForm from '../components/ui/LoginForm'
import RegisterForm from '../components/ui/RegisterForm'

const Login = () => {
  const {type} = useParams()
  const [formType, setFormType] = useState(
    type === 'register' ? type : 'login'
  )
  const toggleFormType = () => {
    setFormType(prevState =>
      prevState === 'register' ? 'login' : 'register'
    )
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === 'register' ? (
            <>
              <h3 className="mb-3">Регистрация</h3>
              <RegisterForm/>
              <p>
                У вас есть аккаунт? &nbsp;
                <span className="link-primary" role="button" onClick={toggleFormType}>
                  Войти
                </span>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-3">Вход</h3>
              <LoginForm/>
              <p>
                У вас нет аккаунт? &nbsp;
                <span className="link-primary" role="button" onClick={toggleFormType}>
                  Зарегистрироваться
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
