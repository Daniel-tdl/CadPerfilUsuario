import React, { Component } from 'react'
import axios from 'axios'
import { getToken } from "../services/auth";

const baseUrl = 'http://localhost:3000/usuarios'
const initialState = {
    user: { nome: '', usuario: '' , senha: ''},
    list: []
}

export default class Home extends Component {

    state = { ...initialState }

    componentWillMount() {
        const method = 'get'
        const USER_TOKEN = getToken();
        const AuthStr = 'Bearer '.concat(USER_TOKEN)
        
        axios[method](baseUrl, 
            { headers: { Authorization: AuthStr } })
        .then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const USER_TOKEN = getToken();
        const AuthStr = 'Bearer '.concat(USER_TOKEN)

        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        console.log(AuthStr)
        console.log(user)

        axios[method](url, 
                { headers: { Authorization: AuthStr } })
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    ConsultarUsuarios() {
        const USER_TOKEN = getToken();
        const AuthStr = 'Bearer '.concat(USER_TOKEN)

        const method = 'get'
        const url = baseUrl
        console.log(url)
        console.log(AuthStr)

        axios[method](url, 
                { headers: { Authorization: AuthStr } })
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ user: initialState.user, list })
            })   
    }

    getUpdateList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if (add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                           <label> Nome: </label>
                           <input type="text" className="form-control"  
                                name="nome" 
                                value={this.state.user.nome} 
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome... " /> 
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label> Usuario: </label>
                           <input type="text" className="form-control"  
                                name="usuario" 
                                value={this.state.user.usuario} 
                                onChange={ e => this.updateField(e)}
                                placeholder="Digite o Usuario... " />   
                        </div>
                    </div>   

                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label> Senha: </label>
                           <input type="text" className="form-control"  
                                name="senha" 
                                value={this.state.user.senha} 
                                onChange={ e => this.updateField(e)}
                                placeholder="Digite o senha... " />   
                        </div>
                    </div>  
                </div>

                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div> 
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        const USER_TOKEN = getToken();
        const AuthStr = 'Bearer '.concat(USER_TOKEN)
        console.log(AuthStr)

        axios.delete(`${baseUrl.concat('/excluir')}/${user.id}`, { headers: { Authorization: AuthStr } })
            .then(resp => {
            const list = this.getUpdateList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Usuario</th>
                        <th>Acoes</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}> 
                    <td>{user.id}</td> 
                    <td>{user.nome}</td>    
                    <td>{user.usuario}</td>
                    <td>
                        <button className="btn btn-warning" 
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                            Editar
                        </button> 
                        <button className="btn btn-danger " 
                            onClick={() => this.remove(user)}>
                           <i className="fa fa-trash"></i> 
                           Excluir
                        </button>
                    </td> 
                </tr>    
            )
        })
    }    


    render() {
        return (
            <div>
                {this.renderForm()}
                {this.renderTable()}
            </div>
        )
    }
}