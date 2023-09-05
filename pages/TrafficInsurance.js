import React, { useState,useEffect} from "react"
import axios from 'axios';
import {Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import ConfirmationDialog from "../components/ConfirmationDialog";

import Select from 'react-select';
function TrafficInsurance(){
  const { userId } = useParams()
  const[markalar,setMarkalar]=useState([])
  const [modeller, setModeller] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null)
  const [plateNumber, setPlateNumber] = useState('');
  const [acceptedOffer, setAcceptedOffer] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [motorHacmiler, setMotorHacmiler] = useState([])
  const [hasarsizGunSayileri, setHasarsizGunSayileri] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
    const [trafik, setTrafik] = useState({
       
        
    });
    const [carInfo, setCarInfo] = useState({
      marka: '',
      model: '',
      yil: 0,
      aracTür:'',
      motorHacim:'',
      hasarsizGunSayisi:'',
      fiyat: null,
      plakaKodu:'',
    });
    const [userInfo, setUserInfo] = useState(null);
  
    const handleTrafikChange = (selectedOption, fieldName) => {
      setTrafik({ ...trafik, [fieldName]: selectedOption.value });
    };
    
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
         handleCarInfoChange(selectedOption, 'marka');
         
          setSelectedModel(null);
         
      } catch (error) {
          console.error("Error fetching modeller", error);
      }
  };
  const handleModelChange = (selectedOption) => {
      setSelectedModel(selectedOption);
  
     handleCarInfoChange(selectedOption, 'model');
    };
  
    useEffect(() => {
      fetchMotorHacmiler();
  }, []);
  
  const fetchMotorHacmiler = async () => {
      try {
          const response = await axios.get('/api/1.0/motor/all-hacimleri'); 
          const motorHacimleri = response.data;

          console.log(motorHacimleri);
          setMotorHacmiler(motorHacimleri);
      } catch (error) {
          console.error('Error fetching motor hacimleri:', error);
      }
  };
  useEffect(() => {
    fetchHasarsizGunSayilari();
}, []);

