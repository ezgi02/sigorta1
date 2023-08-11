import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrafficInsuranceTable() {
    const [trafficInsurances, setTrafficInsurances] = useState([]);

    useEffect(() => {
      axios.get('/api/1.0/traffic')
        .then(response => {
          setTrafficInsurances(response.data);
        })
        .catch(error => {
          console.error('Error fetching traffic insurances:', error);
        });
    }, []);
  
    const deleteTraffic = async (insuranceId) => {
      return axios.delete(`/api/1.0/traffic/${insuranceId}`);
    };
  
    const handleDeleteTraffic = async (insuranceId) => {
      try {
        await deleteTraffic(insuranceId);
        
        const response = await axios.get('/api/1.0/traffic');
        setTrafficInsurances(response.data);
      } catch (error) {
        console.error('Error deleting traffic insurance:', error);
      }
    };

  return (
    <div>
      <h2>Traffic Insurance List</h2>
      <table className="table table-bordered"> 
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Car</th>
            <th>Price</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {trafficInsurances.map(insurance => (
            <tr key={insurance.id}>
              <td>{insurance.id}</td>
              <td>{insurance.user.username} {insurance.user.surname}</td>
              <td>{insurance.car.marka} </td>
              <td>{insurance.fiyat}</td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={()=>handleDeleteTraffic(insurance.id)}>
                    Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrafficInsuranceTable;
