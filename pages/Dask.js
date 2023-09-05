import axios from "axios";
import React, { useState,useEffect} from "react"
import {Link, useParams } from 'react-router-dom'
import Select from 'react-select';
import { Button } from "reactstrap";
import "../index.js"

function Dask() {
    const [dask, setDask] = useState({
       
    });
    const { userId } = useParams()
    const [userInfo, setUserInfo] = useState(null);
    const [sigortaPrim, setSigortaPrim] = useState(null)
    const [error, setError] = useState(null);
    const [fiyat,setFiyat]=useState(null)
    const [cities, setCity] = useState([])
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [selection,setSelection]=useState([])
    const [validationErrors, setValidationErrors] = useState({});

    const [homeInfo, sethomeInfo] = useState({
        city: '',
        district: '',
        buildingStyle: '',
        constructionYear: '',
        numberofFloors: '',
        area: 0,
        selection: '',
        address:''
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
    useEffect(() => {
      fetchSelection();
  }, []);
  
  const fetchSelection = async () => {
      try {
          const response = await axios.get('/api/1.0/process/allProcessTypes'); 
          const selection = response.data;

          console.log(selection);
          setSelection(selection);
      } catch (error) {
          console.error('Error fetching selection:', error);
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
    
    const handleCityChange = async (selectedOption) => {
      
      const cityId = cities.find((city) => city.name === selectedOption.value).id;
      try {
        const response = await axios.get(`/api/1.0/${cityId}/districts`);
        const districtsData = response.data;
        setDistricts(districtsData);
        handleHomeInfoChange(selectedOption,'city')
        setSelectedDistrict(null); 
      } catch (error) {
        console.error("Error fetching districts", error);
      }
    };
    
    const handleDistrictChange = (selectedOption) => {
      setSelectedDistrict(selectedOption);

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
        setValidationErrors({ ...validationErrors, [fieldName]: '' });
    };
    const handleCalculateDask= async () => {
        try {
          const response = await axios.post('/api/1.0/dask/calculatePrice', {
            user: userInfo,
            home: homeInfo,
            ...dask
          });
          const calculatedPrice = response.data;
          console.log(response.data)
          //console.log(response.data.sigortaPrim)
          console.log(calculatedPrice);
        //  setFiyat(response.data.sigortaPrim);
         //setFiyat(calculatedPrice)
         setSigortaPrim(calculatedPrice[0]);
         setFiyat(calculatedPrice[1])
         setValidationErrors({});            
        } catch (error) {
          console.error('AxiosError:', error);
          if (error.response && error.response.data) {
            console.error('Response Status:', error.response);
            console.error('Response Data:', error.response.data);
            setValidationErrors(error.response.data.validationErrors);
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
           alert("Dask Sigortası başarılı bie şekilde kaydedildi")
        } catch (error) {
          console.error('AxiosError:', error);
        }
      };
      

  return (
    <div className="container">
        <h1>Dask Hesaplama</h1>
        <div className="row g-3">
            <div className='col-md-4'>
                İl
                <Select className={` ${validationErrors.city ? 'is-invalid' : ''}` } 
                  value={cities.find((city) => city.value === homeInfo.city)}
                  onChange={(selectedOption) => handleCityChange(selectedOption)}
                  
                  options={cities.map((city) => ({ value: city.name, label: city.name }))}
                  placeholder='Seçiniz'
                />  
                 {validationErrors.city && (
                   <div className="invalid-feedback">{validationErrors.city}</div>
                  )}     
           </div>
            <div className='col-md-4'>
                İlçe
                <Select className={` ${validationErrors.district ? 'is-invalid' : ''}` } 
                 value={selectedDistrict}
                 onChange={(selectedOption) => handleDistrictChange(selectedOption)}
                 options={districts.map((district) => ({ value: district.name, label: district.name }))}
                 placeholder='Seçiniz'
                />
                {validationErrors.district && (
                   <div className="invalid-feedback">{validationErrors.district}</div>
                  )} 
            </div>
            <div className="col-md-8">
                Bina Yapı Tarzı
                <Select className={` ${validationErrors.buildingStyle ? 'is-invalid' : ''}` } 
                value={styles.find(option => option.value === homeInfo.buildingStyle)}
                onChange={(selectedOption) => handleHomeInfoChange(selectedOption, 'buildingStyle')}
                options={styles.map(option => ({ value: option, label: option }))}
                placeholder="Seçiniz"
                />
                {validationErrors.buildingStyle && (
                   <div className="invalid-feedback">{validationErrors.buildingStyle}</div>
                  )} 
            </div>
            <div className="col-md-8">
                Bina İnşa Yılı
                <Select className={` ${validationErrors.constructionYear ? 'is-invalid' : ''}` } 
                value={years.find(option => option.value === homeInfo.constructionYear)}
                onChange={(selectedOption) => handleHomeInfoChange(selectedOption, 'constructionYear')}
                options={years.map(option=> ({ value: option, label: option }))}
                placeholder="Şeçiniz"
                />
                {validationErrors.constructionYear && (
                   <div className="invalid-feedback">{validationErrors.constructionYear}</div>
                  )} 
            </div>
            <div className="col-md-8">
                Toplam Kat Sayısı
                <Select className={` ${validationErrors.numberofFloors ? 'is-invalid' : ''}` } 
                value={coeffcients.find(option => option.value === homeInfo.numberofFloors)}
                onChange={(selectedOption) => handleHomeInfoChange(selectedOption, 'numberofFloors')}
                options={coeffcients.map(option=> ({ value: option, label: option }))}
                placeholder="Şeçiniz"
                />
                {validationErrors.numberofFloors && (
                   <div className="invalid-feedback">{validationErrors.numberofFloors}</div>
                  )} 
            </div>
            <div className="col-md-8">
                <label>Daire Yüzölçümü (Brüt)</label>
                <input className={`form-control ${validationErrors.numberofFloors ? 'is-invalid' : ''}` } 
                type='number'
                name='area'
                value={homeInfo.area}
                onChange={(e) => handleHomeInfoChange(e.target, 'area')}
                required
                placeholder="m2"/>
                {validationErrors.area && (
                   <div className="invalid-feedback">{validationErrors.area}</div>
                  )} 
            </div>
            <div className="col-md-8">
                İşlem Tipi
                <Select className={` ${validationErrors.selection ? 'is-invalid' : ''}` } 
                value={selection.find(option => option.value === homeInfo.selection)}
                onChange={(selectedOption) => handleHomeInfoChange(selectedOption, 'selection')}
                options={selection.map(option=> ({ value: option, label: option }))}
                placeholder="Seçiniz"
                />
                {validationErrors.selection && (
                   <div className="invalid-feedback">{validationErrors.selection}</div>
                  )} 
            </div>  
            <div className="col-md-8">
              <label>Adres</label>
              <input className="form-control"
              type="text"
              name="adress"
              value={homeInfo.address}
              onChange={(e) => handleHomeInfoChange(e.target, 'address')}
              placeholder="sokak,mahalle"/>
            </div> 
            <div className="row g-3">
              <div className="col-md-4"> 
              <button type='button' className='btn btn-warning' onClick={handleCalculateDask} >Dask Teklifi Al</button>
              </div>
              <div className="col-md-4">
              <Button type="button" className='btn btn-success' onClick={handleSaveDask}>Teklifi kabul Et</Button>
              </div>
              <div className="col-md-4">
              <button className="btn btn-danger">
              <Link className='nav-link' to={"/anasayfa"}>
              Çıkış
              </Link>
              </button>
              </div>
            </div>

            
        {sigortaPrim !== null && <p>Sigorta Primi: {sigortaPrim}</p>}
        {fiyat !== null && <p>Sigorta Bedeli: {fiyat}</p>}
        </div>
    </div>
  )
}

export default Dask