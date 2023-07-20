import React from "react";
import axios from "axios";
class UserSignupPage extends React.Component {
    state={
        username:null,
        surname:null,
        tc:null,
        phone:null,
    }
    onChange=event=>{
        const {name,value} = event.target
         this.setState({
            [name]:value
        })
    }
    onClickSignup=event=>{
        event.preventDefault();
        const body={
            username:this.state.username,
            surname:this.state.surname,
            tc:this.state.tc,
            phone:this.state.phone
        }
        axios.post("/api/1.0/users",body)
    }
    render() {
        return (
            <div className="container">
                 <form>
               <h1 className="text-center">Arabam Sigortama Hoşgeldiniz</h1> 
               <div className="form-group">
                    <label>Kullanici Adi:</label>
                    < input className="form-control" name="username" onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Kullanici Soyadi:</label>
                    <input className="form-control" name="surname" onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Ruhsat Sahibi TC:</label>
                    <input className="form-control" name="tc"onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Cep Telefonu:</label>
                    <input className="form-control" name="phone"onChange={this.onChange}/>
                </div>
                
                <button className="btn btn-primary" onClick={this.onClickSignup}>Kargo Sigortasi Teklifi Al</button>
            </form>
            </div>
            

        )
    }
}
export default UserSignupPage;