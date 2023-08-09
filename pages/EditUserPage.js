import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneUser, updateOneUser } from "../api/apiCalls";

const EditUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    surname: "",
    tc: "",
    phone: "",
    birthDate:"",
  });

  useEffect(() => {
    loadUserDetails();
  }, [userId]);

  const loadUserDetails = async () => {
    try {
      const response = await getOneUser(userId);
      setUser(response.data);
    } catch (error) {
      console.error("Kullanıcı detayları yüklenirken hata oluştu:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    /*if (name === "yas" && (value === "" || isNaN(value))) {
        setUser({ ...user, yas: undefined });
      } else {
        setUser({ ...user, [name]: value });
      }*/
    setUser({ ...user, [name]: value });
  };

  const handleUpdateUser = async () => {
    try {
      await updateOneUser(userId, user);
      navigate("/userList"); 

    } catch (error) {
      console.error("Kullanıcı güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Kullanıcı Güncelle</h1>
      <form>
        <div className="form-group">
          <label>Ad</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Soyad</label>
          <input
            type="text"
            name="surname"
            value={user.surname}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>TC</label>
          <input
            type="text"
            name="tc"
            value={user.tc}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Cep Telefonu</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
            <label>Doğum Tarihi:</label>
            <input
            type="text" 
            className="form-control"
            name="birthDate"
            value={user.birthDate}
            onChange={handleInputChange}
            />
            </div>
        <button type="button" onClick={handleUpdateUser} className="btn btn-primary">
          Güncelle
        </button>
      </form>
    </div>
  );
};

export default EditUserPage;
