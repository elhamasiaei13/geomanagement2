import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import UnauthorizedRoute from './components/UnauthorizedRoute';
import { Route } from 'react-router-dom';
import authUtil from './service/authUtil';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>


    // <>

    //   <Route path="/loginfailed">
    //     Login Failed!
    //  </Route>
    //   {!authUtil.isAuthenticated() ?
    //     <UnauthorizedRoute />
    //     :
    //     <Layout />
    //   }
    // </>
  );
}

export default App;
