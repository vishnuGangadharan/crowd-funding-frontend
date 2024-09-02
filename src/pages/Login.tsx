import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login } from "../api/user";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slice/authSlice";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
 import { setAdminData } from "../redux/slice/adminSlice";



const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(7, "Password should be at least 7 characters")
    .refine((values) => /[a-zA-Z]/.test(values), {
      message: "Password must contain letters.",
    })
    .refine((s) => /\d/.test(s), {
      message: "Password must contain numbers.",
    })
    .refine((s) => /[!@#$%^&*(),.?":{}|<>]/.test(s), {
      message: "Password must contain special characters.",
    }),
});

const Login: React.FC = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch()



  interface FormValues {
    email?: string;
    password?: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await login(data)
      if (response) {

        if (response.data.isAdmin) {
          console.log("Login successful:", response.data);
          navigate("/admin/dashboard")
        } else {
          dispatch(setUserData(response.data.message))
          navigate("/home")

        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  const onGoogleLogin = async (credentialResponse: CredentialResponse)=>{
    if(credentialResponse.credential){
      try{
        const decode = jwtDecode<FormValues>(credentialResponse.credential)
        console.log(decode);
        let data={
          email: decode.email,
          password:"12345aA@",
        }
        const response = await login(data)
        if(response){
          if(response.data.isAdmin){
            console.log("Login successful admin:", response.data);
            dispatch(setAdminData(response.data.message))
            navigate("/admin/dashboard")
          }
          else{
            dispatch(setUserData(response.data.message))
            navigate("/home")
          }
        }
      }catch(error){
        console.log("error", error);
      }
    }
  }



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col md:flex-row md:shadow-bottom-left">
        <div className="md:w-1/2 w-full mb-4 md:mb-0">
          <img
            src="./User/signup.avif"
            alt="Signup"
            className="w-full h-[200px] md:h-full object-cover rounded-lg md:rounded-l-lg md:rounded-r-none max-h-screen"
          />
        </div>
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                placeholder="Email"
                id="email"
                {...register("email")}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                id="password"
                {...register("password")}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Login
              </button>
            </div>
            <div className="flex flex-col justify-center items-center text-center mt-4">

              {/* google auth */}
              <GoogleLogin  onSuccess={onGoogleLogin}
                onError={() => {
                  console.log('Login Failed');
                }}
              />


              <p className="mt-4">
                Don't have an account?
                <Link to="/signup"> Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
