import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import {Link, useParams } from 'react-router-dom'

function KaskoHesaplama() {
  const { userId } = useParams()
  const[markalar,setMarkalar]=useState([])
  const [modeller, setModeller] = useState([]);
  const [plateNumber, setPlateNumber] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedModel, setSelectedModel] = useState(null)
  const [carInfo, setCarInfo] = useState({
    marka: '',
    model: '',
    yil: 0,
    fiyat: 0,
    plakaKodu:'',
  });

  const [kaskoValue, setKaskoValue] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  

  const handleChange = (selectedOption, fieldName) => {
    if (fieldName === 'marka') {
      const markaId = selectedOption.id; // Seçilen markanın ID'sini alıyoruz
      console.log("Selected Marka ID:", markaId);
      setCarInfo({ ...carInfo, [fieldName]: selectedOption.label, model: '' });
      setValidationErrors({
        ...validationErrors,
        marka: ''
      });
  
      // Burada model seçimini sıfırlayabilirsiniz
      setCarInfo({ ...carInfo, [fieldName]: selectedOption.label, model: '' });
    } else {
      setCarInfo({ ...carInfo, [fieldName]: selectedOption.value });
    }
  };
//   const handleChange = (selectedOption, fieldName) => {
//     setCarInfo(prevHomeInfo => ({
//         ...prevHomeInfo,
//         [fieldName]: selectedOption.value
//     }));
  
// };
  

  const yillar = [
    { value: 2023, label: '2023' },
    { value: 2022, label: '2022' },
    { value: 2021, label: '2021' },
    { value: 2020, label: '2020' },
    { value: 2019, label: '2019' },
    { value: 2018, label: '2018' },
    { value: 2017, label: '2017' },
    { value: 2016, label: '2016' },
    { value: 2015, label: '2015' },
    { value: 2014, label: '2014' },
    { value: 2013, label: '2013' },
    { value: 2012, label: '2012' },
    { value: 2011, label: '2011' },
    { value: 2010, label: '2010' },

    
  ];

  // useEffect(() => {
  //   fetchMarkalar();
  // }, []);

  const fetchMarkalar = async () => {
    try {
      const response = await axios.get('/api/1.0/markalar');
     
      setMarkalar(response.data);
    } catch (error) {
      console.error('Error fetching markalar:', error);
    }
  };
  useEffect(() => {
    fetchMarkalar();
  }, []);
 
  
  const handleMarkaChange = async (selectedOption) => {
    const markaId = selectedOption.id; 
    const isim=selectedOption.value// Seçilen markanın ID'sini alıyoruz
    console.log("Selected Marka ID:", markaId);
    console.log(isim)
    try {
        const response = await axios.get(`/api/1.0/${markaId}/modeller`);
        console.log(response.data);
        const modelOptions = response.data.map(model => ({ value: model.label, label: model.label }));
        setModeller(modelOptions);
        console.log(isim)
        console.log(selectedOption.value)
        selectedOption.value = selectedOption.label;
       handleChange(selectedOption, 'marka');
       
        setSelectedModel(null);
       
    } catch (error) {
        console.error("Error fetching modeller", error);
    }
};
const handleModelChange = (selectedOption) => {
    setSelectedModel(selectedOption);

   handleChange(selectedOption, 'model');
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userId])

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`/api/1.0/users/${userId}`); 
      setUserInfo(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error fetching user information:', error.response.data);
      } else if (error.message) {
        console.error('Error fetching user information:', error.message);
      } else {
        console.error('Error fetching user information:', error);
      }
      //console.error('Error fetching user information:', error);
    }
  };
 


 
