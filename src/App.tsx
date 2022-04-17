import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './toastStyle.css';

import Router from './router';
import GlobalStyle from './components/GlobalStyle';
import './webfont';

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <main>
        <Router />
      </main>
    </>
  );
}

export default App;
