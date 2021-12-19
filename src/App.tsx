import MainRouter from './router/Router';

import ThemeProvider from './theme/ThemeProvider';
import './styles/theme.scss';


const App = () => {
  return (
    <ThemeProvider>
      <MainRouter />
    </ThemeProvider>
  )
}

export default App