import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { onSnapshot, collection, where, query, getDocs, getDoc, updateDoc, doc } from 'firebase/firestore';
// import { addDoc } from "firebase/firestore";
import { db } from "../../../FireBase";
import { app } from "../../../FireBase";

let dataContext = createContext(null);

export const useData = () => {
    return useContext(dataContext);
};

export const auth = getAuth(app);

export let DataProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) return setUser(user);
            else setUser(null)
        });

        return () => unsubscribe();
    }, [])

    let isLogedIn = user ? true : false;


    let Register = async (email, password, name) => {
        try {
            const auth = getAuth(app);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(userCredential.user, { displayName: name });

            await auth.currentUser.reload();



            const updatedUser = auth.currentUser;

            return updatedUser;
        } catch (error) {
            throw error;
        }
    };


    let loging = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    }

    let emailVari = async () => {
        await sendEmailVerification(auth.currentUser)
    }

    let forgetPassword = async (email) => {
        await sendPasswordResetEmail(auth, email)
    }

    let logOut = () => {
        setUser(null);
    }

    const [wow, setWow] = useState();


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
                    }, (error) => {
                    });

                    return () => unsubscribe();
                } else {
                }
            } catch (error) {
            }
        };

        fetchData();
    }, [user]); 


    let minusAmount = async (amount) => {
        try {
          const userEmail = user.email;
      
          const userAmountQuery = query(collection(db, 'user_amount_updates'), where('email', '==', userEmail));
          const userAmountSnapshot = await getDocs(userAmountQuery);
      
          if (!userAmountSnapshot.empty) {
            userAmountSnapshot.forEach(async (userAmountDoc) => {
              await updateDoc(doc(db, 'user_amount_updates', userAmountDoc.id), {
                amount: userAmountDoc.data().amount - amount,
              });
              console.log(`Round ${amount}`);
            });
          } else {
            console.log('No matching documents found.');
          }
      
        } catch (error) {
          console.error('Error updating user amount:', error);
        }
      };
      

      let plusAmount = async (amount) => {
        try {
          const userEmail = user.email;
      
          const userAmountQuery = query(collection(db, 'user_amount_updates'), where('email', '==', userEmail));
          const userAmountSnapshot = await getDocs(userAmountQuery);
      
          if (!userAmountSnapshot.empty) {
            userAmountSnapshot.forEach(async (userAmountDoc) => {
              await updateDoc(doc(db, 'user_amount_updates', userAmountDoc.id), {
                amount: userAmountDoc.data().amount + amount,
              });
              console.log(`Round ${amount}`);
            });
          } else {
            console.log('No matching documents found.');
          }
      
        } catch (error) {
          console.error('Error updating user amount:', error);
        }
      };



    let allSys = {
        user,
        isLogedIn,
        Register,
        loging,
        emailVari,
        forgetPassword,
        logOut,
        setWow,
        userData,
        minusAmount,
        plusAmount,
        wow
    }

    return (
        <dataContext.Provider value={allSys}>
            {children}
        </dataContext.Provider>
    )
}