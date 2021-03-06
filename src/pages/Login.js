import React, { Component } from 'react'
import '../assets/css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl="http://localhost/ecomoving/public/api/login_check";
const cookies = new Cookies();

    class Login extends Component{    
        state={
            form:{
                username: '',
                password: ''
            }
        }

        handleChange=async e=>{
            await this.setState({
                form:{
                    ...this.state.form,
                    [e.target.name]: e.target.value
                }
            });
            console.log(this.state.form);
        }

        iniciarSesion=async()=>{
            await axios.post(baseUrl, {username: this.state.form.username, password: (this.state.form.password)})
            .then(response=>{
                //console.log(response.data.token);
                return response.data;
                
            })
            .then(response=>{
                console.log(response.token);
                if(response.token){
                    var respuesta=response.token;
                    cookies.set('token', respuesta, {path: "/"});
                    alert(`Bienvenido`);
                    window.location.href="./dashboard";
                }else{
                    alert('El usuario o la contraseña no son correctos');
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }

        componentDidMount() {
            if(cookies.get('token')){
                window.location.href="./dashboard";
            }
        }


        render() {
            return (
                <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                    <label>Usuario: </label>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={this.handleChange}
                    />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={this.handleChange}
                    />
                    <br />
                    <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
                    </div>
                </div>
                </div>
            ); 
        }
    }

export default Login;