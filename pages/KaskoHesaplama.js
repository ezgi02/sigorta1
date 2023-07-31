import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function KaskoHesaplama() {
  const [carInfo, setCarInfo] = useState({
    marka: '',
    model: '',
    yil: 0,
    fiyat: 0,
  });

  const [kaskoValue, setKaskoValue] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  

  const handleChange = (selectedOption, fieldName) => {
    setCarInfo({ ...carInfo, [fieldName]: selectedOption.value });
  };

  // Marka seçenekleri
  const markalar = [
    { value: 'audi', label: 'Audi' },
    { value: 'bmw', label: 'BMW' },
    {value:'toyoto',label:'Toyoto'},
    {value:'opel',label:'Opel'},
    {value:'fiat',label:'Fiat'},
    {value:'',label:'Opel'},
    {value:'ford',label:'Ford'}
  ];

  // Model seçenekleri
  const modeller = [
    { value: 'audi_model1', label: 'Audi e-tron' },
    { value: 'audi_model2', label: 'Audi A4 Sedan' },
    { value: 'bmw_model1', label: 'BMW i5' },
    { value: 'bmw_model2', label: 'BMW M2 Coupe' },
    { value: 'toyota_model1', label: 'Toyota Corollo' },
    { value: 'toyota_model2', label: 'Toyota Yaris' },
    { value: 'opel_model1', label: 'Opel Astra' },
    { value: 'opel_model2', label: 'Opel Corsa' },
    { value: 'fiat_model1', label: 'Fiat Egea' },
    { value: 'fiat_model2', label: 'Fiat 500' },
    { value: 'ford_model1', label: 'Ford Fiesta' },
    { value: 'ford_model2', label: 'Ford Model 2' },

    // Diğer modelleri buraya ekleyin
  ];

  // Yıl seçenekleri
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

    // Diğer yılları buraya ekleyin
  ];
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('/api/1.0/users/1752'); // veya başka bir endpoint kullanarak kullanıcı bilgilerini getirin.
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };
  
  // Bu fonksiyonu örneğin, UserSignupPage bileşeni içinde useEffect() kullanarak component ilk yüklendiğinde çağırabilirsiniz:
  useEffect(() => {
    fetchUserInfo();
  }, [])


  const handleCreateCar = async () => {
    try {
      const response = await axios.post('/api/1.0/cars', carInfo);
      const newCarId = response.data.id;
      setCarInfo({ ...carInfo, id: newCarId });
      alert('Car information saved successfully!');
    } catch (error) {
      console.error('Car creation error:', error);
    }
  };
// /api/1.0/cars/${carInfo.id}/calculateKasko
  const handleCalculateKasko = async () => {
    try {
      const response = await axios.post(`/api/1.0/kasko`,{
        user: userInfo,
        car: carInfo,
      });
      console.log('Kasko calculation response:', response.data);
      setKaskoValue(response.data);
    } catch (error) {
      console.error('AxiosError:', error);
    }
  };

  return (
    <div className='container'>
      <h1>Kasko Değer</h1>
      <div>
        
          Arabanın Markası:
          <Select class="form-select form-select-lg"
            value={markalar.find((option) => option.value === carInfo.marka)}
            onChange={(selectedOption) => handleChange(selectedOption, 'marka')}
            options={markalar}
            placeholder='Marka Seçin'
          />
        
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

      <button type='button' className='btn btn-success' onClick={handleCreateCar}>
        Kaydet
      </button>
      <button type='button' className='btn btn-warning' onClick={handleCalculateKasko}>
        Kaskoyu Hesapla
      </button>
      {kaskoValue !== null && <p>Kasko Fiyatı: {kaskoValue.fiyat}</p>}
    </div>
  );
}

export default KaskoHesaplama;        
       
      
      
      
      
        
        
          
          
          
          
          
          
        
     
      
      

  