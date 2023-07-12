import axios from 'axios';
import { API, IMAGES_API, IMAGES_API_KEY } from './config';
import { ApiParams } from '../types';

const getBeer = (id: string) => axios.get(`${API}breweries/${id}`);
const getBeerImages = () => axios.get(`${IMAGES_API}search?query=craft%20beers&per_page=5`, { headers: { Authorization: IMAGES_API_KEY } })
const getBeerList = (params?: ApiParams) => axios.get(`${API}breweries/`, { params });

/**
 * @param size Int between 1 and 50. Default is 3.
 * @returns New promise with api call for random beer list.
 */
const getRandomBeerList = (size = 3) =>
  axios.get(`${API}breweries/random`, {
    params: { size },
  });

const searchBeerList = (query: string, isAutoComplete = false) =>
  axios.get(`${API}breweries/${isAutoComplete ? 'autocomplete' : 'search'}`, {
    params: { query },
  });

const getBeerMetaData = (params?: ApiParams) => axios.get(`${API}breweries/meta`, { params });

export { getBeer, getBeerImages, getBeerList, getRandomBeerList, searchBeerList, getBeerMetaData };
