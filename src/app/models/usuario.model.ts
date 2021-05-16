export class Usuario {
  constructor(
      public name: string,
      public email: string,
      public password: string,
      public image?: string,
      public role?: string,
      public google?: boolean,
      public uid?: string
  ) { }

  get imageUrl() {
    if (this.image === '' || this.image === null){
      return 'https://res.cloudinary.com/cerradas/image/upload/v1619759513/no-image_jtzopi.png';
    } else {
      return this.image;
    }
    
  }
  
}