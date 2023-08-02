import React, { useState,useEffect} from "react"
import axios from 'axios';
import Select from 'react-select';
function TrafficInsurance(){
    const [trafik, setTrafik] = useState({
       
        hasarsizGunSayisi:'',
    });
    const [carInfo, setCarInfo] = useState({
      marka: '',
      model: '',
      yil: 0,
      aracTür:'',
      motorHacim:'',
      fiyat: 0,
    });
    const [userInfo, setUserInfo] = useState(null);
  
    const handleTrafikChange = (selectedOption, fieldName) => {
      setTrafik({ ...trafik, [fieldName]: selectedOption.value });
    };
  
    const handleCarInfoChange = (selectedOption, fieldName) => {
      setCarInfo({ ...carInfo, [fieldName]: selectedOption.value });
    };
  
    
      const [fiyat, setFiyat] = useState(null)
     
      const markalar = [
    { value: 'audi', label: 'Audi' },
    { value: 'bmw', label: 'BMW' },
    {value:'toyoto',label:'Toyoto'},
    {value:'opel',label:'Opel'},
    {value:'fiat',label:'Fiat'},
    {value:'',label:'Opel'},
    {value:'ford',label:'Ford'}
  ];

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

    
  ];

      const aracTürleri = [
        { value: 'Otomobil', label: 'Otomobil' },
        { value: 'Kamyonet', label: 'Kamyonet' },
        {value:'Motorsiklet',label:'Motorsiklet'}
      ];
      const motorHacmiler = [
        { value: '1300', label: '1300' },
        { value: '1301-1600', label: '1301-1600' },
        {value:'1601 - 1800',label:'1601 - 1800'},
        {value:'1801 - 2000',label:'1801 - 2000'},
        {value:'2001 - 2500',label:'2001 - 2500'},
        ];
        
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
        const hasarsizGunSayisilar=[
            { value: '0-50', label: '0-50' },
            { value: '51-100', label: '51-100' },
            { value: '101-200', label: '101-200' },
            { value: '201-300', label: '201-300' },
            { value: '301-400', label: '301-400' },
            { value: '401-500', label: '401-500' },
            
           
        ]
        const fetchUserInfo = async () => {
          try {
            const response = await axios.get('/api/1.0/users/3652'); 
            setUserInfo(response.data);
          } catch (error) {
            console.error('Error fetching user information:', error);
          }
        };
        
        
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

        const handleCalculateTraffic = async () => {
            try {
              const response = await axios.post('/api/1.0/traffic', {
                user: userInfo,
                car: carInfo,
                ...trafik
              })
              .then(response => {
                setFiyat(response.data.fiyat); // Assuming the API returns the price in the 'fiyat' field
              })
             
            } catch (error) {
              console.error('AxiosError:', error);
            }
          };
    
    
    
    return(
        <div className="container">
            <h1>Trafik Sigortasi</h1>
            <div>
        
          Aracın Markası:
          <Select class="form-select form-select-lg"
            value={markalar.find((option) => option.value === carInfo.marka)}
            onChange={(selectedOption) => handleCarInfoChange(selectedOption, 'marka')}
            options={markalar}
            placeholder='Marka Seçin'
          />
        
        <br />
      </div>

      
        Aracın Modeli:
        <Select
          value={modeller.find((option) => option.value === carInfo.model)}
          onChange={(selectedOption) => handleCarInfoChange(selectedOption, 'model')}
          options={modeller}
          placeholder='Model Seçin'
        />
      
      <br />
      Yıl:
        <Select
          value={yillar.find((option) => option.value === carInfo.yil)}
          onChange={(selectedOption) => handleCarInfoChange(selectedOption, 'yil')}
          options={yillar}
          placeholder='Yıl Seçin'
        />
      
      <br />
      <div>
        
          Aracın Türü:
          <Select class="form-select form-select-lg"
            value={aracTürleri.find((option) => option.value === carInfo.aracTür)}
            onChange={(selectedOption) => handleCarInfoChange(selectedOption, 'aracTür')}
            options={aracTürleri}
            placeholder='Aracın Türü Seçin'
          />
        
        <br />
      </div>

      
        Motorun Hacmi:
        <Select
          value={motorHacmiler.find((option) => option.value === carInfo.motorHacim)}
          onChange={(selectedOption) => handleCarInfoChange(selectedOption, 'motorHacim')}
          options={motorHacmiler}
          placeholder='Motorun Hacmini Seçin'
        />
      
      <br />
      Arabanın Fiyatı:
        <input
          className='form-control'
          type='number'
          name='fiyat'
          value={carInfo.fiyat}
          onChange={(e) => handleCarInfoChange(e.target, 'fiyat')}
          placeholder='Car Fiyat'
          required
        />
      
       
      <br />
      
      <div>
        
          HasarsizGunSayisi
          <Select class="form-select form-select-lg"
            value={hasarsizGunSayisilar.find((option) => option.value === trafik.hasarsizGunSayisi)}
            onChange={(selectedOption) => handleTrafikChange(selectedOption, 'hasarsizGunSayisi')}
            options={hasarsizGunSayisilar}
            placeholder='HasarsizGunSayisi'
          />
        
        <br />
      </div>
      <button type='button' className='btn btn-success' onClick={handleCreateCar}>
        Kaydet
      </button>
      <button type='button' className='btn btn-warning' onClick={handleCalculateTraffic} >
        Trafik Sigorta Teklif Al
      </button>
      
      {fiyat !== null && <p>Fiyat: {fiyat}</p>}

      <br />
        </div>
    )

}
export default TrafficInsurance