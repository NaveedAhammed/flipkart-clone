import axios from 'axios';
import { fetchingEnd, fetchingStart } from '../redux/fetchRedux';

const URL = "http://localhost:8001";

export const signUp = async (dispatch, data) => {
    dispatch(fetchingStart());
    try {
        const response = await axios.post(`${URL}/signup`, data);
        dispatch(fetchingEnd());
        localStorage.setItem("user", JSON.stringify(response?.data));
        return {
            data: response.data
        }
    } catch (err) {
        dispatch(fetchingEnd());
        return {
            error: err.response.data.message
        }
    }
}

export const signIn = async (dispatch, data) => {
    dispatch(fetchingStart());
    try {
        const response = await axios.post(`${URL}/signin`, data);
        dispatch(fetchingEnd());
        localStorage.setItem("user", JSON.stringify(response?.data));
        return {
            data: response.data
        }
    } catch (err) {
        dispatch(fetchingEnd());
        return {
            error: err.response.data.message
        }
    }
}

export const getProducts = async () => {
    try {
        const response = await axios.get(`${URL}/getProducts`);
        return {
            data: response.data
        }
    } catch (err) {
        console.log(err);
    }
}

export const getProduct = async (dispatch, productId) => {
    dispatch(fetchingStart());
    try {
        const response = await axios.get(`${URL}/products/${productId}`);
        dispatch(fetchingEnd());
        return {
            data: response.data
        }
    } catch (err) {
        dispatch(fetchingEnd());
        console.log(err);
    }
}

export const payment = async (data) => {
    try {
        let response = await axios.post(`${URL}/payment`, data)
        return response.data
    } catch (err) {
        console.log(err);
    }
}