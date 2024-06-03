import React from 'react'
import { Container, Card, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessImage from '../assets/success.png'
import Footer from '../components/Footer';

const Success = () => {
  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center " style={{ backgroundColor: '#f9f9f9' }}>
      <Card style={{ maxWidth: '600px', width: '100%', padding: '0px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} className='mt-5 mb-5'>
        <Card.Body className='text-center'>
          <Image src={SuccessImage} alt="Cancel" fluid className='w-50' />
            <Card.Title style={{ color: '#333' }}>
            Thank you for your purchase!
            </Card.Title>
            <Card.Text style={{ color: '#666' }}>
            Your subscription has been successfully. We'll miss you, but thank you for your support. Feel free to explore more on our website. 
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

export default Success