import axios from 'axios';

const API_URL = '/api/products'; 

const getProducts = async (organizationId, reverseSort = false, page = 1, size = 36, appId, apiKey) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        organization_id: "85c76b135534056949dbe1e331bfd70",
        reverse_sort: reverseSort,
        page: page,
        size: size,
        Appid: "IATTNAK97F6A7AO",
        Apikey: "39a09a6f96aa439fb01e28aec781818220240712124513936181"
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default getProducts;


