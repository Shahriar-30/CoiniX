import React, { useState } from 'react';
import { db } from '../../../../FireBase';
import { setDoc, doc } from 'firebase/firestore';
import { useData } from '../../context/Data';
import { Button } from 'react-bootstrap';

function Seven(props) {

    const { user, userData, minusAmount } = useData();
    const [moneyLoad, setMoneyLoad] = useState(false);

    let close = () => {
        return props.value.seven(false);
    }


    const handleTwoHun = async () => {
        if (userData === null || userData.amount < 700) {
            alert("Invalid amount, make a deposit.");
        } else {
            const openDocRef = doc(db, 'open', user.email);

            try {
                setMoneyLoad(true);
                await minusAmount(700); // Subtract $200 for investment
                await setDoc(openDocRef, {
                    email: user.email, seven: true
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
                        Invest <span>$700</span>  to get <br /> <span>$52</span> Every Day
                    </p>
                    <div className='money_btn'>

                        <Button onClick={handleTwoHun}>
                            {moneyLoad ? "Loading..." : "$700"}
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

export default Seven