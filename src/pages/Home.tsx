import NavBar from '../Components/user/NavBar';
import HeroSection from '../Components/user/HeroSection';
import Card from '../Components/user/Cards';
import Accordion from '../Components/user/Accordions';
import Footer from '../Components/user/Footer';

const Home = () => {

  return (
    <div className='' style={{ background: '#FFF6E9' }}>
      <NavBar />
      <HeroSection />

      <div>
        <div className="mt-4 px-6 flex flex-col items-center">
          <h1 className="sm:text-sm lg:text-4xl font-semibold text-center lg:text-left mt-7">
            Thousands are fundraising online on Helping Hands
          </h1>

        </div>
      </div>

      {/* Card */}
      <div className='flex gap-5 justify-center m-20'>

        <Card limit={3} />

      </div>
      <div className="flex flex-col items-center mb-52">
        <h1 className="text-3xl font-bold mb-8">Questions We Get</h1>
        <div className="w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2">
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
