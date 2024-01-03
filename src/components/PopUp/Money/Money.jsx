import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { FcMoneyTransfer } from "react-icons/fc";

function Money(props) {
  return (
    <>
    <div className='wallet center'>
        <div className='wal_box center col'>
        <FcMoneyTransfer className='wal_m'  />
            <p className='wal_thk'>
                Thankyou For Makeing a Wallet Request 
                We Will Update Your Wallet in <span className='wal_hor'>24hr </span> 
                If There is any issue <Link to={"/contactus"}>Contact us</Link>
            </p>
            <p className='wal_issue'>
                if you make any fake wallet Request or wrong input we will <span>Cencel</span> your request.
            </p>
            <Button className='wal_btn' onClick={()=> props.value.moneyPop(false)}>Close</Button>
        </div>
    </div>
    </>
  )
}

export default Money