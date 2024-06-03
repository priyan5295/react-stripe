import React from 'react'
import { Container, Card, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import CancelImage from '../assets/cancel.png'
import Footer from '../components/Footer';

const Cancel = () => {
  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center " style={{ backgroundColor: '#f9f9f9' }}>
      <Card style={{ maxWidth: '600px', width: '100%', padding: '0px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} className='mt-5 mb-5'>
        <Card.Body className='text-center'>
          <Image src={CancelImage} alt="Cancel" fluid className='w-50' />
            <Card.Title style={{ color: '#333' }}>
            Sorry to see you go!
            </Card.Title>
            <Card.Text style={{ color: '#666' }}>
            Your subscription has been cancelled. We’re sad to see you leave but we hope to have you back in the future.
            </Card.Text>
            <Card.Text style={{ color: '#666' }}>
            Kindly return to the home page <span>(Click my logo)</span>
            </Card.Text>
        </Card.Body>
      </Card>
      </Container>

      <Footer />
        </div>
  )
}

export default Cancel