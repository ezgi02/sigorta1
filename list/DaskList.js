import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DaskList() {
    const [dasks, setDasks] = useState([]);
    useEffect(() => {
        axios.get('/api/1.0/dask')
          .then(response => {
            setDasks(response.data);
          })
          .catch(error => {
            console.error('Error fetching dask insurances:', error);
          });
      }, []);


      const deleteDask = async (daskId) => {
        return axios.delete(`/api/1.0/dask/${daskId}`);
      };
      const handleDeleteDask = async (daskId) => {
        try {
          await deleteDask(daskId);
          
          const response = await axios.get('/api/1.0/dask');
          setDasks(response.data);
        } catch (error) {
          console.error('Error deleting dask insurance:', error);
        }
      };
  return (
  <div>
    <h2>Dask Sigorta Listesi</h2>
      <table className="table table-bordered"> 
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Dask Adres</th>
            <th>Dask Sigorta Bedeli</th>
            <th>Sigorta Primi</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {dasks.map(dask => (
            <tr key={dask.id}>
              <td>{dask.id}</td>
              <td>{dask.user.username} {dask.user.surname}</td>
              <td>{dask.home.city} </td>
              <td>{dask.fiyat}</td>
              <td>{dask.sigortaPrim}</td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={()=>handleDeleteDask(dask.id)}>
                    Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
  )
}

export default DaskList