import NavBar from '../Components/user/NavBar';
import HeroSection from '../Components/user/HeroSection';
import Category from '../Components/user/Cards';
import Accordion from '../Components/user/Accordions';
import Footer from '../Components/user/Footer';

const Home = () => {
  return (
    <div className='' style={{background:'#FFF6E9'}}>
      <NavBar />
      <HeroSection />

      <div>
        <div className="mt-4 px-6 flex flex-col items-center">
          <h1 className="sm:text-sm lg:text-4xl font-semibold text-center lg:text-left m-7">
            Thousands are fundraising online on Helping Hands
          </h1>
          <div className=" bg-white flex items-center justify-center border border-gray-300 w-[60%] rounded-lg p-2">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none px-3 py-2 w-full rounded-sm"
            />
            <button
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className='flex gap-5 justify-center m-20'>

        <Category />
        
      </div>
      <div className="flex flex-col items-center mb-52">
        <h1 className="text-3xl font-bold mb-8">Questions We Get</h1>
        <div className="w-2/4 sm:w-3/4 ">
          <Accordion />
        </div>
      </div>
    <div className='mt-4'>
    <Footer />
    </div>
    </div>

  );
}

export default Home;
