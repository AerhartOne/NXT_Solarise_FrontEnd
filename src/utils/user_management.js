import React from 'react';
import Axios from 'axios';

export default class UserManagement {

    static loginUser(userDetails) {
        let formData = new FormData()
        formData.append('username', userDetails.username)
        formData.append('password', userDetails.password)
        return Axios.post("http://localhost:5000/api/users/login", formData)
        .then(result => {
            localStorage.setItem('jwt_token', result.data.access_token)
            localStorage.setItem('refresh_token', result.data.refresh_token)
            console.log(result)
        })
    }

    static logoutUser() {
        localStorage.removeItem('jwt_token')
        localStorage.removeItem('refresh_token')
    }

}