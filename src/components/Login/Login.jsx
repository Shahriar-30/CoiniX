import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useData } from '../context/Data';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import ForgetPassword from '../PopUp/ForGet/ForgetPassword';
import "./Login.css"

function Login() {

  let { loging, user, isLogedIn } = useData();
  let navigate = useNavigate();

  const [forget, setForget] = useState(false);

  const [eye, setEye] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [loader, setLoader] = useState(false);

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [emailDone, setEmailDone] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordDone, setPasswordDone] = useState(false);

  useEffect(() => {
    if(isLogedIn){
      navigate("/");
    }
  }, [isLogedIn, navigate])

  let handelEmailCondi = () => {
    if (email == "") {
      setEmailErr("Fild can't be empty");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailErr("Enter a valid Email");
    } else {
      setEmailErr("");
      setEmailDone(true);
    }
  }

  let handelPasswordCondi = () => {
    if (password == "") {
      setPasswordErr("Fild can't be empty")
    } else {
      setPasswordErr("");
      setPasswordDone(true);
    }
  }


  let logIn = () => {
    handelEmailCondi();
    handelPasswordCondi();
  }

  let forget_it = () => {
    setForget(true);
  }

  let format = (e)=> {
    setForget(e);
  }

  useEffect(() => {
    if (emailDone, passwordDone) {
      setLoader(true);
      loging(email, password)
        .then(() => {
          navigate("/")
        })
        .catch((err) => {
          setWrong(true);
        })
        .finally(() => {
          setLoader(false);
          setEmailDone(false);
          setPasswordDone(false);
        })
    }
  }, [emailDone, passwordDone, loging])



  return (
    <>
      {
        forget ?
          <ForgetPassword value={{format}}  />
          :
          ""
      }
      <div className='container '>
        <div className='box'>

          <div className='Brand_box'>
            <img src="CoiniX.svg" alt="img" className='img' />
            <p className='sub_text'>
              LogIn to Continue
            </p>
          </div>

          {
            wrong ?
              <div className='block'>
                <p>
                  Something went wrong. Try again <br /> or <br />
                  <Link to={"/register"} className='new_acc' >
                    Create an Account
                  </Link>
                </p>
              </div>
              :
              ""
          }

          <div className='form'>

            {/* ===== email ===== */}

            <input type="text" className='input' value={email} placeholder='Enter Email'
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailErr(false);
              }}
            />
            {
              emailErr ?
                <p className='error emailerr'>{emailErr}</p>
                :
                ""
            }


            {/* ===== password ===== */}
            <div>
              <div className='pass_box'>
                <input type={eye ? "text" : "password"} className='input pass' value={password} placeholder='Enter Password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordErr("");
                  }}
                />
                <div className='pass_eye_box'>
                  {eye ? <FaEye className='pass_eye' onClick={() => setEye(false)} /> : <FaEyeSlash className='pass_eye' onClick={() => setEye(true)} />}


                </div>
              </div>
              {
                passwordErr ?
                  <p className='error'>{passwordErr}</p>
                  :
                  ""
              }
              <p className='forget' onClick={forget_it}>
                Forget Password?
              </p>
            </div>

            {/* ===== btn ===== */}
            <Button className='acc_btn' onClick={logIn}>
              {
                loader ?
                  <ThreeDots
                    visible={true}
                    height="20"
                    width="50"
                    color="#fff"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                  :
                  "Log In"
              }
            </Button>
          </div>

          <div className='next_acc_box'>
            <p>
              Don't have a account!
            </p>
            <Link to='/register' className='next_acc'>
              Register Now
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login