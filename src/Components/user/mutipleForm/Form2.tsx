import { Input } from "@material-tailwind/react";
import {Button} from "@nextui-org/react";
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
          <form>
          <div className="mt-4">
            <div className="mb-6">
              <Input
                className="mb-3"
                variant="standard"
                label="Amount"
                placeholder="Enter Amount"
              />
            </div>
            <div className="mb-4">
              <Input
                className=""
                variant="standard"
                label="Name"
                placeholder="Enter your name"
              />
            </div>
          </div>
          <Button color="secondary">
              Secondary
             </Button>  
        </form>
        </div>
      </div>
    </div>
  )
}

export default Form2
