// Admin.js
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { db } from '../../../FireBase';
import { getDocs, collection, addDoc, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import Loading from '../PopUp/Loading/Loading';
import { useData } from '../context/Data';
import './Admin.css';

function Admin() {
  const { setWow } = useData();
  const [depo, setDepo] = useState([]);
  const [draw, setDraw] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleConfirm = async (item) => {
    try {
      const userEmail = item.data().email;

      const userAmountQuery = query(collection(db, 'user_amount_updates'), where('email', '==', userEmail));
      const userAmountSnapshot = await getDocs(userAmountQuery);

      if (userAmountSnapshot.empty) {
        await addDoc(collection(db, 'user_amount_updates'), {
          email: userEmail,
          amount: item.data().amount,
        });
      } else {
        const userAmountDoc = userAmountSnapshot.docs[0];
        await updateDoc(doc(db, 'user_amount_updates', userAmountDoc.id), {
          amount: userAmountDoc.data().amount + item.data().amount,
        });
      }

      await deleteDoc(doc(db, 'request', item.id));

      console.log('Request confirmed and user amount updated successfully');


      alert("Confirmed");
    } catch (error) {
      alert('error');
    }
  };

  const handelDrawSubmit = async (item) => {
    try {
      const userEmail = item.data().email;

      const userAmountQuery = query(collection(db, 'user_amount_updates'), where('email', '==', userEmail));
      const userAmountSnapshot = await getDocs(userAmountQuery);

      if (userAmountSnapshot.empty) {
        await addDoc(collection(db, 'user_amount_updates'), {
          email: userEmail,
          amount: item.data().amount,
        });
      } else {
        const userAmountDoc = userAmountSnapshot.docs[0];
        await updateDoc(doc(db, 'user_amount_updates', userAmountDoc.id), {
          amount: userAmountDoc.data().amount - item.data().amount,
        });
      }

      await deleteDoc(doc(db, 'draw', item.id));

      console.log('Request confirmed and user amount updated successfully');


      alert("Confirmed");
    } catch (error) {
      alert('error');
    }
  }


  
  const handleCancel = async (item) => {
    try {
      // Delete the request from the 'request' collection
      await deleteDoc(doc(db, 'request', item.id));

      console.log('Request canceled and deleted successfully');

      // Call setWow or any other function to update the context data

      alert("Cancel");
    } catch (error) {
      alert('error');
    }
  };

  const handelDrawCancle = async (item) => {
    try {
      await deleteDoc(doc(db, 'draw', item.id));

      console.log('Request canceled and deleted successfully');
      alert("Cancel");

    } catch (error) {
      alert('error');
    }
  }


  useEffect(() => {
    try {
      const querySnapshot = getDocs(collection(db, 'request'));
      querySnapshot.then((doc) => {
        setDepo(doc.docs);
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      const querySnapshot = getDocs(collection(db, 'draw'));
      querySnapshot.then((doc) => {
        setDraw(doc.docs);
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className='contai'>

        <div className='deposit_sys'>
          <h2>Deposit Request</h2>
          <div className='deposit_items'>
            {depo.map((item) => (
              <div className='deposit_item' key={item.id}>
                {setWow(item)}
                <h3>{item.data().email}</h3>
                <p>{item.data().trust}</p>
                <h4>${item.data().amount}</h4>
                <div className='depo_item_btn'>
                  <Button onClick={() => handleConfirm(item)}>Confirm</Button>
                  <Button variant='danger' onClick={() => handleCancel(item)}>Cancel</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ... (rest of the component) */}

        <div className='with_sys'>
          <h2>
            WithDraw Request
          </h2>
          <div>
            <div className='with_items'>

              {
                draw.map((item) => (

                  <div className='with_item'>

                    <h3>{item.data().email}</h3>
                    <p>{item.data().trust}</p>
                    <h1>${item.data().amount}</h1>

                    <div className='with_btn'>

                      <Button onClick={() => handelDrawSubmit(item)}>
                        Confirm
                      </Button>
                      <Button variant='danger' onClick={() => handelDrawCancle(item)}>
                        Cancle
                      </Button>
                    </div>

                  </div>

                ))

              }

            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Admin;



