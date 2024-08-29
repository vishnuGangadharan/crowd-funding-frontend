import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { ThemeProvider} from "@material-tailwind/react"
import {NextUIProvider} from '@nextui-org/react'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      {/* <ThemeProvider> */}
      <NextUIProvider>
    <GoogleOAuthProvider clientId="85148320232-367a5ten0cvni9tvpnq7jpju98m5vr6v.apps.googleusercontent.com">
        <App />
        <ToastContainer />
     </GoogleOAuthProvider>
     </NextUIProvider>
     {/* </ThemeProvider> */}
    {/* </React.StrictMode> */}
  </Provider>
);
