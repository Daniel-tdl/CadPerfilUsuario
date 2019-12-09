import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { history } from '../main/history';

class Registrar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                nome: '',
                usuario: '',
                senha: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    registrar() {
        const { user } = this.state;
        const URL = 'http://localhost:3000'
        const method = 'post'
        console.log(user)
        axios[method](URL.concat('/registrar'), user) 
            .then(resp => {
                history.push('/login')
            })
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { user } = this.state;
        if (user.nome && user.usuario && user.senha) {
            this.registrar();
        }
    }

    render() {
        const { user } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + ( !user.nome ? ' has-error' : '')}>
                        <label htmlFor="nome">nome</label>
                        <input type="text" className="form-control" name="nome" value={user.nome} onChange={this.handleChange} />
                    </div>
                    <div className={'form-group' + ( !user.usuario ? ' has-error' : '')}>
                        <label htmlFor="usuario">usuario</label>
                        <input type="text" className="form-control" name="usuario" value={user.usuario} onChange={this.handleChange} />
                    </div>
                    <div className={'form-group' + ( !user.senha ? ' has-error' : '')}>
                        <label htmlFor="senha">senha</label>
                        <input type="senha" className="form-control" name="senha" value={user.senha} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default Registrar;