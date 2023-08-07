import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../api/apiCalls";

const UserListPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Kullanıcılar yüklenirken hata oluştu:", error);
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/users/${userId}/edit`);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const id = parseInt(userId); 
      await deleteUser(id);
      await loadUsers();
    } catch (error) {
      console.error("Kullanıcı silinirken hata oluştu:", error);
    }
  };

  const handleAddInsurance = (userId) => {
    navigate(`/users/${userId}/sigorta`);
  };

  return (
    <div className="container">
      <h1 className="text-center">Kullanıcı Listesi</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>TC</th>
            <th>Cep Telefonu</th>
            <th>Yaş</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.surname}</td>
              <td>{user.tc}</td>
              <td>{user.phone}</td>
              <td>{user.yas}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary mr-1"
                  onClick={() => handleEditUser(user.id)}
                >
                  Düzenle
                </button>
                <button
                  className="btn btn-sm btn-danger mr-1"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Sil
                </button>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleAddInsurance(user.id)}
                >
                  Sigorta Ekle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;
