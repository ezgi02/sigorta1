import React from "react";
import { giris } from "../api/apiCalls";
import Input from "../components/Input"
import { useNavigate } from "react-router-dom";

const UserSignupPage = () => {
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        username: "",
        surname: "",
        tc: "",
        phone: "",
        birthDate: "",
        pendingApiCall: false,
        errors: {},
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        const errors = { ...state.errors };
        errors[name] = undefined;
        setState({ ...state, [name]: value, errors });
    };

    const onClickSignup = async (event) => {
        event.preventDefault();
        const body = {
            username: state.username,
            surname: state.surname,
            tc: state.tc,
            phone: state.phone,
            birthDate: state.birthDate,
        };
        setState({ ...state, pendingApiCall: true });
        try {
            const response = await giris(body);
            console.log(response.data)
            const userId=response.data
            //const userId = response.data.userId;
            
            //console.log(response.data.userId)
            //console.log(userId)
            setState({ ...state, pendingApiCall: false })
            navigate(`/users/${userId}/sigorta`); // Yönlendirme işlemini yap
        } catch (error) {
            if (error.response.data.validationErrors) {
                setState({ ...state, errors: error.response.data.validationErrors });
            }
        }
        setState({ ...state, pendingApiCall: false });
    };

    const { pendingApiCall, errors } = state;
    const { username, surname } = errors;

    return (
        <div className="container">
            <form>
                <h1 className="text-center">Sigortama Hoşgeldiniz</h1>
                <Input name="username" label="Kullanici Adi" error={username} onChange={onChange} />
                <Input name="surname" label="Kullanici Soyadi" error={surname} onChange={onChange} />

                <div className="form-group">
                    <label>Ruhsat Sahibi TC:</label>
                    <input className="form-control" name="tc" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label>Cep Telefonu:</label>
                    <input className="form-control" name="phone" onChange={onChange} />
                </div>

                <div className="form-group">
                    <label>Doğum Tarihi:</label>
                    <input type="date" className="form-control" name="birthDate" onChange={onChange} />
                </div>

                <button className="btn btn-primary" onClick={onClickSignup} disabled={pendingApiCall}>
                    Kaydet
                </button>
            </form>
        </div>
    );
};

export default UserSignupPage;
