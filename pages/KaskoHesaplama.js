import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import {Link, useParams } from 'react-router-dom'

function KaskoHesaplama() {
  const { userId } = useParams()
  const[markalar,setMarkalar]=useState([])
  const [modeller, setModeller] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [carInfo, setCarInfo] = useState({
    marka: '',
    model: '',
    yil: 0,
    fiyat: 0,
  });

  const [kaskoValue, setKaskoValue] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  

  const handleChange = (selectedOption, fieldName) => {
    if(fieldName === 'marka'){
      const selectedMarka = selectedOption.value;
  const filteredModeller = modeller.filter(model => model.value.startsWith(selectedMarka));
  setModeller(filteredModeller);
  setCarInfo({ ...carInfo, [fieldName]: selectedOption.value, marka: selectedMarka, model: '' });
    }else {
      setCarInfo({ ...carInfo, [fieldName]: selectedOption.value });
    }
   
  };

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
  useEffect(() => {
    fetchMarkalar();
  }, []);

  const fetchMarkalar = async () => {
    try {
      const response = await axios.get('/api/1.0/markalar');
      setMarkalar(response.data);
    } catch (error) {
      console.error('Error fetching markalar:', error);
    }
  };
  useEffect(() => {
    fetchModeller();
  }, []);

  const fetchModeller = async () => {
    try {
      const response = await axios.get('/api/1.0/modeller');
      setModeller(response.data);
    } catch (error) {
      console.error('Error fetching modeller:', error);
    }
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
      if (error.response && error.response.data.validationErrors) {
        
        setValidationErrors(error.response.data.validationErrors);
      }
      console.error('AxiosError:', error);
    }
  };
  const handleSaveKasko = async () => {
    try {
      const response = await axios.post(`/api/1.0/kasko`,{
        user: userInfo,
        car: carInfo,
      });
      // console.log('Kasko calculation response:', response.data);
      // setKaskoValue(response.data);
    } catch (error) {
      console.error('AxiosError:', error);
    }
  }

  return (
    <div className='container'>
      <h1>Kasko Değer</h1>
      <div>
        
          Arabanın Markası:
          <Select className={`form-select ${validationErrors.marka ? 'is-invalid' : ''}`}
            value={markalar.find((option) => option.value === carInfo.marka)}
            onChange={(selectedOption) => handleChange(selectedOption, 'marka')}
            options={markalar.map(option => ({ value: option.value, label: option.label }))} 
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
          value={modeller.find((option) => option.value === carInfo.model)}
          onChange={(selectedOption) => handleChange(selectedOption, 'model')}
          options={modeller}
          placeholder='Model Seçin'
        />
      
      <br />
      
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
       
      
      
      
      
        
        
          
          
          
          
          
          
        
     
      
      

  