import React, { useState } from 'react'
import { useData } from '../../context/Data'
import { db } from '../../../../FireBase';
import { setDoc, doc } from 'firebase/firestore';
import { Button } from 'react-bootstrap'

function Hundi(props) {

    let { user, userData, minusAmount } = useData();
    let [moneyLoad, setMoneyLoad] = useState(false);


    let close = () => {
        return props.value.hun(false);
    }


    const handelHundred = async () => {
        if (userData === null || userData.amount < 100) {
            alert("Invalid amount, make a deposit.");
        } else {
            const openDocRef = doc(db, 'open', user.email);

            try {
                setMoneyLoad(true);
                await minusAmount(100); // Add await here if minusAmount is asynchronous
                await setDoc(openDocRef, {
                    email: user.email, hundred: true
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
                        Invest <span>$100</span>  to get <br /> <span>$6</span> Every Day
                    </p>
                    <div className='money_btn'>

                        <Button onClick={handelHundred}>
                            {
                                moneyLoad ?
                                    "Loading..."
                                    :
                                    "$100"

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

export default Hundi