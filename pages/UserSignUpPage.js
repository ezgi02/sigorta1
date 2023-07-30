import React from "react";
import { giris } from "../api/apiCalls";
import Input from "../components/Input"
class UserSignupPage extends React.Component {
    state={
        username:null,
        surname:null,
        tc:null,
        phone:null,
        pendingApiCall:false,
        errors:{}
    }
    onChange=event=>{
        const {name,value} = event.target
        const errors={...this.state.errors}
        errors[name]=undefined
         this.setState({
            [name]:value,
            errors
        })
    }
    onClickSignup=async event=>{
        event.preventDefault();
        const body={
            username:this.state.username,
            surname:this.state.surname,
            tc:this.state.tc,
                
            phone:this.state.phone
        }
        this.setState({pendingApiCall:true})
        try{
            const response=await giris(body)
        }catch(error){
            //console.log(error.response.data)
            if(error.response.data.validationErrors){
                this.setState({errors:error.response.data.validationErrors})
            }
          }  
        this.setState({pendingApiCall:false})
         }

        // giris(body)
        // .then(response=>{
        //     this.setState({pendingApiCall:false})
        // })
        // .catch(error=>{
        //     this.setState({pendingApiCall:false})
        // })
        
   
    render() {
        const {pendingApiCall,errors}=this.state
        const {username,surname}=errors
        return (
            <div className="container">
                 <form>
               <h1 className="text-center">Arabam Sigortama Hoşgeldiniz</h1> 
               <Input name="username" label="Kullanici Adi" error={username} onChange={this.onChange}/>
               <Input name="surname" label="Kullanici Soyadi" error={surname} onChange={this.onChange}/>
               
                <div className="form-group">
                    <label>Ruhsat Sahibi TC:</label>
                    <input className="form-control" name="tc"onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Cep Telefonu:</label>
                    <input className="form-control" name="phone"onChange={this.onChange}/>
                </div>
                
                <button 
                className="btn btn-primary" 
                onClick={this.onClickSignup}
                disabled={this.state.pendingApiCall}
                >Kasko Teklifi Al</button>
            </form>
            </div>
            

        )
    }
}
export default UserSignupPage;
