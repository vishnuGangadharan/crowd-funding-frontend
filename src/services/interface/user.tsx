export interface userFormData {
    name?: string;
    email?: string;
    mobile?: string;
    password?: string;
    confirmPassword?: string;
    profilePicture?: any;
    newPassword?: string | undefined;
    phone?:string;
  }


  export interface PasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export interface PasswordVisibility {
    current: boolean;
    new: boolean;
    confirm: boolean;
  }