import React, { useState } from 'react'
import { db } from '../../../../FireBase';
import { setDoc, doc } from 'firebase/firestore';
import { useData } from '../../context/Data';
import { Button } from 'react-bootstrap'

function Three(props) {

    let { user, userData, minusAmount } = useData()
    let [moneyLoad, setMoneyLoad] = useState(false);

    let close = ()=> {
        return props.value.three(false);
    }

    const handelFifty = async () => {
        if (userData === null || userData.amount < 300) {
          alert("Invalid amount, make a deposit.");
        } else {
          const openDocRef = doc(db, 'open', user.email);
      
          try {
            setMoneyLoad(true);
            await minusAmount(300); // Add await here if minusAmount is asynchronous
            await setDoc(openDocRef, {
              email: user.email, three: true
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
                Invest <span>$300</span>  to get <br /> <span>$20</span> Every Day
            </p>
            <div className='money_btn'>

            <Button onClick={handelFifty}>

                            {
                                moneyLoad ?
                                    "Loading..."
                                    :
                                    "$300"
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

export default Three