import React from 'react'
import CartItem from './CartItem'

const Cart = (props)=>{
    

        // const arr = [1,2,3,4,5];
        const {products} = props;        
        return(
            <div className='cart'>
                {/* <CartItem qty={5} title={'watch'} price={560} />
                <CartItem qty={1} title={'smartphone'} price={5000} />
                <CartItem qty={4} title={'washing machine'} price={10000} /> */}
                {products.map((item)=>{
                    return (<CartItem product = {item} 
                                key = {item.id} 
                                onIncreaseQuantity = {props.onIncreaseQuantity}
                                onDecreaseQuantity = {props.onDecreaseQuantity}
                                onDelete = {props.onDelete}  />
                    )
                })}
            </div>
        )
}

export default Cart;