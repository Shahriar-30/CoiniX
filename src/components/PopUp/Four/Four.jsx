import React, { useState } from 'react';
import { db } from '../../../../FireBase';
import { setDoc, doc } from 'firebase/firestore';
import { useData } from '../../context/Data';
import { Button } from 'react-bootstrap';

function Four(props) {

    const { user, userData, minusAmount } = useData();
    const [moneyLoad, setMoneyLoad] = useState(false);


    let close = () => {
        return props.value.four(false);
    }

    const handleTwoHun = async () => {
        if (userData === null || userData.amount < 400) {
            alert("Invalid amount, make a deposit.");
        } else {
            const openDocRef = doc(db, 'open', user.email);

            try {
                setMoneyLoad(true);
                await minusAmount(400); // Subtract $200 for investment
                await setDoc(openDocRef, {
                    email: user.email, four: true
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
                        Invest <span>$400</span>  to get <br /> <span>$25</span> Every Day
                    </p>
                    <div className='money_btn'>

                        <Button onClick={handleTwoHun}>
                            {moneyLoad ? "Loading..." : "$400"}
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

export default Four