import React, { useState } from 'react';
import { db } from '../../../../FireBase';
import { setDoc, doc } from 'firebase/firestore';
import { useData } from '../../context/Data';
import { Button } from 'react-bootstrap';

function TwoHun(props) {
    const { user, userData, minusAmount } = useData();
    const [moneyLoad, setMoneyLoad] = useState(false);

    const close = () => {
        return props.value.two(false);
    };

    const handleTwoHun = async () => {
        if (userData === null || userData.amount < 200) {
            alert("Invalid amount, make a deposit.");
        } else {
            const openDocRef = doc(db, 'open', user.email);

            try {
                setMoneyLoad(true);
                await minusAmount(200); // Subtract $200 for investment
                await setDoc(openDocRef, {
                    email: user.email, two: true
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
                        Invest <span>$200</span> to get <br /> <span>$13</span> Every Day
                    </p>
                    <div className='money_btn'>
                        <Button onClick={handleTwoHun}>
                            {moneyLoad ? "Loading..." : "$200"}
                        </Button>
                        <Button onClick={close}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TwoHun;
