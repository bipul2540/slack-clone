import React from "react";
import "./../styleCss/Login.css";
import { auth, provider } from "./../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../Reducer";

function Login() {
  const [state, dispatch] = useStateValue();

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt=""
        />
        <h1>sign in to Group Study</h1>
        <p>cleaverProgrammer, slack</p>
        <button onClick={signIn}>Sign In with google</button>
      </div>
    </div>
  );
}

export default Login;
