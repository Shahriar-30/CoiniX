import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useData } from '../../context/Data';
import { AiTwotoneMail } from "react-icons/ai";
import "./ForgetPassword.css"

function ChangePassword(props) {

    let { forgetPassword } = useData()

    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [handelPop, setHandelPop] = useState(false);

    let forget_fun = () => {
        if (email == "") {
            setEmailErr("Fild can't be empty");
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailErr("Enter a valid Email");
        } else {
            forgetPassword(email)
                .then(() => {
                    setHandelPop(true);
                })
        }
    }

    return (
        <>
            <div className='forget_box'>
                {
                    !handelPop ?
                        <div className='forget_it'>
                            <h5>
                                Change Password
                            </h5>
                            <input type="text" className='input' placeholder='Enter Email'
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailErr("")
                                }}
                            />
                            <p className='error'>{emailErr}</p>
                            <div className='for_btn'>
                                <Button onClick={forget_fun}>Submit</Button>
                                <Button variant='danger'
                                    onClick={() => {
                                        props.value.format(false);
                                    }}
                                >Close</Button>
                            </div>
                        </div>
                        :
                        <div className='forget_it for_emai_check'>
                            <AiTwotoneMail className='for_email_icon' />
                            <h1>
                                Check your Email
                            </h1>
                            <Button variant='danger'
                                onClick={() => {
                                    props.value.format(false);
                                }}
                            >Close</Button>
                        </div>

                }


            </div>
        </>
    )
}

export default ChangePassword