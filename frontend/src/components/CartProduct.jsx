import React, { useContext } from 'react'
import { CartContent } from '../CartContent'
import { getProductData } from '../ProductStore'
import { Button, Image } from 'react-bootstrap'

const CartProduct = (props) => {

    const cart = useContext(CartContent)
    const id = props.id
    const quantity = props.quantity
    const productData = getProductData(id)

  //   if (!productData) {
  //     return <p>Product not found</p>;
  // }

  return (
    <div>
    <div>
        <Image src={productData.image} className='w-25' fluid />
        <h3>{productData.title}</h3>
        <p>{quantity} total</p>
        <p>${ (quantity * productData.price).toFixed(2) }</p>
        <Button size='sm' onClick={() => cart.deleteFromCart(id)}>
            Remove
        </Button>
        <hr></hr>
    </div>
</div>
  )
}

export default CartProduct