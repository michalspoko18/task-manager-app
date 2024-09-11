import FormApp from "../components/Form";
import "../styles/Login.scss";
import logo from '../assets/logo.svg';

function Login() {
  return (
    <div className="b-login">
      <div className="b-login__inner">
        <div className="b-login__image">
            <a href="/">
                <img src={logo} alt="" />
            </a>
        </div>
        <FormApp route="api/token/" method="login" />
      </div>
    </div>
  );
}

export default Login;
