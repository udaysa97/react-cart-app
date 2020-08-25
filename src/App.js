import React from 'react';
import Cart from './Cart'
import NavBar from './NavBar'
import * as firebase from 'firebase';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
     // products: [{
      //   price: 560,
      //   title: 'watch',
      //   qty: 4,
      //   img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1059&q=80',
      //   id: 1
      // },
      // {
      //   price: 5000,
      //   title: 'smartphone',
      //   qty: 4,
      //   img: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=378&q=80',
      //   id: 2
      // },
      // {
      //   price: 10000,
      //   title: 'washing machine',
      //   qty: 1,
      //   img: 'https://images.unsplash.com/photo-1577553696235-0c28285ab94a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
      //   id: 3
      // }]
      products : [],
      loading:true
    }
    this.db = firebase.firestore();
  }

  componentDidMount(){
      this.db
            .collection('Products')
            .onSnapshot((snapshot)=>{
              //console.log('snapppppp',snapshot);
              // snapshot.docs.map((doc)=>{
              //   console.log(doc.data());
              // });
              const products = snapshot.docs.map((doc)=>{
                const data = doc.data();
                data['id'] = doc.id;
                return data;
              });
              this.setState({
                products,
                loading:false
              })
            });
  }

  addProduct = ()=>{
    this.db
          .collection('Products')
          .add({
            img:'https://images.unsplash.com/photo-1533228100845-08145b01de14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=378&q=80',
            title:'smartphone',
            price:8000,
            qty:3
          })
          .then((docRef)=>{
            console.log('Item added to cart',docRef);
          })
          .catch((err)=>{
            console.log('error while adding',err);
          });
  }

  handleIncreaseQuantity = (product) => {
    // console.log(product);
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].qty += 1;
    // this.setState({
    //   products
    // })
    const docRef = this.db.collection('Products').doc(products[index].id);

    docRef.update({qty:products[index].qty + 1})
    .then(()=>{
      console.log('increase updated in DB');
    })
    .catch((err)=>{
      console.log('error in increasing',err);
    });
  }

  handleDecreaseQuantity = (product) => {
    // console.log(product);
    const { products } = this.state;
    const index = products.indexOf(product);
    if (products[index].qty <= 0) {
      return;
    }
   // products[index].qty -= 1;
    // this.setState({
    //   products
    // })

    const docRef = this.db.collection('Products').doc(products[index].id);

    docRef.update({qty:products[index].qty - 1})
    .then(()=>{
      console.log('decrease updated in DB');
    })
    .catch((err)=>{
      console.log('error in decreasing',err);
    });
  }

  handleDeleteObject = (id) => {
    const { products } = this.state;
   // const items = products.filter((product) => {
    //   return product.id !== id;
    // });
    // this.setState({
    //   products: items
    // })

    const docRef = this.db.collection('Products').doc(id);
    docRef.delete()
    .then(()=>{
      console.log('Deleted');
    })
    .catch((err)=>{
      console.log('cannot delete',err);
    });
  }

  getCartCount = ()=>{
    const {products} = this.state;
    let count = 0;
    products.forEach((product)=>{
        count += product.qty;
    })
    return count;
  }

  getCartTotal = ()=>{
    const {products} = this.state;
    let total = 0;
    products.forEach((item)=>{
      total += (item.qty * item.price);
    })
    return total;
  }
  render() {
    const {products,loading} = this.state;
    return (
      <div className="App">
        <NavBar 
           count = {this.getCartCount()}/>
        <button onClick={this.addProduct} style={{padding:20,fontSize:20}}>Add a Product</button>
        <Cart products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDelete={this.handleDeleteObject} />
          {loading && <h1> Loading...</h1>}
          <div style={{padding:10,fontSize:20}}>
            Total: {this.getCartTotal()}
          </div>
      </div>
    );
  }
}

export default App;
