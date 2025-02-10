import axios from 'axios';

const axiosPublic = axios.create({
	baseURL: 'https://gamebds.com',
	
});

const useAxiosPublic = () => {
	return axiosPublic;
};

export default useAxiosPublic;