import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
// import { FaImage } from "react-icons/fa6"
import NavBar from '../NavBar/NavBar'
import { ThreeDots } from 'react-loader-spinner'
import Loading from '../../PopUp/Loading/Loading'
import { db } from '../../../../FireBase'
import { collection, addDoc } from "firebase/firestore";
import { query, where, onSnapshot } from 'firebase/firestore';
import { useData } from '../../context/Data'
import Money from '../../PopUp/Money/Money'
import '../Deposit/Deposit.css'

function WithDraw() {

  const { user } = useData();
  
  const [Confrom, setConfrom] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(false);

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



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.email) {


          const q = query(collection(db, 'user_amount_updates'), where('email', '==', user.email));
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userDataArray = [];
            querySnapshot.forEach((doc) => {
              userDataArray.push(doc.data());
            });
            console.log('User Data:', userDataArray);


            setUserData(userDataArray.length > 0 ? userDataArray[0] : null);
            setLoading(false);
          }, (error) => {
            setError(error);
            setLoading(false);
          });

          return () => unsubscribe();
        } else {
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);



  if (loading) {
    // Loading state while authentication state is being determined
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  let handelTrustCondi = () => {
    if (trust == "") {
      setTrustErr("Fild can't be empty");
    } else {
      setTrustDone(true);
    }
  }

  let handleAmountCondi = () => {
    if (amount == "") {
      setAmountErr("Fild can't be empty");
    }else if(!userData ||userData.amount < amount){
      setAmountErr("Invalid Amount")
    } else if (isNaN(amount)) {
      setAmountErr("Only Number Input");
    } else if (amount < 20) {
      setAmountErr("Minimum amount $20")
    } else {
      setAmountDone(true);
    }
  }




  const makeDepo = () => {
    handelTrustCondi();
    handleAmountCondi();

    if (trustDone && amountDone) {
      setLoader(true);
      const docRef = addDoc(collection(db, "draw"), {
        email: user.email,
        trust,
        amount,
      })
        .then(() => {
          setConfrom(true);
          setTrust("");
          setAmount("");
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



  let moneyPop = (e)=> {
    setConfrom(e);
  }



  return (
    <>
    {
      Confrom ?
      <Money value={{moneyPop}} />
      :
      ""
    }
      <NavBar />
      <div className='depo'>
        <h2 className='depo_h2'>
          Withdraw By
        </h2>

        <div className='depo_wallet'>
          <p>Trc 20</p>
        </div>

        
        <p className='depo_mes'>
            After, making a wallet request we will sent the amount to your Trc 20 Id in 24 hour
        </p>

        <div className='center col depo_box'>

          <div>
            <p className='inputLable'>
              Your Trc 20 Id
            </p>
            <input type="text" placeholder='Enter Trc 20 Id' className='input' value={trust}
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
              Amount You Withdraw
            </p>
            <input type="text" placeholder='Enter Amount' className='input' value={amount}
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

          <Button className='depo_btn' onClick={makeDepo}  >
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
                "Make a Withdraw"
            }
          </Button>
          <p className='depo_p'>
            Double Click to Confirm
          </p>

        </div>

      </div>


    </>
  )
}

export default WithDraw
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