import { Image, Button } from 'antd';
import logo from '../assets/logo.png';

import styles from '../styles';

const AppHeader = () => {
  return (
    <>
      <Image src={logo} style={styles.logo}/>
    </>
  );
}


export default AppHeader;
