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

    static signupUser(userDetails) {
        let formData = new FormData()
        formData.append('username', userDetails.username)
        formData.append('email', userDetails.email)
        formData.append('password', userDetails.password)
        formData.append('first_name', userDetails.firstName)
        formData.append('last_name', userDetails.lastName)
        return Axios.post("http://localhost:5000/api/users/new", formData)
        .then(result => {
          console.log(result)
        })
    }

    static editUser(userDetails) {
        let formData = new FormData()
        formData.append('email', userDetails.email)
        formData.append('password', userDetails.password)
        formData.append('first_name', userDetails.firstName)
        formData.append('last_name', userDetails.lastName)
        return Axios.post("http://localhost:5000/api/users/self/edit", formData, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')}})
        .then(result => {
          console.log(result)
        })
    }

}