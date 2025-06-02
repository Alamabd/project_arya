import { CapacitorHttp } from '@capacitor/core';
import './ExploreContainer.css';
import { useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const ExploreContainer = () => {
  const [ip, setIp] = useState<string>(localStorage.getItem('ip') ?? '')
  const loc = useLocation()
  const [present] = useIonAlert();

  const handleParking = async () => {
    if(!ip) {
      present({
        message: "Maaf alamat server belum diisi",
        buttons: ['Baik']
      })
      return
    }

    try {
      console.log(`Request: http://${ip}:3000`);
      
      const response = await CapacitorHttp.post({
        url: `http://${ip}:3000`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          q: 'PAYMENT_SUCCESS'
        }
      })

      const { status } = response

      if(status !== 200) {
        present({
          message: "Maaf terjadi kesalahan",
          buttons: ['Baik']
        })
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setIp(localStorage.getItem('ip') ?? '')
  }, [loc.pathname])

  return (
    <div id="container">
      <div>
        <strong>Parkir sama arya</strong>
        <p>Server IP : {ip ?? 'Unknow'}</p>
      </div>
      <button onClick={handleParking} className='btn' style={ip ? {} : { opacity: '40%' }}>Bayar</button>
    </div>
  );
};

export default ExploreContainer;
