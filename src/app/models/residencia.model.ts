interface _residenciaUser {
  _id: string;
  name: string;
  email: string;
  image: string;
}


export class Residencia {

  constructor(
    public id:string,
    public name: string,
    public full_name: string,
    public rfc: string,
    public address: string,
    public postal_code: string,
    public city: string,
    public state: string,
    public time_zone: string,
    public rules: string,
    public logo: any,
    public plan: string,
    public status: string,
  ) {}
}