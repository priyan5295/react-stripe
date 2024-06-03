import React from 'react'
import { CardFooter, Col, Row } from 'react-bootstrap'
import { productsArray } from '../ProductStore'
import ProductCart from '../components/ProductCart'
import Footer from '../components/Footer'

const Store = () => {
    return (

        <div>
            <h1 align='center'>Welcome to my store</h1>
            {/* map parthensisnmeasns regular experrion us return a jsx element immmeditely every single product of product array */}
            <Row xs={1} md={4} className='g-4'>
                {productsArray.map((product, index) => (
                    <Col align="center" key={index}>
                        <ProductCart product={product} />
                    </Col>
                ))}
            </Row>
            <Footer />
        </div>
    )
}

export default Store