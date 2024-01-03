import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import Button from 'react-bootstrap/Button';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useData } from '../context/Data';
import { useNavigate } from 'react-router-dom';
import EmailVari from '../PopUp/Email/EmailVari';
import "./SingUp.css"

function SingUp() {

  let { Register, emailVari, user, isLogedIn } = useData();
  let navigate = useNavigate();

  const [eye, setEye] = useState(false);
  const [next, setNext] = useState(false);
  const [load, setLoad] = useState(false);

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [emailDone, setEmailDone] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordDone, setPasswordDone] = useState(false);

  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState("");
  const [nameDone, setNameDone] = useState(false);

  useEffect(() => {
    if(isLogedIn){
      navigate("/");
    }
  }, [isLogedIn, navigate])
  

  let handelNameCondi = () => {
    if (name.trim() == "") {
      setNameErr("Fild can't be empty");
    } else {
      setNameDone(true);
    }
  }


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
    } else if (!/^(?=.*[0-9])(?=.*\W)(?!.* ).{8,16}$/.test(password)) {
      setPasswordErr("Enter a strong password");
    } else {
      setPasswordErr("");
      setPasswordDone(true);
    }
  }


  let logIn = () => {
    handelNameCondi();
    handelEmailCondi();
    handelPasswordCondi();
  }



  useEffect(() => {
    // Check if all registration conditions are met
    if (emailDone && nameDone && passwordDone) {
      // Set loading state
      setLoad(true);
  
      // Perform registration
      Register(email, password, name)
        .then(async () => {
          // Perform actions after successful registration
          setNext(true);
          emailVari();
          setEmail("");
          setName("");
          setPassword("");
  
          // Add user information to Firestore
  
          // Navigate after a delay
          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
        .catch((error) => {
          // Handle registration errors
          if (error.code === "auth/email-already-in-use") {
            setEmailErr("Email is already in use");
          } else if (error.code === "auth/network-request-failed") {
            alert("Network request failed. Please check your internet connection and try again later.");
          }
        })
        .finally(() => {
          // Reset states and loading
          setLoad(false);
          setEmailDone(false);
          setNameDone(false);
          setPasswordDone(false);
          setEye(false);
        });
    }
  }, [emailDone, nameDone, passwordDone, Register]);
  


  return (
    <>
      {next && <EmailVari />}
      <div className='container '>
        <div className='box'>

          <div className='Brand_box'>
            <img src="CoiniX.svg" alt="img" className='img' />
            <p className='sub_text'>
              Register to Continue
            </p>
          </div>

          <div className='form'>

            {/* ===== user name ===== */}
            <input type="text" className='input' value={name} placeholder='Full name'
              onChange={(e) => {
                setName(e.target.value);
                setNameErr("");
              }}
            />
            {
              nameErr ?
                <p className='error emailerr'>{nameErr}</p>
                :
                ""
            }

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
            </div>

            {/* ===== email ===== */}
            <Button className='acc_btn' onClick={logIn}>
              {
                load ?
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
                  "Register Now"

              }
            </Button>
          </div>

          <div className='next_acc_box'>
            <p>
              Already have an account!
            </p>
            <Link to='/login' className='next_acc'>
              LogIn Now
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default SingUp