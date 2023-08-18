import axios from "axios";
import React, { useState,useEffect} from "react"
import {Link, useParams } from 'react-router-dom'
import Select from 'react-select';
import { Button } from "reactstrap";
function Dask() {
    const [dask, setDask] = useState({
       
    });
    const { userId } = useParams()
    const [userInfo, setUserInfo] = useState(null);
    const [sigortaPrim, setSigortaPrim] = useState(null)
    const [cities, setCity] = useState([])
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [homeInfo, sethomeInfo] = useState({
        city: '',
        district: '',
        buildingStyle: '',
        constructionYear: '',
        numberofFloors: '',
        area: 0,
        selection: ''
      });
      const [styles, setStyles] = useState([])
      const [years, setYears] = useState([])
      const[coeffcients, setCoeffcients] = useState([])
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

      useEffect(() => {
        fetchStyles();
    }, []);
    
    const fetchStyles = async () => {
        try {
            const response = await axios.get('/api/1.0/style/allStyle'); 
            const styles = response.data;
  
            console.log(styles);
            setStyles(styles);
        } catch (error) {
            console.error('Error fetching styles:', error);
        }
    };
    useEffect(()=>{
        fetchCity();
    },[])
    const fetchCity=async () => {
        try{
            const response=await axios.get("/api/1.0/cities")
            const cities=response.data;
            console.log(cities)
            setCity(cities);
        }catch(error){
            console.error('error fetching cities',error);
        }
    }
    // const handleCityChange = async (selectedOption) => {
    //   setCity(selectedOption);
    //   if (selectedOption) {
    //     try {
    //       const response = await axios.get(
    //         `/api/1.0/${selectedOption.value}/districts`
    //       );
    //       const districtsData = response.data;
    //       setDistricts(districtsData);
    //     } catch (error) {
    //       console.error("Error fetching districts", error);
    //     }
    //   } else {
    //     setDistricts([]);
    //     setSelectedDistrict(null);
    //   }
    // };
    const handleCityChange = async (selectedOption) => {
      // Seçilen şehrin ID'sini kullanarak ilçeleri API'den çekin ve districts state'ini güncelleyin
      const cityId = cities.find((city) => city.name === selectedOption.value).id;
      try {
        const response = await axios.get(`/api/1.0/${cityId}/districts`);
        const districtsData = response.data;
        setDistricts(districtsData);
        handleHomeInfoChange(selectedOption,'city')
        setSelectedDistrict(null); // İl değiştiğinde ilçeyi sıfırla
      } catch (error) {
        console.error("Error fetching districts", error);
      }
    };
    
    const handleDistrictChange = (selectedOption) => {
      setSelectedDistrict(selectedOption);
      // Burada homeInfo'daki district'i güncellemeyi unutmayın
      handleHomeInfoChange(selectedOption, 'district');
    };
    
    
    
    
    
    
    useEffect(() => {
        fetchYears();
    }, []);
    
    const fetchYears = async () => {
        try {
            const response = await axios.get('/api/1.0/year/allYear'); 
            const years = response.data;
  
            console.log(years);
            setYears(years);
        } catch (error) {
            console.error('Error fetching years:', error);
        }
    };
    useEffect(() => {
        fetchCoeffcients();
    }, []);
    
    const fetchCoeffcients = async () => {
        try {
            const response = await axios.get('/api/1.0/coefficient/allCoeffcient'); 
            const coeffcients = response.data;
  
            console.log(coeffcients);
            setCoeffcients(coeffcients);
        } catch (error) {
            console.error('Error fetching coeffcients:', error);
        }
    };

    const handleCreateHome=async()=>{
        try{
            const response=await axios.post('/api/1.0/homes',homeInfo)
            const newHomeId=response.data.id;
            console.log(response.data.id)
            sethomeInfo({...homeInfo,id:newHomeId})
        }catch(error){
            console.error("Error creating")
        }
    }
    // const handleHomeInfoChange=(selectedOption, fieldName)=>{
    //     sethomeInfo({...sethomeInfo,[fieldName]:selectedOption.value})
    // }
    const handleHomeInfoChange = (selectedOption, fieldName) => {
        sethomeInfo(prevHomeInfo => ({
            ...prevHomeInfo,
            [fieldName]: selectedOption.value
        }));
    };
    const handleCalculateDask= async () => {
        try {
          const response = await axios.post('/api/1.0/dask/calculateDaskPrice', {
            user: userInfo,
            home: homeInfo,
            ...dask
          });
          const calculatedPrice = response.data.sigortaPrim;
          console.log(response.data)
          console.log(response.data.sigortaPrim)
          console.log(calculatedPrice);
        //  setFiyat(response.data.sigortaPrim);
         //setFiyat(calculatedPrice)
         setSigortaPrim(calculatedPrice.sigortaPrim);
           
        } catch (error) {
          console.error('AxiosError:', error);
          if (error.response) {
            console.error('Response Status:', error.response);
            console.error('Response Data:', error.response.data);
        }
        }
      };
      
      const handleSaveDask = async () => {
        try {
          const response = await axios.post('/api/1.0/dask/saveDask', {
            user: userInfo,
            home:homeInfo,
            ...dask
          });
          // const calculatedPrice = response.data.fiyat;
          // console.log(response.data)
          // console.log(response.data.fiyat)
          // console.log(calculatedPrice);
          // setFiyat(response.data);
           // Teklifi sıfırla
        } catch (error) {
          console.error('AxiosError:', error);
        }
      };
     

  return (
    <div className="container">
        <h1>Dask Hesaplama</h1>
        <div className="row g-3">
            <div className='col-md-4'>
                İL
                <Select
                  value={cities.find((city) => city.value === homeInfo.city)}
                  onChange={(selectedOption) => handleCityChange(selectedOption)}
                  
                  options={cities.map((city) => ({ value: city.name, label: city.name }))}
                  placeholder='Seçiniz'
                
                />
            </div>
            <div className='col-md-4'>
                İlçe
                <Select
                 value={selectedDistrict}
                 onChange={(selectedOption) => handleDistrictChange(selectedOption)}
                 options={districts.map((district) => ({ value: district.name, label: district.name }))}
                 placeholder='Seçiniz'
                />
            </div>
            <div className="col-md-8">
                Bina Yapı Tarzı
                <Select
                value={styles.find(option => option.value === homeInfo.buildingStyle)}
                onChange={(selectedOption) => handleHomeInfoChange(selectedOption, 'buildingStyle')}
                options={styles.map(option => ({ value: option, label: option }))}
                placeholder="Seçiniz"
                />
            </div>
            <div className="col-md-8">
                Bina İnşa Yili
                <Select
                value={years.find(option => option.value === homeInfo.constructionYear)}
                onChange={(selectedOption) => handleHomeInfoChange(selectedOption, 'constructionYear')}
                options={years.map(option=> ({ value: option, label: option }))}
                placeholder="Şeçiniz"
                />
            </div>
            <div className="col-md-8">
                Toplam Kat Sayısı
                <Select 
                value={coeffcients.find(option => option.value === homeInfo.numberofFloors)}
                onChange={(selectedOption) => handleHomeInfoChange(selectedOption, 'numberofFloors')}
                options={coeffcients.map(option=> ({ value: option, label: option }))}
                placeholder="Şeçiniz"
                />
            </div>
            <div className="col-md-8">
                <label>Daire Yüzölçümü (Brüt)</label>
                <input className="form-control" 
                type='number'
                name='area'
                value={homeInfo.area}
                onChange={(e) => handleHomeInfoChange(e.target, 'area')}
                
                required
                placeholder="m2"/>
            </div>
            <div className="col-md-8">
                Yenileme Seçimi
                <Select
                placeholder="Şeçiniz"
                />
            </div>  
            <div className="col-md-8">
                <Button className="btn btn-success" onClick={handleCreateHome}>
                    Kaydet
                </Button>
            </div>
            <button type='button' className='btn btn-warning' onClick={handleCalculateDask} >
        Dask Teklifi Al
      </button>
      <Button type="button" className='btn btn-darning' onClick={handleSaveDask}>
            Teklifi kabul Et
      </Button>
      <button className="btn btn-danger">
      <Link className='nav-link' to={"/anasayfa"}>
            Reddet
        </Link>
      </button>
      
      {sigortaPrim !== null && <p>Fiyat: {sigortaPrim}</p>}
      
        </div>
    </div>
  )
}

export default Dask