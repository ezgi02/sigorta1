import axios from "axios"
export const giris=(body)=>{
    return axios.post('/api/1.0/users',body)
}