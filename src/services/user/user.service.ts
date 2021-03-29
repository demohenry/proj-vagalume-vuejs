import { ApiService } from '../api.service';
import { TokenService } from '../auth/storage.service';

export class AuthenticationError extends Error {
  constructor(public errorCode: any, public message: any) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

export const UserService = {
  login: async function (username: string, password: string) {
    const requestData = {
      username,
      password,
    };

    try {
      if(username === 'projetoselecao' && password === 'Selec@o1'){
        const { data }:any = await ApiService.post('/login', requestData);
        return data;
      }
      else{
        throw new Error('Usuário e/ou Senha inválidos.')
      }
    } catch (error) {
      throw new AuthenticationError(401, error.message);
    }
  },
  
  logout() {
    TokenService.removeToken();
    ApiService.removeHeader();
},
};
