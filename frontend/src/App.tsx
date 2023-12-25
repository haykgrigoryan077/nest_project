import { Suspense, useEffect } from 'react';
import './App.css';
import Layout from './Layout';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { Button, Result } from 'antd';
import { routes } from './routes';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { authorizationTypes } from './types';

function App() {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);

  useEffect(() => {
    if (isAuthenticated === authorizationTypes.UNAUTHORIZED) {
      navigate('/login');
    } else if (isAuthenticated === authorizationTypes.AUTHORIZED) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<>Loading</>}>
          <Routes>
            {routes.map((route: any, index) => {
              return (
                <Route key={`route-key-${route.path}-${index}`}>
                  {
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        route.privateRoute ? (
                          <PrivateRoute isAuthenticated={isAuthenticated}>
                            {route.element && <route.element />}
                          </PrivateRoute>
                        ) : (
                          route.element && <route.element />
                        )
                      }
                    />
                  }
                  {route.subMenu?.map((route: any) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        route.privateRoute ? (
                          <PrivateRoute isAuthenticated={isAuthenticated}>
                            {route.element && <route.element />}
                          </PrivateRoute>
                        ) : (
                          route.element && <route.element />
                        )
                      }
                    />
                  ))}
                </Route>
              );
            })}

            <Route
              path="*"
              element={
                <Result
                  status="404"
                  title="404"
                  subTitle="Sorry, the page you visited does not exist."
                  style={{ margin: '0 auto', color: 'white' }}
                  className="not-found-page"
                  extra={
                    <Button type="primary" onClick={() => navigate('/')}>
                      Back Home
                    </Button>
                  }
                />
              }
            />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
