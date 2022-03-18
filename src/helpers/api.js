import axiosInstance from './api.config';

export const signup = async (payload) => {
    try {
        const result = await axiosInstance.post(`/auth/register`, payload);
        return result.data;
    } catch (error) {
        throw error.response;
    }
};

export const login = async (payload) => {
    try {
        const result = await axiosInstance.post(`/auth/login`, payload);
        return result.data;
    } catch (error) {
        throw error.response;
    }
};

export const fetchOrders = async () => {
    try {
        const result = await axiosInstance.get(`/orders`);
        return result.data;
    } catch (error) {
        throw error.response;
    }
};

export const addOrder = async (payload) => {
    try {
        const result = await axiosInstance.post(`/orders`, payload);
        return result.data;
    } catch (error) {
        throw error.response;
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const result = await axiosInstance.delete(`/orders/${orderId}`);
        return result.data;
    } catch (error) {
        throw error.response;
    }
};
