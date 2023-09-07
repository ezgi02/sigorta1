import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InsuranceList() {
  const [users, setUsers] = useState([]);
  const [insurances, setInsurances] = useState([]);

  useEffect(() => {
    // Sunucudan verileri çekmek için HTTP isteği yapın
    axios
      .get('/api/1.0/users/all')
      .then((response) => {
        const data = response.data;
        setUsers(data);
        setInsurances(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Veriler alınamadı:', error);
      });
  }, []);

  return (
    <div>
      <h1>Sigortalar</h1>
      <table className="table table-bordered ">
        <thead>
          <tr className="table-primary">
            <th>Kullanıcı Adı</th>
            <th>Kasko</th>
            <th>Traffic</th>
            <th>Dask</th>
          </tr>
        </thead>
        <tbody>
          {insurances.map((insurance, index) => (
            <tr key={index}>
              <td>{insurance.username} {insurance.surname}</td>
              <td>
                <ul>
                  {insurance.kaskoList.map((kasko, kaskoIndex) => (
                    <li key={kaskoIndex}>Fiyat: {kasko.fiyat}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {insurance.trafficList.map((traffic, trafficIndex) => (
                    <li key={trafficIndex}>Fiyat: {traffic.fiyat}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {insurance.daskList.map((dask, daskIndex) => (
                    <li key={daskIndex}>Fiyat: {dask.fiyat}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InsuranceList;
