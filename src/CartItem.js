import React from 'react';

const CartItem = (props)=>{
        //console.log('render');
    const { price, title, qty,img } = props.product;
    const { product, onIncreaseQuantity, onDecreaseQuantity, onDelete } = props;
    // const{price,title,qty} = this.state;
    return (
        <div className='cart-item'>
            <div className='left-block'>
                <img style={styles.image} src= {img} alt=''></img>
            </div>
            <div className='right-block'>
                <div style={{ fontSize: 25 }}>
                    {/* {this.state.title} */} {title}
                </div>
                <div style={{ color: '#ccc' }}>
                    {/* Rs {this.state.price} */} {price}
                </div>
                <div style={{ color: '#ccc' }}>
                    {/* Qty : {this.state.qty} */} {qty}
                </div>
                <div className='cart-item-action'>
                    {/*we will add cart buttons here*/}
                    <img
                        alt='increase'
                        className='action-icons'
                        src='https://image.flaticon.com/icons/svg/1828/1828574.svg'
                        //  onClick = {this.increaseQuantity.bind(this)}
                        //  onClick = {this.increaseQuantity}                       
                        onClick={() => {
                            onIncreaseQuantity(product)
                        }
                        }
                    ></img>
                    <img alt='decrease'
                        className='action-icons'
                        src='https://image.flaticon.com/icons/svg/992/992514.svg'
                        // onClick = {this.decreaseQuantity}
                        onClick={() => {
                            onDecreaseQuantity(product)
                        }
                        }
                    ></img>
                    <img alt='delete'
                        className='action-icons'
                        src='https://image.flaticon.com/icons/svg/2165/2165246.svg'
                        onClick={() => {
                            onDelete(product.id)
                        }}
                    ></img>
                </div>
            </div>
        </div>
    )
}

const styles = {image:{
    height:110,
    width:110,
    background:'#0000FF',
    borderRadius:4
}}

export default CartItem;