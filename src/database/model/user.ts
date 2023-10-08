export default interface User {
  id: string;
  firstName: string;
  lastName:string;
  email: string;
  password?: string;
  profilepicurl?: string;
  isActive?:Boolean;
  uuid?:string;
}