import logo from './logo.svg';
import './App.css';
import { Layout } from 'antd';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import 'antd/dist/antd.css'; 


const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header theme='light'>
        <AppHeader />
      </Header>
      <Content>
        <AppContent />
      </Content>
    </Layout>
  );
}

export default App;
