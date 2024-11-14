import axios from 'axios';

const BASE_URL = "http://localhost:8200/war"

export const launchAttackAPI = async (missileType: string, targetRegion: string) => {
  const response = await axios.post(`${BASE_URL}attack`, 
    { missileType, targetRegion },
    {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }
   );
  return response.data;
};

export const fetchAttackLogsAPI = async () => {
  const response = await axios.get(
    `${BASE_URL}/logs`,
  {
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  });
  return response.data;
};
