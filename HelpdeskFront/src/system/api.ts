// api.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { msalInstance } from '../main';
import { tokenRequest } from './authConfig';

// 기본 URL 설정
const BASE_URL = 'http://localhost:7002';

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getToken = async () => {
  const account = msalInstance.getActiveAccount();
  if (!account) {
      throw new Error("No active account! Verify a user has been signed in.");
  }

  const response = await msalInstance.acquireTokenSilent({
      ...tokenRequest,
      account: account,
    });
    
    return response.accessToken;
  }

apiClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// GET 요청을 처리하는 함수
export const getRequest = async <T>(endpoint: string, params?: object): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// POST 요청을 처리하는 함수
export const postRequest = async <T, U>(endpoint: string, data: U): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// PATCH 요청을 처리하는 함수
export const patchRequest = async <T, U>(endpoint: string, data: U): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.patch(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const handleDownload = (fileId, filename) => {
  axios({
    url: `${BASE_URL}/ticketmanagement/downloadfile/${fileId}`,
    method: 'GET',
    responseType: 'blob',
  })
  .then(response => {
    // 다운로드를 위해 브라우저에서 파일을 생성하고 링크를 클릭
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  })
  .catch(error => {
    console.error('There was an error downloading the file!', error);
  });
};

// 오류 처리 함수
const handleError = (error: AxiosError) => {
  // 여기에 오류 처리 로직을 추가하세요
  console.error('API 호출 중 오류 발생:', error.message);
};

