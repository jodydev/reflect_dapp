import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/Routes'; 
import Layout from './components/Layout';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
};
