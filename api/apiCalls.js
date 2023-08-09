import axios from "axios"
export const giris=(body)=>{
    return axios.post('/api/1.0/users',body)
}


export const getUsers = () => {
  return axios.get('/api/1.0/users');
};


export const deleteUser = (userId) => {
  return axios.delete(`/api/1.0/users/${userId}`);
};

export const getOneUser=(userId)=>{
  return axios.get(`/api/1.0/users/${userId}`);
}
export const updateOneUser=(userId,updatedUser)=>{
  return axios.put(`/api/1.0/users/${userId}`,updatedUser)
}