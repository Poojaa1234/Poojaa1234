import React from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      products : data.products,
      size:"",
      sort:"",
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    }
  }
  
  removeFromCart = (product) => {
      const cartItems = this.state.cartItems.slice();
      this.setState({cartItems: cartItems.filter(x => x.id !== product.id ) });
      localStorage.setItem("cartItems",JSON.stringify(cartItems))
  }
  addToCart= (product) => {
      const cartItems = this.state.cartItems.slice();
      let alreadyInCart = false;
      cartItems.forEach((item)=>{
        if(item.id === product.id){
          item.count++;
          alreadyInCart= true;
        }
      });
      if(!alreadyInCart){
        cartItems.push({...product,count:1})
      }
      this.setState({
        cartItems
      })
      localStorage.setItem("cartItems",JSON.stringify(cartItems))

  }

  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState({
      sort:sort,
      products : this.state.products.slice()
      .sort((a,b) => 
        sort === "Lowest" ? 
        a.price > b.price ? 1 : -1 
        : sort === "Highest" ? 
        a.price < b.price ? 1 : -1 
        : a.id < b.id ? 1 : -1
      )
    })
  }
  
  filterProducts = (event) => {
    if(event.target.value === "ALL" || ""){
      this.setState({size:event.target.value,products:data.products})
    } else{

     this.setState({
       size:event.target.value,
       products: data.products.filter((p)=> p.availableSizes.indexOf(event.target.value) >=0 )
      })
    }
  }
  render(){

  return (
    <div className="grid-container">
    <header>
      <a href="/">React Shopping Cart</a>
      
    </header>
    <main>
      <div className="content">
      <div className="main">
      <Filter count={this.state.products.length} sort={this.state.sort} size={this.state.size} 
        sortProducts={this.sortProducts} filterProducts={this.filterProducts}
        
      />
      <Products products={this.state.products} addToCart={this.addToCart} />
      </div>
      <Cart cartItems = {this.state.cartItems} removeFromCart = {this.removeFromCart} />
      </div>
    </main>
    <footer>
      All right is reserved
    </footer>
    </div>
  )
  }
}
