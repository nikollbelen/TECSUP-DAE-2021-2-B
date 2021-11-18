import React from 'react'
import { useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
    let params = useParams();
    return (
        <div style={{
            backgroundColor: '#8bb271',
            color: 'white',
            height: '100vh',
            textAlign: 'center',
            paddingTop: 100
        }}>
            <h1>Usuarios</h1>
            <p>id : {params.id}</p>
        </div>)
}

export default Users;