const fetchHasarsizGunSayilari = async () => {
    try {
        const response = await axios.get('/api/1.0/hasarsiz/all-hasarsizgunsayileri'); 
        const  hasarsizGunSayileri= response.data;

        console.log(hasarsizGunSayileri);
        setHasarsizGunSayileri(hasarsizGunSayileri);
    } catch (error) {
        console.error('Error fetching motor hasarsizGunSayileri:', error);
    }
};

  
     const handleCarInfoChange = (selectedOption, fieldName) => {
      if (fieldName === 'marka') {
        const markaId = selectedOption.id; // Seçilen markanın ID'sini alıyoruz
        console.log("Selected Marka ID:", markaId);
        setCarInfo({ ...carInfo, [fieldName]: selectedOption.label, model: '' });
    
      }else {
        setCarInfo({ ...carInfo, [fieldName]: selectedOption.value });
      }  

      setValidationErrors({ ...validationErrors, [fieldName]: '' });
    };
  
    
      const [fiyat, setFiyat] = useState(null)
     
  

 
      const aracTürleri = [
        { value: 'Otomobil', label: 'Otomobil' },
        { value: 'Kamyonet', label: 'Kamyonet' },
        {value:'Motorsiklet',label:'Motorsiklet'}
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
            
          }
        };
        
        

      
        const handleCreateCar = async () => {
          try {
            const response = await axios.post('/api/1.0/cars', carInfo);
            const newCarId = response.data.id;
            setCarInfo({ ...carInfo, id: newCarId });
            alert('Car information saved successfully!');
            setValidationErrors({}); 
          } catch (error) {
            if (error.response && error.response.data.validationErrors) {
              // Sunucudan gelen validation hatalarını yakala
              setValidationErrors(error.response.data.validationErrors);
            }
            console.error('Car creation error:', error);
          }
        };

        const handleCalculateTraffic = async () => {
          try {
            const response = await axios.post('/api/1.0/traffic/calculatePrice', {
              user: userInfo,
              car: carInfo,
              ...trafik
            });
            const calculatedPrice = response.data.fiyat;
            console.log(response.data)
            console.log(response.data.fiyat)
            console.log(calculatedPrice);
            setFiyat(response.data);
            setValidationErrors({}); 
            toast.success('Trafik sigortası başarılı bir şekilde hesaplandı!', { autoClose: 3000 });
          } catch (error) {
            if (error.response && error.response.data.validationErrors) {
              // Sunucudan gelen validation hatalarını yakala
              console.log(error.response.data.validationErrors)
              setValidationErrors(error.response.data.validationErrors);
            }
            console.error('AxiosError:', error);
            toast.error('Trafik sigortası hesaplanırken hata oluştu!', { autoClose: 3000 });
          }
        };
        const handleSaveTraffic = async () => {
          try {
            const response = await axios.post('/api/1.0/traffic/saveTraffic', {
              user: userInfo,
              car: carInfo,
              ...trafik
            });
            // const calculatedPrice = response.data.fiyat;
            // console.log(response.data)
            // console.log(response.data.fiyat)
            // console.log(calculatedPrice);
            // setFiyat(response.data);
             // Teklifi sıfırla
             //setIsOpen(true);
          } catch (error) {
            if (error.response && error.response.data.validationErrors) {
              // Sunucudan gelen validation hatalarını yakala
              console.log(error.response.data.validationErrors)
              setValidationErrors(error.response.data.validationErrors);
            }
            console.error('AxiosError:', error);
            
          }
         
        };
        // const closeModal = () => {
        //   setIsOpen(false); // Onay kutusu modal'ını kapatmak için kullanılacak fonksiyon
        // };
       
  // const confirmSave = async () => {
  //   // Kullanıcı "Evet" dediğinde kaydetme işlemini gerçekleştirin
  //   // Örneğin:
  //   try {
  //     const response = await axios.post('/api/1.0/traffic/saveTraffic', {
  //       user: userInfo,
  //       car: carInfo,
  //       ...trafik
  //     });
  //     // Kaydetme işlemi başarılı olduğunda gerekli kodları ekleyin
  //   } catch (error) {
  //     // Hata durumunda işlemi işlemek için gerekli kodları ekleyin
  //   }

  //   // Onay kutusu modal'ını kapat
  //   closeModal();
  // };

    return(
        <div className="container">
            <h1>Trafik Sigortasi</h1>
            {/* <div>
        
          Aracın Markası:
          <Select class="form-select form-select-lg"
             value={markalar.find((option) => option.value === carInfo.marka)}
             onChange={(selectedOption) => handleCarInfoChange(selectedOption, 'marka')}
             options={markalar.map(option => ({ value: option.value, label: option.label }))} // options prop'unu güncelledik
             placeholder='Marka Seçin'
           />
        
        <br />
      </div> */}
        Arabanın Markası:
          <Select className={` ${validationErrors.marka ? 'is-invalid' : ''}` } 
            value={markalar.find((option) => option.value === carInfo.marka)}
            onChange={(selectedOption)=>handleMarkaChange(selectedOption)}
            options={markalar.map(marka => ({ value: marka.value, label: marka.label,id: marka.id}))} 
            //options={markalar}
            placeholder='Marka Seçin'
          />
           {validationErrors.marka && (
    <div className="invalid-feedback">{validationErrors.marka}</div>
  )}
        <br/>
        Aracın Modeli:
        <Select className={` ${validationErrors.model ? 'is-invalid' : ''}` } 
          value={selectedModel}
          onChange={(selectedOption) => handleModelChange(selectedOption, 'model')}
          options={modeller}
          placeholder='Model Seçin'
        />
         {validationErrors.model && (
    <div className="invalid-feedback">{validationErrors.model}</div>
  )}
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
          <Select className={` ${validationErrors.aracTür ? 'is-invalid' : ''}` } 
            value={aracTürleri.find((option) => option.value === carInfo.aracTür)}
            onChange={(selectedOption) => handleCarInfoChange(selectedOption, 'aracTür')}
            options={aracTürleri}
            placeholder='Aracın Türü Seçin'
          />
        {validationErrors.aracTür && (
    <div className="invalid-feedback">{validationErrors.aracTür}</div>
  )}
        <br />
      </div>

      
        Motorun Hacmi:
      
        
        <Select className={` ${validationErrors.motorHacim ? 'is-invalid' : ''}`  } 
        value={motorHacmiler.find(option => option.value === carInfo.motorHacim)}
        onChange={(selectedOption) => handleCarInfoChange(selectedOption, 'motorHacim')}
        options={motorHacmiler.map(option => ({ value: option, label: option }))}
        placeholder='Motor Hacmi Seçin'
      />
      {validationErrors.motorHacim && (
    <div className="invalid-feedback">{validationErrors.motorHacim}</div>
  )}

      <br/>
      Plaka Kodu
      <input
  className={`form-control ${validationErrors.plakaKodu ? 'is-invalid' : ''}` }
  type='text'
  name='plakaKodu'
  value={carInfo.plakaKodu}
  onChange={(e) => {
    const inputValue = e.target.value;
    const formattedValue = inputValue.toUpperCase(); 
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
{validationErrors.plakaKodu && (
    <div className="invalid-feedback">{validationErrors.plakaKodu}</div>
  )}

        
      <br />
      Arabanın Fiyatı:
        <input 
        className={`form-control ${validationErrors.fiyat ? 'is-invalid' : ''}` }
          type='number'
          name='fiyat'
          value={carInfo.fiyat}
          onChange={(e) => handleCarInfoChange(e.target, 'fiyat')}
          placeholder='Car Fiyat'
          required
        />
      {validationErrors.fiyat && (
    <div className="invalid-feedback">{validationErrors.fiyat}</div>
  )}
       
      <br />
      
      <div>
        Hasarsiz Gun Sayisi
      <Select className={` ${validationErrors.hasarsizGunSayisi ? 'is-invalid' : ''}` }
  value={hasarsizGunSayileri.find(option => option.value === carInfo.hasarsizGunSayisi)}
  onChange={(selectedOption) => handleCarInfoChange(selectedOption, 'hasarsizGunSayisi')}
  options={hasarsizGunSayileri.map(option => ({ value: option, label: option }))}
  placeholder='Hasarsiz Gun Sayisi Seçiniz'
/>
{validationErrors.hasarsizGunSayisi && (
    <div className="invalid-feedback">{validationErrors.hasarsizGunSayisi}</div>
  )}
        
      </div>
      
      <button type='button' className='btn btn-warning' onClick={handleCalculateTraffic} >
        Trafik Sigorta Teklif Al
      </button>
      
      {fiyat !== null && <p>Fiyat: {fiyat}</p>}
      
      <button type="button" className="btn btn-primary" onClick={handleSaveTraffic}>Teklifi Kabul Et</button>
      {/* <ConfirmationDialog isOpen={isOpen} onClose={closeModal} onConfirm={confirmSave} /> */}
      <button className="btn btn-danger">
      <Link className='nav-link' to={"/anasayfa"}>
            Çıkış
        </Link>
      </button>
      <br />

        </div>
    )

}
export default TrafficInsurance