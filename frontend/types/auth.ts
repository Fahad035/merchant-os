export interface Merchant {
  id: string;
  business_name: string;
  owner_name: string;
  email: string;
  industry: string;
}

export interface SignupPayload {
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  industry: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}