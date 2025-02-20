
import axios from 'axios';
import { GraphNode, DependencyResponse, ConfigurationType } from '../types/graph';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your actual API base URL

export const getGraph = async (): Promise<GraphNode[]> => {
  // Mocked response for now
  const response = await axios.get(`${API_BASE_URL}/graph`);
  return response.data;
};

export const getDependencies = async (flow: string): Promise<string[]> => {
  const response = await axios.get(`${API_BASE_URL}/dependencies?flow=${flow}`);
  return response.data;
};

export const getConfiguration = async (flow: string): Promise<ConfigurationType> => {
  const response = await axios.get(`${API_BASE_URL}/configuration?flow=${flow}`);
  return response.data;
};

export const saveConfiguration = async (config: ConfigurationType): Promise<void> => {
  await axios.post(`${API_BASE_URL}/configuration`, config);
};
