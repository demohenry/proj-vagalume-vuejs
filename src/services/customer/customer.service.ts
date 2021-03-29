import { ApiService } from '@/services/api.service';

const CustomerService = {
  list: async () => {
    try {
      const { data }: any = await ApiService.get('/get_clients');
      return data;
    } catch (error) {
      throw error;
    }
  },

  get: async (id: number) => {
    try {
      const {
        data: { data },
      }: any = await ApiService.get(`/get_client_data/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export { CustomerService };
