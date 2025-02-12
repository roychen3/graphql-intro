import { RESTDataSource } from '@apollo/datasource-rest';

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};
type Geo = {
  lat: string;
  lng: string;
};
type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export class UserAPI extends RESTDataSource {
  override baseURL = 'https://jsonplaceholder.typicode.com/';

  async getUsers(): Promise<User> {
    const data = await this.get<User>(`users`);
    return data
  }
}
