import React, { useState, useEffect } from 'react'
import { FaLock } from "react-icons/fa"
import NavBar from '../NavBar/NavBar'
import Fifty from '../../PopUp/Fifty/Fifty'
import Hundi from '../../PopUp/Hund/Hund'
import TwoHun from '../../PopUp/TwoHun/TwoHun'
import Three from '../../PopUp/Three/Three'
import Four from '../../PopUp/Four/Four'
import Five from '../../PopUp/Five/Five'
import Six from '../../PopUp/six/Six'
import Seven from '../../PopUp/Seven/Seven'
import Eight from '../../PopUp/Eight/Eight'
import Nine from '../../PopUp/Nine/Nine'
import Ten from '../../PopUp/Ten/Ten'

import { db } from '../../../../FireBase'
import { getDoc, doc } from 'firebase/firestore';
import Loading from '../../PopUp/Loading/Loading'
import { useData } from '../../context/Data'
import { useNavigate } from 'react-router-dom'
import FiftyCall from '../../MoneyCall/FiftyCall'
import HundCall from '../../MoneyCall/HundCall'
import './Home.css'
import TwoCall from '../../MoneyCall/TwoCall'
import ThreeCall from '../../MoneyCall/ThreeCall'
import FourCall from '../../MoneyCall/FourCall'
import FiveCall from '../../MoneyCall/FiveCall'
import SixCall from '../../MoneyCall/SixCall'
import SevenCall from '../../MoneyCall/SevenCall'
import EightCall from '../../MoneyCall/EightCall'
import NineCall from '../../MoneyCall/NineCall'
import TenCall from '../../MoneyCall/TenCall'

