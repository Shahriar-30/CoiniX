import React, { useState, useEffect, useCallback } from 'react'
import { Button } from 'react-bootstrap'
// import { FaImage } from "react-icons/fa6"
import { ThreeDots } from 'react-loader-spinner'
import NavBar from '../NavBar/NavBar'
import Loading from '../../PopUp/Loading/Loading'
import { useData } from '../../context/Data'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../../../FireBase'
import Money from '../../PopUp/Money/Money'
import { IoCopy } from "react-icons/io5";
import "./Deposit.css"

function Deposit() {

  const [trustId, setTrustId] = useState("TGcGp4trfMUe9LPiDYXg1T4JUsAL3Tj6hs");

  const { user } = useData();

  const [Confrom, setConfrom] = useState(false);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(false);
  const [loader, setLoader] = useState(false);


  const [trust, setTrust] = useState("");
  const [trustErr, setTrustErr] = useState("");
  const [trustDone, setTrustDone] = useState(false);

  const [amount, setAmount] = useState("");
  const [amountErr, setAmountErr] = useState("");
  const [amountDone, setAmountDone] = useState(false);



  useEffect(() => {
    if (!user) {
      // User is not loaded yet, show loading state
      setLoading(true);
      return;
    }

    // User is loaded, set loading to false
    setLoading(false);

    // Set the verified ID status
    setId(user.emailVerified);
  }, [user]);

  if (loading) {
    // Loading state while authentication state is being determined
    return <Loading />;
  }

  const handleTrustCondition = () => {
    if (trust === "") {
      setTrustErr("Field can't be empty");
    } else {
      setTrustDone(true);
    }
  };

  const handleAmountCondition = () => {
    if (amount === "") {
      setAmountErr("Field can't be empty");
    } else if (isNaN(amount)) {
      setAmountErr("Only Number Input");
    } else if (amount < 50) {
      setAmountErr("Minimum amount $50");
    } else {
      setAmountDone(true);
    }
  };

  const makeDepo = () => {
    handleTrustCondition();
    handleAmountCondition();

    if (trustDone && amountDone) {
      setLoader(true);
      const docRef = addDoc(collection(db, "request"), {
        email: user.email,
        trust,
        amount: parseInt(amount),
      })
        .then(() => {
          setTrust("");
          setAmount("");
          setConfrom(true);
        })
        .catch((err) => {
          console.log("error deop", err);
        })
        .finally(() => {
          setTrustDone(false);
          setAmountDone(false);
          setLoader(false);
        });
    }
  }



  let moneyPop = (e) => {
    setConfrom(e);
  }


  const handleCopyClick = () => {
    const copyText = document.getElementById('trustIdText');
    copyText.select();
    document.execCommand('copy');
    // You can provide some visual feedback here (e.g., show a tooltip or change the button text)
  };



  return (
    <>
      {
        Confrom ?
          <Money value={{ moneyPop }} />
          :
          ""
      }

      <NavBar />

      <div className='depo'>
        <h2 className='depo_h2'>
          Deposit By
        </h2>
        <div className='depo_wallet'>
          <p>Trc 20</p>
        </div>

        <p className='depo_mes'>
          Before, making a wallet request make sure you sent the amount to Trc 20
        </p>

        <div className='center col depo_box'>

          <div>
            <p className='inputLable'>
              Our Trc 20 Id 
            </p>
            <div className='make_box center' onClick={handleCopyClick}>
              <input
                id="trustIdText"
                type="text"
                value={trustId}
                readOnly
                className='make_id'
              />
              <IoCopy className='make_ic' />
            </div>
          </div>

          <div>
            <p className='inputLable'>
              Your Trc 20 Id
            </p>
            <input type="text" placeholder='Enter Trc 20 Id' value={trust} className='input'
              onChange={(e) => {
                setTrust(e.target.value);
                setTrustErr("");
              }}
            />
            {
              trustErr ?
                <p className='error'>{trustErr}</p>
                :
                ""
            }

          </div>

          <div>
            <p className='inputLable'>
              Amount You Deposit
            </p>
            <input type="text" placeholder='Enter Amount' value={amount} className='input'
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountErr("");
              }}
            />
            {
              amountErr ?
                <p className='error'>{amountErr}</p>
                :
                ""
            }
          </div>

          <Button className='depo_btn' onClick={makeDepo} >
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
                "Make a Deposit"
            }

          </Button>
          <p className='depo_p'>
            Double Click to Confirm
          </p>

        </div>

      </div>

      {/* <div className='depo_item_box'>
        <div className='depo_item'>
          <div className='item_net'>
            Amount
            <span className='item_amount'>
              $33
            </span>
          </div>
          <div className='pending'>
            pending...
          </div>
        </div>
        <div className='depo_item'>
          <div className='item_net'>
            Amount
            <span className='item_amount'>
              $33
            </span>
          </div>
          <div className='close'>
            Cancel
          </div>
        </div>
        <div className='depo_item'>
          <div className='item_net'>
            Amount
            <span className='item_amount'>
              $33
            </span>
          </div>
          <div className='approve'>
            Completed
          </div>
        </div>
      </div> */}

    </>
  )
}

export default Deposit