import React from 'react';
import { Row, Col, Image, Button, Card} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImageUploading from 'react-images-uploading';

import imageHome from '../assets/removebg-home.png';
import someImg from '../assets/some-img.svg';

import {removeBg} from '../utils';

function AppContent() {

  const [image, setImage] = React.useState(null);
  const [bgImage, setBgImage] = React.useState();
  
  React.useEffect(async () => {
    if(image) {
      setBgImage(null);
      //Call REST API to
      console.log("useEffect [image]");
      console.log(image);

      const resp = await removeBg(image); 
      setBgImage(resp);
    }
  }, [image])


  React.useEffect(async () => {
    if(bgImage) {
      setImage(null);
    }
  }, [bgImage])

  const onChange = async(imageList) => {
    console.log(imageList);
    setImage(imageList && imageList.length > 0 ? imageList[0] : null);
  };

  return (
    <>
      <Row>
        <Col span={12} style={styles.column}>
          <div style={styles.homeTitle}>Remove Image Background</div>
          <div style={styles.homeText}>
            <p>100% Automatically and </p> 
            <p style={styles.homeTextSpecial}>Free</p>
          </div>

          <Image src={imageHome} />
        </Col>

        <Col span={12} style={{...styles.column, ...styles.columnTwo}}>
          <Card style={styles.card}>
            <div style={styles.someImg}>
              <Image src={someImg} />
            </div>

            <ImageUploading
              value={image}
              onChange={onChange}
            >{({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
              }) => (
                  <Button 
                    type="primary" 
                    size="large" 
                    style={styles.uploadButton} 
                    icon={<UploadOutlined />}
                    onClick={onImageUpload}
                    {...dragProps}>Upload Image</Button>
              )}
              </ImageUploading>
          </Card>
        </Col>
      </Row>

      {bgImage ? 
        <Row style={styles.outputRow}>
          <Col span={16} offset={4} style={styles.outputColumn}>
            <p> Output Image </p>
            <Image src={bgImage} style={styles.outputImage}/>
          </Col>   
        </Row>
        :
        <></>
      }
    </>

  );
}

const styles = {
  column: {
    padding: '70px',
  },
  columnTwo: {
    alignSelf: 'center'
  },
  homeTitle: {  
    fontSize: '60px',
    color: 'dimgrey',
    fontWeight: '700'
  },
  homeText: {
    fontSize: '25px',
    display: 'inline-flex'
  },
  homeTextSpecial: {
    fontWeight: '700',
    paddingBottom: '3px',
    borderBottom: '5px solid blue',
    marginLeft: '8px'
  },
  card :{
    width: '300px',
    padding: '70px 50px',
    margin: '0 auto',
  },
  someImg: {
    margin: '0 auto',
    marginBottom: '20px',
    width: '50%'
  },
  uploadButton: {
    // color: 'blue',
    fontWeight: '700'
  },
  outputRow: {
    marginTop: '50px'
  },
  outputColumn: {
    textAlign: 'center'
  },
  outputImage: {
    maxHeight: '400px'
  }
}


export default AppContent;
