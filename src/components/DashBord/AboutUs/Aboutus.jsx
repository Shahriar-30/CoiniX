import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { FaImage, FaSignOutAlt } from 'react-icons/fa';
import { IoMdDoneAll } from 'react-icons/io';
import { RxCrossCircled } from 'react-icons/rx';
import Button from 'react-bootstrap/Button';
import ChangePassword from '../../PopUp/ForGet/ChangePassword';
import { useData } from '../../context/Data';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../FireBase';
import Loading from '../../PopUp/Loading/Loading'
import { auth } from '../../context/Data';
import './Aboutus.css';

function Aboutus() {
  const { user, logOut, isLogedIn } = useData();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [id, setId] = useState(false);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    if (!user) {
      // User is not loaded yet, show loading state
      setLoading(true);
      return;
    }

    // User is loaded, set loading to false
    setLoading(false);

    // Set the verified ID status
    console.log(user);
    setId(user.emailVerified);
  }, [user]);


  const handleProfile = (e) => {
    if (e) {
      const selectedFile = e.currentTarget.files[0];
      setImg(selectedFile);

    } else {
      console.log("no img selected");
    }
  };

  const uploadImg = async () => {
    // Check if an image is selected
    if (!img) {
      console.log('No image selected');
      return;
    }

    const imgRef = ref(storage, `img/${user.uid}`);
    try {
      const snapshot = await uploadBytes(imgRef, img);
      const url = await getDownloadURL(snapshot.ref);
      await updateProfile(user, { photoURL: url });
      console.log('Image uploaded successfully:', url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const goOut = async () => {
    // await logOut();
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }

  };


  if (loading) {
    // Loading state while authentication state is being determined
    return <Loading />;
  }


  return (
    <>
      {form && <ChangePassword value={{ format: setForm }} />}
      <NavBar />
      <div className="about">
        <div>
          {id ?
            <p className="vani">
              <IoMdDoneAll className="tik" />
              Vinified Id
            </p>
            :
            <p className="nonvani">
              <RxCrossCircled className="cross" />
              Non-Vinified Id
            </p>
          }
        </div>
        <div>
          <div className="profile">
            <div className="profile_img_div">
              <img
                src={user.photoURL}
                alt="Profile"
                onError={(e) => console.error('Error loading image:', e.nativeEvent)}
              />
            </div>
            <label htmlFor="profile_img" className="profile_pro" onClick={uploadImg} >
              <FaImage />
              Edit Profile Image
            </label>
            <input type="file" id="profile_img" name="profile_img" className="profile_img_pro" onChange={handleProfile} />
            <div className="profile_data">
              <div className="profile_info">
                <p>Name : </p>
                <p>{user.displayName}</p>
              </div>
              <div className="profile_info">
                <p>Email : </p>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          <div className="prfile_btn">
            <Button variant="warning" onClick={() => setForm(true)}>
              Change Password
            </Button>
            <Button variant="danger" onClick={goOut}>
              <FaSignOutAlt className="logout_icon" />
              Log Out
            </Button>
          </div>
        </div>
        <img src="CoiniX.svg" alt="Brand Logo" className="about_img" />
      </div>
    </>
  );
}

export default Aboutus;
