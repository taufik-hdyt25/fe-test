export interface IUsers {
  address: IAddress;
  age: number;
  bank: IBank;
  birthDate: string;
  bloodGroup: string;
  company: ICompany;
  crypto: ICrypto;
  ein: string;
  email: string;
  eyeColor: string;
  firstName: string;
  gender: string;
  hair: IHair;
  height: number;
  id: number;
  image: string;
  ip: string;
  lastName: string;
  macAddress: string;
  maidenName: string;
  password: string;
  phone: string;
  role: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
}

interface IHair {
  color: string;
  type: string;
}
interface ICrypto {
  coin: string;
  wallet: string;
  network: string;
}
interface IBank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface ICompany {
  address: IAddress;
  department: string;
  name: string;
  title: string;
}

interface IAddress {
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
  country: string;
  postalCode: string;
  state: string;
  stateCode: string;
}
