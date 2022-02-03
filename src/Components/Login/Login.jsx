import { useRef, useState } from "react/cjs/react.development";
import { Redirect } from "react-router-dom";

function Login() {
  const [checker, setChecker] = useState("false");
  const error = useRef(null);
  const name = useRef(null);
  const password = useRef(null);

  const render = (evt) => {
    evt.preventDefault();
    let obj = {
      login: name.current.value.trim(),
      password: password.current.value.trim(),
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    fetch("https://resback.herokuapp.com/login", requestOptions)
      .then((data) => data.json())
      .then((m) => {
        if (m === "false") {
          error.current.textContent = "Invalid login or password";
        } else {
          window.localStorage.setItem("token", m);
          setChecker("true");
        }
      });
    name.current.value = null;
    password.current.value = null;
  };
  if (checker === "true") {
    return <Redirect to="/" />;
  }
  return (
    <>
      <form className="login" onSubmit={render}>
        <div className="container">
          <h1 className="LoginHeader">LOGIN ADMIMN</h1>
          <div className="labelWrapper">
            <div className="loginWrapper">
              <span>Login</span>
              <input type="text" ref={name} />
            </div>
            <div className="passwordWrapper">
              <span>Password</span>
              <input type="password" ref={password} />
            </div>
            <button className="subBtn">SUBMIT</button>
          </div>
        </div>
        <div className="checkError" ref={error}></div>
      </form>
    </>
  );
}

export default Login;
