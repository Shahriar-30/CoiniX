import React, { useState, useEffect } from 'react';
import { FaDollarSign } from "react-icons/fa";
import { db } from '../../../../FireBase';
import Loading from '../../PopUp/Loading/Loading';
import { onSnapshot, collection, where, query } from 'firebase/firestore';
import { useData } from '../../context/Data';
import './Amount.css';




function Amount() {
  const [userData, setUserData] = useState(null);
  const { user, wow } = useData();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            // console.log('User Data:', userDataArray);
           
  
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
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className='amount'>
        <div className='amount_total'>
          <p>Total Amount -</p>
        </div>
        <div className='money'>
          <FaDollarSign className='doller_icon' />
          <p>{userData ? userData.amount : amount}</p>
        </div>
      </div>
    </>
  );
}

export default Amount;