// /api/1.0/cars/${carInfo.id}/calculateKasko
  const handleCalculateKasko = async () => {
    try {
      const response = await axios.post(`/api/1.0/kasko/kaskofiyati`,{
        user: userInfo,
        car: carInfo,
      });
      console.log('Kasko calculation response:', response.data);
      setKaskoValue(response.data);
      setValidationErrors({});
    } catch (error) {
      if(error.response){
        if (error.response.data.validationErrors) {
          console.log(error.response.data.validationErrors)
        //setValidationErrors(error.response.data.validationErrors);
        }else{
          console.log('Sunucu Hata Kodu:', error.response.status);
          console.log('Sunucu Hata Açıklaması:', error.response.data);
      }
      }
      
      else if (error.request) {
        console.log('İstek Yapılamadı:', error.request);
      } else {
        console.log('Bir Hata Oluştu:', error.message);
      }
      console.error('AxiosError:', error);
    
     // console.error('AxiosError:', error);
    }
  };
  const handleSaveKasko = async () => {
    try {
      const response = await axios.post(`/api/1.0/kasko/kaydetme`,{
        user: userInfo,
        car: carInfo,
      });
      alert("basarılı bir şekilde kullanıcı kaydedildi")
      // console.log('Kasko calculation response:', response.data);
      // setKaskoValue(response.data);
    } catch (error) {
      if (error.response && error.response.data.validationErrors) {
        console.log(error.response.data.validationErrors)
        setValidationErrors(error.response.data.validationErrors);
      }
    }
  }
  

  return (
    <div className='container'>
      <h1>Kasko Değer</h1>
      <div>
        
          Arabanın Markası:
          <Select className={` ${validationErrors.marka ? 'is-invalid' : ''}`}
            value={markalar.find((marka) => marka.value === carInfo.marka)}
            onChange={(selectedOption)=>handleMarkaChange(selectedOption)}
            options={markalar.map(marka => ({ value: marka.value, label: marka.label,id: marka.id}))} 
            //options={markalar}
            placeholder='Marka Seçin'
          />
           {validationErrors.marka && (
    <div className="invalid-feedback">{validationErrors.marka}</div>
  )}
        
        <br />
      </div>

      
        Arabanın Modeli:
        <Select
          // value={modeller.find((option) => option.value === carInfo.model)}
          value={selectedModel}
          onChange={(selectedOption) => handleModelChange(selectedOption, 'model')}
          options={modeller}
          placeholder='Model Seçin'
        />
      
      <br />
      Plaka Kodu
      <input
  className='form-control'
  type='text'
  name='plakaKodu'
  value={carInfo.plakaKodu}
  onChange={(e) => {
    const inputValue = e.target.value;
    const formattedValue = inputValue.toUpperCase(); // Küçük harfleri büyük harfe çevir
    setCarInfo({ ...carInfo, plakaKodu: formattedValue });
  }}
  onKeyDown={(e) => {
    const key = e.key;
    const inputValue = e.target.value;
    const isNumeric = /^[0-9]+$/.test(key);
    const isLetter = /^[a-zA-Z]+$/.test(key);

    if (key === "Backspace" || key === "Delete") {
      return;
    }
    if (
      (inputValue.length === 0 || inputValue.length === 1) &&
      !isNumeric
    ) {
      e.preventDefault();
    } else if (
      (inputValue.length === 2 || inputValue.length === 3) &&
      !isLetter
    ) {
      e.preventDefault();
    } else if (
      (inputValue.length === 4) &&
      !isNumeric && !isLetter
    ) {
      e.preventDefault();
    } else if (
      (inputValue.length === 5 || inputValue.length === 6 || inputValue.length === 7 || inputValue.length === 8) &&
      !isNumeric
    ) {
      e.preventDefault();
    }
  }}
  maxLength={8}
  placeholder='Plaka Kodu'
  required
/>

        Yıl:
        <Select
          value={yillar.find((option) => option.value === carInfo.yil)}
          onChange={(selectedOption) => handleChange(selectedOption, 'yil')}
          options={yillar}
          placeholder='Yıl Seçin'
          
        />
      
      <br />
      
        Arabanın Fiyatı:
        <input
          className='form-control'
          type='number'
          name='fiyat'
          value={carInfo.fiyat}
          onChange={(e) => handleChange(e.target, 'fiyat')}
          placeholder='Car Fiyat'
          required
        />

     

      <br />
      <button type='button' className='btn btn-warning' onClick={handleCalculateKasko}>
        Kaskoyu Hesapla
      </button>
      
      {kaskoValue !== null && <p>Kasko Fiyatı: {kaskoValue}</p>}
      <buton type="button" className="btn btn-success" onClick={handleSaveKasko}>
        Kasko Kaydet
      </buton>
      <button className='btn btn-danger'>
      <Link className='nav-link' to={"/anasayfa"}>
            Reddet
        </Link>
      </button>
    </div>
  );
}

export default KaskoHesaplama;        