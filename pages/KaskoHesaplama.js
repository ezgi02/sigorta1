import React, { useState } from 'react';
import axios from 'axios'

function KaskoHesaplama() {
  const [carInfo, setCarInfo] = useState({
    marka: '',
    model: '',
    yil:0,
    fiyat:0,
  });

  const [kaskoValue, setKaskoValue] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarInfo({ ...carInfo, [name]: value });
  };
// /api/1.0/cars/kasko
const handleCreateCar = async () => {
  try {
    const response=await axios.post('/api/1.0/cars', carInfo);
    const newCarId = response.data.id;
    setCarInfo({ ...carInfo, id: newCarId })
    alert('Car information saved successfully!');
  } catch (error) {
    console.error('Car creation error:', error);
  }
};
const handleCalculateKasko = async () => {
  try {
    const response = await axios.post(`/api/1.0/cars/${carInfo.id}/calculateKasko`);
    setKaskoValue(response.data);
  } catch (error) {
    console.error('Kasko calculation error:', error);
  }
};
return (
  <div className='container'>
    <h1>Kasko Hesaplama</h1>
    <div>
       <label>
      Arabanın Markası:
      <input className='form-control' type="text" name="marka"value={carInfo.marka}
        onChange={handleChange}placeholder="Marka"required/>
    </label>    
    <br />   
    </div>
   
    <label>   
      Arabanın Modeli:   
      <input className='form-control'type="text"name="model"
        value={carInfo.model}onChange={handleChange}placeholder="Model"required  /> 
    </label>
    <br />
    <label>
      Yıl:
      <input className='form-control'type="text"name="yil"value={carInfo.yil}onChange={handleChange}placeholder="Car Year"
      required   />   
          
    </label>      
    <br />      
    <label>      
     Arabanın Fiyatı:     
      
      <input className='form-control' type="text"name="fiyat"value={carInfo.fiyat}onChange={handleChange}placeholder="Car Fiyat"required/>
     
    </label> 
       
    <br />    
        
    <button type="button" className="btn btn-success" onClick={handleCreateCar}>Kaydet</button>
      <button type="button" class="btn btn-warning"onClick={handleCalculateKasko}>Kaskoyu Hesapla</button>
      {kaskoValue !== null && <p>Kasko Price: {kaskoValue}</p>}
    </div>
  );
}      
          
export default KaskoHesaplama;          
       
      
      
      
      
        
        
          
          
          
          
          
          
        
     
      
      

  