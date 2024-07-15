import { Input } from "@material-tailwind/react";

function Form2() {


  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 ">
          <p>I am fundraising for:</p>
        <div className="bg-white p-6 rounded shadow-md w-80">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-purple-400 p-4 rounded" >Education</div>
            <div className="bg-purple-400  p-4 rounded">Medical</div>
          </div>
          <div className=" flex justify-center items-center">
            <div className="bg-purple-400  w-32 p-4 rounded">B</div>
            {/* <div className="bg-blue-200 p-4 rounded">Box 4</div> */}
          </div>
        </div>
        <div>
          <form action="">
            
            <Input variant="standard" label="Name" placeholder="Enter Amount" />
            <Input variant="standard" label="Name" placeholder="Enter your name" />
            </form>
        </div>
      </div>
    </div>
  )
}

export default Form2
