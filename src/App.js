// src/components/NotificationForm.js
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { showToastError, showToastSuccess } from './config/toast';


const NotificationForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const videoRef = useRef(null);

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleCapturePhoto = () => {
    console.log('Capturing photo...');
    console.log('Video element:', videoRef.current);
  
    const canvas = document.createElement('canvas');
    console.log('Canvas:', canvas);
  
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    console.log('Canvas dimensions:', canvas.width, canvas.height);
  
    const context = canvas.getContext('2d');
    console.log('Canvas context:', context);
  
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    console.log('Image drawn on canvas');
  
    const photoUrl = canvas.toDataURL('image/jpeg');
    console.log('Photo URL:', photoUrl);
  
    // Now you can use photoUrl to display the captured photo or send it to the backend
  };
  

  
  const handleSendNotification = async () => {
    debugger
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const photoUrl = canvas.toDataURL('image/jpeg');
  
      // Now send photoUrl and phoneNumber to backend
      await axios.post('http://localhost:3000/api/send-notification', { photoUrl });
      showToastSuccess('Notification sent successfully via Twilio'); // Update success message
    } catch (error) {
      console.error('Error sending notification:', error);
      showToastError('Failed to send notification. Please try again.'); // Display error message
    }
  };
  
  

  return (
    <>
    <div>
      <h2>Send Notification</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div>
      <button onClick={handleStartCamera}>Start Camera</button>
      <video ref={videoRef} autoPlay style={{ display: 'block', width: '300px', height: 'auto' }} />
    </div>
    <button onClick={handleCapturePhoto}>Capture Photo</button> {/* Add this line */}
    <button onClick={handleSendNotification}>Send Notification</button>
    </div>
    <ToastContainer
            position="top-center"
            theme="light"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </>
  );
};

export default NotificationForm;
