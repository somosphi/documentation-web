import { HttpIntegration } from '../http-integration';
import { DocInformation } from './dto/doc-information';

export class DocsBackendIntegration extends HttpIntegration {
  getBaseURL(url: any) {
    return this.axiosInstance.defaults.baseURL + url;
  }

  async getDocs() {
    const response = await this.axiosInstance.get('/namespaces');
    return response.data.data;
  }

  async getYaml(doc: any): Promise<string | null> {
    try {
      const response = await this.axiosInstance.get(doc.location);
      return response.data;
    } catch (err) {
      return null;
    }
  }
}