function Home() {

  let navigate = useNavigate();
  const { user } = useData();
  const [userData, setUserData] = useState(true);

  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(false);

  const [fifey, setFifey] = useState(false);
  const [hundi, setHundi] = useState(false);
  const [twn, setTwn] = useState(false);
  const [threeHun, setThreeHun] = useState(false);
  const [fourHun, setfourHun] = useState(false);
  const [fiveHun, setfiveHun] = useState(false);
  const [sixHun, setSixHun] = useState(false);
  const [sevenHun, setSevenHun] = useState(false);
  const [eightHun, setEightHun] = useState(false);
  const [nineHum, setNineHum] = useState(false);
  const [tenHun, setTenHun] = useState(false);






  useEffect(() => {
    const fetchData = async () => {

      if (!user) {
        setLoading(true);
        setTimeout(() => {
          if (!user) {
            console.log("why");
            navigate("/login")
          }
        }, 5000);
        return;
      }

      setLoading(false);

      setId(user.emailVerified);


      if (user && user.email) {
        const openDocRef = doc(db, 'open', user.email);

        try {
          // Fetch the document data
          const docSnapshot = await getDoc(openDocRef);

          if (docSnapshot.exists()) {
            // Document exists, set the data to state
            setUserData(docSnapshot.data());
          } else {
            console.log('Document does not exist');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  let fif = (e) => {
    setFifey(e);
  }

  let hun = (e) => {
    setHundi(e);
  }

  let two = (e) => {
    setTwn(e);
  }

  let three = (e) => {
    setThreeHun(e);
  }

  let four = (e) => {
    setfourHun(e);
  }

  let five = (e) => {
    setfiveHun(e);
  }

  let six = (e) => {
    setSixHun(e);
  }

  let seven = (e) => {
    setSevenHun(e);
  }

  let eight = (e) => {
    setEightHun(e)
  }


  let nine = (e) => {
    setNineHum(e)
  }

  let ten = (e) => {
    setTenHun(e)
  }




  return (
    <>
      <NavBar />


      <div className='home_top'>
        <h2>
          $ Invest on
        </h2>
        <span >Cryptocurrencies</span>
        <div className='home_icon'>
          <img src="BitCoin.png" />
          <img className='home_icon_other' src="lite.png" />
          <img className='home_icon_other' src="tether.png" />
          <img className='home_icon_other' src="dai.png" />
          <img className='home_icon_other' src="zcash.png" />
        </div>
      </div>


      <div className='home_item'>

        <div className='item'>
          <img className='item_pic' src="Binance.png" />
          <div className='item_info'>
            {
              userData.fifty ?
                <FiftyCall />
                :
                <>
                  <p><FaLock /> Unlock</p>
                  <h2 onClick={() => { setFifey(true) }}>$50</h2>
                </>
            }
          </div>
        </div>
        {
          fifey ?
            <Fifty value={{ fif }} />
            :
            ""
        }

        <div className='item'>
          <img className='item_pic' src="Binance.png" />
          <div className='item_info'>

            {
              userData.hundred ?
                <HundCall />
                :
                <>
                  <p><FaLock /> Unlock</p>
                  <h2 onClick={(e) => { setHundi(true) }}>$100</h2>
                </>

            }

          </div>
        </div>
        {
          hundi ?
            <Hundi value={{ hun }} />
            :
            ""
        }

        <div className='item'>
          <img className='item_pic' src="bitcash.png" />
          <div className='item_info'>
            {
              userData.two ?
                <TwoCall />
                :
                <>
                  <p><FaLock /> Unlock</p>
                  <h2 onClick={() => { setTwn(true) }}>$200</h2>
                </>
            }
          </div>
        </div>
        {
          twn ?
            <TwoHun value={{ two }} />
            :
            ""
        }

        <div className='item'>
          <img className='item_pic' src="dai.png" />
          <div className='item_info'>
            {
              userData.three ?
                <ThreeCall />
                :
                <>
                  <p><FaLock /> Unlock</p>
                  <h2 onClick={() => { setThreeHun(true) }}>$300</h2>
                </>
            }
          </div>
        </div>
        {
          threeHun ?
            <Three value={{ three }} />
            :
            ""
        }

        <div className='item'>
          <img className='item_pic' src="tether.png" />
          <div className='item_info'>
            {
              userData.four ?
                <FourCall />
                :
                <>
                  <p><FaLock /> Unlock</p>
                  <h2 onClick={() => { setfourHun(true) }}>$400</h2>
                </>
            }
          </div>
        </div>
        {
          fourHun ?
            <Four value={{ four }} />
            :
            ""
        }

        <div className='item'>
          <img className='item_pic' src="usd.png" />
          <div className='item_info'>
            {
              userData.five ?
                <FiveCall />
                :
                <>
                  <p><FaLock /> Unlock</p>
                  <h2 onClick={() => { setfiveHun(true) }}>$500</h2>
                </>
            }
          </div>
        </div>
        {
          fiveHun ?
            <Five value={{ five }} />
            :
            ""
        }

        <div className='item'>
          <img className='item_pic' src="lite.png" />
          <div className='item_info'>
            {
              userData.six ?
                <SixCall />
                :
                <>
                  <p><FaLock /> Unlock</p>
                  <h2 onClick={() => { setSixHun(true) }}>$600</h2>
                </>
            }
          </div>
        </div>
        {
          sixHun ?
            <Six value={{ six }} />
            :
            ""
        }

        <div className='item'>
          <img className='item_pic' src="zcash.png" />
          <div className='item_info'>
            {
              userData.seven ?
                <SevenCall />
                :
                <>
                  <p><FaLock /> Unlock</p>
                  <h2 onClick={() => { setSevenHun(true) }}>$700</h2>
                </>
            }
          </div>
        </div>
        {
          sevenHun ?
            <Seven value={{ seven }} />
            :
            ""
        }

        <div className='item'>
          <img className='item_pic' src="bnb.png" />
          <div className='item_info'>
            {
              userData.eight ?
                <EightCall />
                :
                <>
                  <p><FaLock /> Unlock</p>
                  <h2 onClick={() => { setEightHun(true) }}>$800</h2>
                </>
            }
          </div>
        </div>
        {
          eightHun ?
            <Eight value={{ eight }} />
            :
            ""
        }

        <div className='item'>
          <img className='item_pic' src="ethiriam.png" />
          <div className='item_info'>
            {
              userData.nine ?
                <NineCall />
                :
                <>
                  <p><FaLock /> Unlock</p>
                  <h2 onClick={() => { setNineHum(true) }}>$900</h2>
                </>
            }
          </div>
        </div>
        {
          nineHum ?
            <Nine value={{ nine }} />
            :
            ""
        }

        <div className='item'>
          <img className='item_pic' src="BitCoin.png" />
          <div className='item_info'>
            {
              userData.ten ?
                <TenCall />
                :
                <>
                  <p><FaLock /> Unlock</p>
                  <h2 onClick={() => { setTenHun(true) }}>$1000</h2>
                </>
            }
          </div>
        </div>
        {
          tenHun ?
            <Ten value={{ ten }} />
            :
            ""
        }


      </div>

    </>
  )
}

export default Home