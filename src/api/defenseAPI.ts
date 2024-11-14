import axios from 'axios';

const BASE_URL = "http://localhost:8200/war";

export const interceptAttackAPI = async (dto: { attackId: string, interceptorType: string }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/defend`,
      { attackId: dto.attackId, interceptorType: dto.interceptorType }, 
      {
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error('Error intercepting attack:', error);
    return { success: false };
  }
};
