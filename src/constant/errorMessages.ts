export const enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003',
}

export const enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  FILED_ERROR = 422,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}
const enum IERROR {
  'SUCCESS' = 'Success',
  'LOGIN_SUCCESS' = 'Login Successfull',
  'SIGNUP_SUCCESS' = 'Signup Successfull',
  'MAIL_SUCCESS' = 'Kindly check your email for further instructions',
  'LOGIN_FAILED' = 'Login Failed',
  'UNAUTHORIZED' = 'Authentication Failure',
  'INVALID_USER_PASSWORD' = 'Incorrect Username/Password!',
  'INVALID_TOKEN' = 'Access Token is Invalid!',
  'INVALID_REFRESH_TOKEN' = 'Refresh Token is Invalid!',
  'UNSUPPORTED_FILE' = 'File Format Not Supported!',
  'INVALID_DATA' = 'Invalid Data!',
  'INVALID_REQUEST' = 'Invalid Request',
  'INVALID_PASSWORD' = 'Password must contain at least one uppercase, one lowercase, one symbol and at least min 8 and max 20 digits in length!',
  'INVALID_PHONE' = 'Phone number is invalid!',
  'INVALID_EMAIL' = 'Invalid Emailid!',
  'INVALID_URL' = 'Not a valid URL!',
  'TOKEN_REQUIRED' = 'Access Token is Required!',
  'REFRESH_TOKEN_REQUIRED' = 'Refresh Token is Required!',
  'FILE_REQUIRED' = 'Filepath/URL is Required!',
  'NOT_FOUND' = 'File Not Found!',
  'INVALID_NAME' = 'Name should be of atleast 3 digit!',
  'INVALID_FNAME' = 'First name should be of atleast 3 digit!',
  'INVALID_LNAME' = 'Last name should be of atleast 3 digit!',
  'INVALID_CPASSWORD' = 'Confirm Password should be same as Password',
  'PASSWORD_REQUIRED' = 'Please enter correct password!',
  'ROLE_REQUIRED' = 'User Role Required!',
  'CAMPUS_REQUIRED' = 'Campus Name Is Required!',
  'MAIL_FAILED' = 'Email Sending Failed',
  'SERVER_ERROR' = 'Internal Server Error!',
  'USER_EXISTS' = 'User already registered!',
  'BAD_PARAMETER' = 'Bad Parameters!',
  'SESSION_EXPIRE' = 'Session Expired!',
  'APPROVAL_PENDING' = 'Pending For Approval',
  'BAD_REQUEST' = 'Bad Request!',
  'NO_DATA' = 'Data Not Available!',
  'PROD_ERROR' = 'Something wrong happened!',
  'FIELD_ERROR' = 'Some fields are invalid!',
}

export default IERROR;