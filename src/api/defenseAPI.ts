import axios from 'axios';

const BASE_URL = "http://localhost:8200/war";

export const interceptAttackAPI = async (attackId: string) => {
  const response = await axios.post(
    `${BASE_URL}/defend`,
    { attackId },
    {
      headers: {
        "Authorization": localStorage.getItem("token"),
      },
    }
  );
  return response.data;
};

export const fetchPendingAttacksAPI = async () => {
  const response = await axios.get(
    `${BASE_URL}/logs`, 
    {
      headers: {
        "Authorization": localStorage.getItem("token"),
      },
    }
  );
  return response.data;
};
