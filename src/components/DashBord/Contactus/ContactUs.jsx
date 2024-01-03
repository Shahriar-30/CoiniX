import React from 'react'
import { FcOnlineSupport } from "react-icons/fc"
import { FaTelegram } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import NavBar from "../NavBar/NavBar"
import { useNavigate } from 'react-router-dom';
import './ContactUs.css'

function ContactUs() {

    let navigate = useNavigate();

    let telegram = ()=> {
        navigate("/");
    }

    return (
        <>
            <NavBar />
            <div className=' center col support gap '>
                <div>
                    <FcOnlineSupport className='support_img' />
                </div>
                <div>
                    <p className='support_text'>
                        If there any problem
                        Fell Free To Contact Us on Telegram
                    </p>
                    <Button className='support_btn' onClick={telegram}>
                        <FaTelegram className='support_tele' />
                        On Telegram
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ContactUs