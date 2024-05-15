// WomenPage.js
import React, { useState } from 'react';
import dress1 from "../assets/images/dress1.jpg";
import dress2 from "../assets/images/dress2.jpg";
import dress3 from "../assets/images/dress3.jpg";
import dress4 from "../assets/images/dress4.jpg";
import dress5 from "../assets/images/dress5.jpg";
import dress6 from "../assets/images/dress6.jpg";

import pantsF1 from "../assets/images/pantsF1.jpg";
import pantsF2 from "../assets/images/pantsF2.jpg";
import pantsF3 from "../assets/images/pantsF3.jpg";
import pantsF4 from "../assets/images/pantsF4.jpg";
import pantsF5 from "../assets/images/pantsF5.jpg";
import pantsF6 from "../assets/images/pantsF6.jpg";

import shoesF1 from "../assets/images/shoesF1.jpg";
import shoesF2 from "../assets/images/shoesF2.jpg";
import shoesF3 from "../assets/images/shoesF3.jpg";
import shoesF4 from "../assets/images/shoesF4.jpg";
import shoesF5 from "../assets/images/shoesF5.jpg";
import shoesF6 from "../assets/images/shoesF6.jpg";

import tshirtF1 from "../assets/images/tshirtF1.jpg";
import tshirtF2 from "../assets/images/tshirtF2.jpg";
import tshirtF3 from "../assets/images/tshirtF3.jpg";
import tshirtF4 from "../assets/images/tshirtF4.jpg";
import tshirtF5 from "../assets/images/tshirtF5.jpg";
import tshirtF6 from "../assets/images/tshirtF6.jpg";
import './WomenPage.scss';

const WomenPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("top-selling");

  const products = {
    "top-selling": [
      { name: "Product 1", description: "Description of Product 1.", price: "$20", image: tshirtF2 },
      { name: "Product 2", description: "Description of Product 2.", price: "$25", image: tshirtF6},
      { name: "Product 3", description: "Description of Product 3.", price: "$30", image: pantsF2 },
      { name: "Product 4", description: "Description of Product 4.", price: "$30", image: pantsF3 },
      { name: "Product 5", description: "Description of Product 5.", price: "$30", image: dress3 },
      { name: "Product 6", description: "Description of Product 6.", price: "$30", image: dress6 },
      { name: "Product 7", description: "Description of Product 7.", price: "$30", image: shoesF2 },
      { name: "Product 8", description: "Description of Product 8.", price: "$30", image: shoesF4 }
    ],
    dresses: [
      { name: "Dress 1", description: "Turn heads and steal the spotlight with the extraordinary allure of this dress.", price: "$70", image: dress1 },
      { name: "Dress 2", description: "Dreamy florals bloom across a dress, a vision of effortless femininity.", price: "$75", image: dress2 },
      { name: "Dress 3", description: "This dress finds beauty in simplicity.  Effortless chic for any occasion.", price: "$75", image: dress3 },
      { name: "Dress 4", description: "Sparkle in this soft pink glitter dress, perfect for a prom night or any special occasion.", price: "$75", image: dress4 },
      { name: "Dress 5", description: "A long dress in a cool pink hue flows effortlessly, creating a breezy and captivating look.", price: "$75", image: dress5 },
      { name: "Dress 6", description: "A stunning white dress, epitomizing sophistication and charm, destined to turn heads with its timeless allure.", price: "$75", image: dress6 }
    ],
    pants: [
      { name: "Pants 1", description: "These pants, with their classic design and neutral color palette, offer endless styling possibilities.", price: "$20", image: pantsF1 },
      { name: "Pants 2", description: "Jeans, the enduring symbol of relaxed sophistication and everyday comfort. An indispensable staple in your wardrobe.", price: "$22", image: pantsF2 },
      { name: "Pants 3", description: "Adding a vibrant touch of nature's energy to your wardrobe with these stylish pants", price: "$18", image: pantsF3 },
      { name: "Pants 4", description: "White pants: a timeless staple for endless style possibilities.", price: "$15", image: pantsF4 },
      { name: "Pants 5", description: "Step into spring with these floral pants, offering a fresh and stylish addition to your wardrobe.", price: "$23", image: pantsF5 },
      { name: "Pants 6", description: "Versatile and stylish, these pants are suitable for any occasion, from casual outings to business meetings.", price: "$40", image: pantsF6 }
    ],
    shoes: [
      { name: "Shoes 1", description: "Description of Shoes 1.", price: "$50", image: shoesF1 },
      { name: "Shoes 2", description: "Description of Shoes 2.", price: "$55", image: shoesF2 },
      { name: "Shoes 3", description: "Description of Shoes 3.", price: "$55", image: shoesF3 },
      { name: "Shoes 4", description: "Description of Shoes 4", price: "$55", image:  shoesF4 },
      { name: "Shoes 5", description: "Description of Shoes 5.", price: "$55", image: shoesF5 },
      { name: "Shoes 6", description: "Description of Shoes 6.", price: "$55", image: shoesF6 }
    ],
    tshirts: [
      { name: "T-Shirt 1", description: "Description of T-Shirt 1.", price: "$15", image: tshirtF1 },
      { name: "T-Shirt 2", description: "Description of T-Shirt 2.", price: "$18", image: tshirtF2 },
      { name: "T-Shirt 3", description: "Description of T-Shirt 3.", price: "$18", image: tshirtF3 },
      { name: "T-Shirt 4", description: "Description of T-Shirt 4.", price: "$18", image: tshirtF4 },
      { name: "T-Shirt 5", description: "Description of T-Shirt 5.", price: "$18", image: tshirtF5 },
      { name: "T-Shirt 6", description: "Description of T-Shirt 6.", price: "$18", image: tshirtF6 }
    ]
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getCategoryProducts = (category) => {
    return products[category] || [];
  };

  return (
    <div className="women-page">
      <div className="product-list">
        <h2 className="section-title">
          {selectedCategory === "top-selling" ? "Top Selling Products" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}
        </h2>
        {getCategoryProducts(selectedCategory).map((product, index) => (
          <div className="product" key={index}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className="submenu">
        <ul>
          <li><a href="#dresses" onClick={() => handleCategoryClick("dresses")}>Dresses</a></li>
          <li><a href="#pants" onClick={() => handleCategoryClick("pants")}>Pants</a></li>
          <li><a href="#shoes" onClick={() => handleCategoryClick("shoes")}>Shoes</a></li>
          <li><a href="#tshirts" onClick={() => handleCategoryClick("tshirts")}>T-Shirts</a></li>
        </ul>
      </div>
    </div>
  );
}

export default WomenPage;
