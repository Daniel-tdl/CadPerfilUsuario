import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { history } from '../main/history';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: '',
            senha: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    login() {
        const URL = 'http://localhost:3000'
        const method = 'post'
        
        axios[method](URL.concat('/login'), this.state) 
            .then(resp => {
                localStorage.setItem("access_token", resp.data.token);
                localStorage.setItem("expire_at", resp.data.exp);
                history.push('/home')
            })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { usuario, senha } = this.state;
        if (usuario && senha) {
            this.login();
        }
    } 
    
    render() {
        const { usuario, senha } = this.state;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (!usuario ? ' has-error' : '')}>
                        <label htmlFor="usuario">usuario</label>
                        <input type="text" className="form-control" name="usuario" value={usuario} onChange={this.handleChange} />
                    </div>
                    <div className={'form-group' + ( !senha ? ' has-error' : '')}>
                        <label htmlFor="senha">senha</label>
                        <input type="senha" className="form-control" name="senha" value={senha} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        <Link to="/registrar" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;