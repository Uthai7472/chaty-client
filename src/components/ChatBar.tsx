import { useState } from 'react';
import './ChatBar.css';
import { IoImages } from "react-icons/io5";
import { BsSendFill } from "react-icons/bs";
import axios from 'axios';

const ChatBar = () => {
  const username = localStorage.getItem('userLogin');
  console.log("Username: ", username);


  const [formData, setFormData] = useState({
    'username': '',
    'message': '',
    'image_url': '',
    'timestamp': '',
    'date': ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
        setSelectedFile(file);
    }
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(`Name: ${name} Value: ${value}`);
  };

  

  const handleClick = async () => {
    // e.preventDefault();

    try {
      // Generate current timestamp and date
      const now = new Date();
      const timestamp = now.toISOString(); // UTC timestamp
      const options = { timeZone: 'Asia/Bangkok' };
      const dateThailand = now.toLocaleDateString('en-US', options);

      const updatedFormData = {
        ...formData,
        username: username,
        timestamp: timestamp,
        date: dateThailand
      };

      if (formData.message) {
        const response = await axios.post('https://chaty-server1.onrender.com/api/chat/send', updatedFormData);
        console.log(response.data);
        console.log('Form Data: ', updatedFormData);

        // Clear state
        setFormData({
          'username': '',
          'message': '',
          'image_url': '',
          'timestamp': '',
          'date': ''
        });

        
      }

      if (selectedFile) {
        const imageFormData = await new FormData();
        imageFormData.append('image', selectedFile);
        console.log(selectedFile.name);

        const updatedImageFormData = {
          ...formData,
          username: username,
          timestamp: timestamp,
          date: dateThailand,
          image_url: selectedFile.name
        };
        
        // Send Image to server folder
        await axios.post('https://chaty-server1.onrender.com/api/upload/image', imageFormData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error uploading image: ', error);
        });

        // Send image url and any datas
        await axios.post('https://chaty-server1.onrender.com/api/chat/send', updatedImageFormData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error uploading image_url: ', error);
        });

        
      }

      window.location.href = await window.location.href;
      
    } catch (error) {
      console.error('An error occurred during send message:', error);
    }
  }

  return (
    <div className='chat-bar-container'>
      <div className='image-btn-block'>
        
      <label htmlFor="image-input" className="image-select-btn">
        <IoImages />
      </label>
      <input
        id="image-input"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      </div>

      <div className='message-block'>
        <textarea onChange={handleChangeTextArea} value={formData.message} className='chat-input' name='message' id='message'>

        </textarea>
      </div>

      <div className='send-btn-block'>
        <button onClick={handleClick}><BsSendFill /></button>
      </div>
        
    </div>
  )
}

export default ChatBar