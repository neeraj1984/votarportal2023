import {Alert,Container,CloseButton} from 'react-bootstrap';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';  

function SuccessAlert(){

const [show, setShow] = useState(true);

 function closeAlert(){
     alert("closing the alert");
 }
 if (show){  
    return (
        <div className="App">  
        <Container className='p-4'>  
        <Alert variant="success" onClose={() => setShow(false)} dismissible >
          <Alert.Heading>Sucess</Alert.Heading>  
          <p className="mb-0">
            Data is saved successfully.
          </p>
        </Alert>
        </Container>
        </div>
      );
 }
}

export default SuccessAlert;
