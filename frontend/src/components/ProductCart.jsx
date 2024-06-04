import React, { useContext } from 'react'
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap'
import { CartContent } from '../CartContent';

const ProductCart = (props) => { // props.product is the product we are selling

    const product = props.product;

    const cart = useContext(CartContent)
    const productQuantity = cart.getProductQuantity(product.id)
    // console.log("each card items", cart.items)

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(price)
    }

  return (
    <div className='pt-5'>
    <Card>
        <Card.Body>
            <Image src={product.image}  fluid/>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>Price : $ {formatPrice(product.price)}</Card.Text>
            { productQuantity > 0 ?
            <>
                <Form as={Row}>
                    <Form.Label column="true" sm='6'>
                        In Cart: {productQuantity}
                    </Form.Label>
                    <Col sm='6'>
                        <Button sm='6' onClick={() => cart.addOneToCart(product.id)} className='px-2'>+</Button>
                        <Button sm='6' onClick={() => cart.removeOneFromCart(product.id)} className='px-2 ms-4'>-</Button>
                    </Col>
                </Form>
                <Button variant='danger' className='mt-4' onClick={() => cart.deleteFromCart(product.id)}>
                    Remove Cart
                </Button>
            </>
              :
            <Button variant='primary' onClick={() => cart.addOneToCart(product.id)}>Add to Cart</Button>
            }
            
        </Card.Body>
    </Card>
    </div>
  )
}

export default ProductCart