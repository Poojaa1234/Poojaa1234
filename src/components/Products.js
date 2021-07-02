import React, { Component } from 'react';
import formatCurrency from '../util';

export default class Products extends Component {
    render() {
        return (
            <div className="products">
            {this.props.products.map((product)=>(
                <li key={product.id}>
                    <div className="product">
                    <a href= {"#" + product.id}>
                    <img alt="Product_image" src={product.image} ></img>
                    <p>
                        {product.title}
                    </p>
                    </a>
                    <div className="product-price">
                    {formatCurrency(product.price)}
                    </div>
                    <button className="button primary" onClick={() => {this.props.addToCart(product)}}>Add to cart</button>
                    </div>

                </li>
                
            ))}
                
            </div>
        )
    }
}
