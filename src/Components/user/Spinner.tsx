
import Lottie from 'lottie-react';
import Animaton from '../../lotties/Animation - 1723005894979.json'

const Spinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Lottie 
        animationData={Animaton} 
        style={{ width: 300, height: 300 }} 
        loop 
        autoplay 
      />
    </div>
  )
}

export default Spinner

