import React, { useContext, useState } from 'react'
import {Button, Container, Navbar, Modal, Image} from 'react-bootstrap'
import { CartContent } from '../CartContent'
import CartProduct from './CartProduct'
import NoItemImage from '../assets/empty-cart.svg'

const NavbarComponent = () => {

  const cart = useContext(CartContent)

  const[show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const handlePurchase = async () => {
    try {
      // Ensure all items have a price and set the currency to USD if not specified
      const formattedItems = cart.items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price ?? 0,
        currency: item.currency ?? 'USD'
    }));

    //when purchase items click the cart detials shown 
    // console.log('Formatted Cart items:', JSON.stringify(formattedItems, null, 2))

    // Check if all items have the same currency
    const uniqueCurrencies = new Set(formattedItems.map(item => item.currency))
    if(uniqueCurrencies.size > 1) {
      console.error('Currency mismatch detected:', Array.from(uniqueCurrencies))
      throw new Error('All items must have the same currency')
    }

      const response = await fetch('https://react-stripe.onrender.com/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: formattedItems })
      })
  
      if (!response.ok) {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            console.error(`HTTP error! status: ${response.status}`, errorData);
        } else {
            const errorText = await response.text();
            console.error(`HTTP error! status: ${response.status}`, errorText);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    }
  
      const data = await response.json();
      if (data.url) {
        window.location.assign(data.url); // forward user to stripe
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0)

  return (
    <>
    <Navbar>
        <Navbar.Brand href="https://react-stripe.onrender.com/" className='fw-bold fs-3'>
          Priyan
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
            <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
        </Navbar.Collapse>
    </Navbar>
    <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
              <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? 
          <>  
          <p>Items in your cart:</p>
          {cart.items.map((currentProduct, idx) => (
              <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity} />
          ))}
            <h1>Total : ${cart.getTotalCost().toFixed(2)}</h1>

            <Button variant='success' onClick={handlePurchase}>
                Purchase Items!
            </Button>

          </>
          :
          <div className='text-center'>
          <h1>There are no items in your cart</h1> 
          <Image src={NoItemImage} className='w-50' fluid/>
          </div>
          }
              
        </Modal.Body>
    </Modal>
    </>
  )
}

export default NavbarComponent