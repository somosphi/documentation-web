import * as axios from 'axios';

export abstract class HttpIntegration {
  constructor(protected readonly axiosInstance: axios.AxiosInstance) {}
}
