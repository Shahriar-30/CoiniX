import React, { useState } from 'react'
import { db } from '../../../../FireBase';
import { setDoc, doc } from 'firebase/firestore';
import { useData } from '../../context/Data';
import { Button } from 'react-bootstrap'

function Fifty(props) {

    let { user, userData, minusAmount } = useData()
    let [moneyLoad, setMoneyLoad] = useState(false);

    let close = () => {
        return props.value.fif(false);
    }

    const handelFifty = async () => {
        if (userData === null || userData.amount < 50) {
          alert("Invalid amount, make a deposit.");
        } else {
          const openDocRef = doc(db, 'open', user.email);
      
          try {
            setMoneyLoad(true);
            await minusAmount(50); // Add await here if minusAmount is asynchronous
            await setDoc(openDocRef, {
              email: user.email, fifty: true
            }, { merge: true });
      
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } catch (error) {
            console.error('Error updating/opening document:', error);
          } finally {
            setMoneyLoad(false);
          }
        }
      };
      

    return (
        <>
            <div className='money_box'>
                <div className='money_m'>
                    <p>
                        Invest <span>$50</span>  to get <br /> <span>$2.5</span> Every Day
                    </p>
                    <div className='money_btn'>

                        <Button onClick={handelFifty}>

                            {
                                moneyLoad ?
                                    "Loading..."
                                    :
                                    "$50"
                            }
                        </Button>
                        <Button onClick={close}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Fifty