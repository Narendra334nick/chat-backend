export default interface User {
  id: number;
  firstName: string;
  lastName:string;
  email: string;
  password?: string;
  profilepicurl?: string;
  isActive?:Boolean;
  uuid?:string;
}