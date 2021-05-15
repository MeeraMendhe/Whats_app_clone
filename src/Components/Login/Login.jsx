import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../../firebase'
import { actionTypes } from '../Reducer/reducer'
import { useStateValue } from '../Reducer/StateProvider'
import "./Login.css"
const Login = () => {

    const [{},dispatch]=useStateValue()

    const signIn=()=>
    {
       auth.signInWithPopup(provider).then(result=>
        {
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user
            })
        }
       ).catch(error=>alert(error.message))
    }
  return (
      <div className="login">
          <div className="login_container">
              <img src="https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png" alt=""/>
              <div className="login_text">
                  <h1>Sign In to WhatsApp</h1>
              </div>
              <Button onClick={signIn}>Sign In with Google</Button>
          </div>
      </div>
  )
}

export default Login
