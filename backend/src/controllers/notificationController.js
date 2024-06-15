const fs = require('fs');

exports.sendNotification = async (req, res) => {
  try {
    const { photoUrl } = req.body; // Removed phoneNumber since it's not used

    // Convert Data URL to buffer
    const base64Data = photoUrl.split(';base64,').pop();
    const imageData = Buffer.from(base64Data, 'base64');

    // Save image to a file
    fs.writeFile('sender_photo.jpg', imageData, (err) => {
      if (err) {
        console.error('Error saving image:', err);
        return res.status(500).json({ success: false, error: 'Error saving image' });
      }
      console.log('Image saved successfully');

      // Now you can process the image as needed
      // For example, you can include it in the notification message

      // Send a response back to the frontend
      res.status(200).json({ success: true, message: 'Notification sent successfully' });
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
