import React from 'react';
import { logout } from "../services/auth";
import { history } from '../main/history';

class Home extends React.Component {
    onClicando(e) {
        e.preventDefault();
        logout()
        history.push('/login')
    } 

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <button className="btn btn-primary" onClick={this.onClicando}>Login</button>
            </div>
        )
    }
}
export default Home;