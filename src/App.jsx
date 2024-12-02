import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/Routes'; 
import Layout from './components/Layout';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                {routes.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};
