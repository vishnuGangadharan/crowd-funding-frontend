import { useNavigate,Link } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


const formSchema = z.object({
   email: z.string().email("Invalid email address"),
   password: z.string()
   .min(7, "Password should be at least 7 characters")
   .refine(values => /[a-zA-Z]/.test(values), {
      message: "Password must contain letters.",
    })
    .refine(s => /\d/.test(s), {
      message: "Password must contain numbers.",
    })
    .refine(s => /[!@#$%^&*(),.?":{}|<>]/.test(s), {
      message: "Password must contain special characters.",
    }),
})

const Login: React.FC = () => {

  interface FormValues {
    email: string;
    password: string;
  }

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: "onTouched"
  })


  const onSubmit: SubmitHandler<FormValues> = async(data)=>{
    try{
      console.log('login',data);
      
    }catch(error){
      console.log("error",error)
    }
  }


  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col md:flex-row md:shadow-bottom-left">
      <div className="md:w-1/2 w-full mb-4 md:mb-0">
        <img
          src="./User/signup.avif"
          alt="Signup"
          className="w-full h-[200px] md:h-full object-cover rounded-lg md:rounded-l-lg md:rounded-r-none  max-h-screen"
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
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              id="password"
              {...register("password")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </div>
          <div className="text-center mt-4">
            <button
              type="button"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Login with Google
            </button>
            <p className="mt-4">Don't have an account?
              <Link to='/signup' > Sign Up</Link> 
              </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login
