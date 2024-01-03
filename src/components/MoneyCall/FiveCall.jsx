import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { db } from '../../../FireBase';
import { useData } from '../context/Data';
import { serverTimestamp, setDoc, getDoc, doc } from 'firebase/firestore';

const timestampField = 'fiveTimeStamp';

function FiveCall() {

    const { user, plusAmount } = useData();
    const [isDisabled, setIsDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);

    const handleClaim = async () => {
        setIsDisabled(true);
    
        const manageDocRef = doc(db, 'manage', user.email);
    
        try {
          const docSnapshot = await getDoc(manageDocRef);
          plusAmount(36);
    
          const updateData = { [timestampField]: serverTimestamp() };
          const mergeOptions = { merge: true };
    
          if (docSnapshot.exists()) {
            // Document exists, update the specified timestamp field
            await setDoc(manageDocRef, updateData, mergeOptions);
          } else {
            // Document does not exist, create a new one with the specified timestamp field
            await setDoc(manageDocRef, updateData);
          }
        } catch (error) {
          console.error('Error updating/managing document:', error);
        }
      };


      useEffect(() => {
        const fetchTime = async () => {
          const manageDocRef = doc(db, 'manage', user.email);
    
          try {
            const docSnapshot = await getDoc(manageDocRef);
    
            if (docSnapshot.exists()) {
              const timestamp = docSnapshot.data()[timestampField]?.toMillis();
              const currentTime = Date.now();
              const timeDifference = timestamp + 24 * 60 * 60 * 1000 - currentTime;
    
              if (timeDifference > 0) {
                // Calculate remaining time
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
                setRemainingTime(`${hours}:${minutes}:${seconds}`);
                setIsDisabled(true);
              } else {
                // Reset if the time has already passed
                setRemainingTime(null);
                setIsDisabled(false);
              }
            } else {
              // No document found, enable the button
              setIsDisabled(false);
            }
          } catch (error) {
            console.error('Error fetching document:', error);
          }
        };
    
        // Fetch the time initially
        fetchTime();
    
        // Update the time every second
        const intervalId = setInterval(fetchTime, 1000);
    
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
      }, [user.email]);

  return (
    <>
    <div className='call_box center col'>
      <Button onClick={handleClaim} disabled={isDisabled} className='waitingBtn'>
        $36
      </Button>
      {remainingTime ? <p className='waitingTime'>Wait for <br /> {remainingTime}</p> : null}
    </div>
  </>
  )
}

export default FiveCall