import React, { useState } from 'react';

// MenPage.js

import blouse7 from "../assets/images/blouse7.jpg";
import blouse8 from "../assets/images/blouse8.jpg";
import blouse9 from "../assets/images/blouse9.jpg";
import blouses1 from "../assets/images/blouses1.jpg";
import blouses2 from "../assets/images/blouses2.jpg";
import blouses3 from "../assets/images/blouses3.jpg";
import blouses4 from "../assets/images/blouses4.jpg";
import blouses5 from "../assets/images/blouses5.jpg";
import blouses6 from "../assets/images/blouses6.jpg";


import pants1 from "../assets/images/pants1.jpg";
import pants2 from "../assets/images/pants2.jpg";
import pants3 from "../assets/images/pants3.jpg";
import pants4 from "../assets/images/pants4.jpg";
import pants5 from "../assets/images/pants5.jpg";
import pants6 from "../assets/images/pants6.jpg";
import pants7 from "../assets/images/pants7.jpg";
import pants8 from "../assets/images/pants8.jpg";
import pants9 from "../assets/images/pants9.jpg";

import shoes1 from "../assets/images/shoes1.jpg";
import shoes2 from "../assets/images/shoes2.jpg";
import shoes3 from "../assets/images/shoes3.jpg";
import shoes4 from "../assets/images/shoes4.jpg";
import shoes5 from "../assets/images/shoes5.jpg";
import shoes6 from "../assets/images/shoes6.jpg";
import shoes7 from "../assets/images/shoes7.jpg";
import shoes8 from "../assets/images/shoes8.jpg";
import shoes9 from "../assets/images/shoes9.jpg";

import tshirt1 from "../assets/images/tshirt1.jpg";
import tshirt2 from "../assets/images/tshirt2.jpg";
import tshirt3 from "../assets/images/tshirt3.jpg";
import tshirt4 from "../assets/images/tshirt4.jpg";
import tshirt5 from "../assets/images/tshirt5.jpg";
import tshirt6 from "../assets/images/tshirt6.jpg";
import tshirt7 from "../assets/images/tshirt7.jpg";
import tshirt8 from "../assets/images/tshirt8.jpg";
import tshirt9 from "../assets/images/tshirt9.jpg";
import './MenPage.scss';

const MenPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("top-selling");
  const [currentPage, setCurrentPage] = useState({
    "top-selling": 1,
    tshirts: 1,
    pants: 1,
    shoes: 1,
    blouses: 1
  });

  const productsPerPage = 6;

  const products = {
    "top-selling": [
      { name: "Product 1", description: "Description of Product 1.", price: "$20", image: tshirt2 },
      { name: "Product 2", description: "Description of Product 2.", price: "$25", image: tshirt5},
      { name: "Product 3", description: "Description of Product 3.", price: "$30", image: pants1 },
      { name: "Product 4", description: "Description of Product 4.", price: "$30", image: pants2 },
      { name: "Product 5", description: "Description of Product 5.", price: "$30", image: blouses5 },
      { name: "Product 6", description: "Description of Product 6.", price: "$30", image: blouses4 },
      { name: "Product 7", description: "Description of Product 7.", price: "$30", image: shoes2 },
      { name: "Product 8", description: "Description of Product 8.", price: "$30", image: shoes4 }
    ],
    tshirts: [
      { name: "T-Shirt 1", description: "Description of T-Shirt 1.", price: "$15", image: tshirt1 },
      { name: "T-Shirt 2", description: "Description of T-Shirt 2.", price: "$18", image: tshirt2 },
      { name: "T-Shirt 3", description: "Description of T-Shirt 3.", price: "$18", image: tshirt3 },
      { name: "T-Shirt 4", description: "Description of T-Shirt 4.", price: "$18", image: tshirt4 },
      { name: "T-Shirt 5", description: "Description of T-Shirt 5.", price: "$18", image: tshirt5 },
      { name: "T-Shirt 6", description: "Description of T-Shirt 6.", price: "$18", image: tshirt6 },
      { name: "T-Shirt 7", description: "Description of T-Shirt 7.", price: "$18", image: tshirt7 },
      { name: "T-Shirt 8", description: "Description of T-Shirt 8.", price: "$18", image: tshirt8 },
      { name: "T-Shirt 9", description: "Description of T-Shirt 9.", price: "$18", image: tshirt9 }
    ],
    pants: [
      { name: "Pants 1", description: "Description of Pants 1.", price: "$35", image: pants1 },
      { name: "Pants 2", description: "Description of Pants 2.", price: "$40", image: pants2 },
      { name: "Pants 3", description: "Description of Pants 3.", price: "$40", image: pants3 },
      { name: "Pants 4", description: "Description of Pants 4.", price: "$40", image: pants4 },
      { name: "Pants 5", description: "Description of Pants 5.", price: "$40", image: pants5 },
      { name: "Pants 6", description: "Description of Pants 6.", price: "$40", image: pants6 },
      { name: "Pants 7", description: "Description of Pants 7.", price: "$40", image: pants7 },
      { name: "Pants 8", description: "Description of Pants 8.", price: "$40", image: pants8 },
      { name: "Pants 9", description: "Description of Pants 9.", price: "$40", image: pants9 }
    ],
    shoes: [
      { name: "Shoes 1", description: "Description of Shoes 1.", price: "$50", image: shoes1 },
      { name: "Shoes 2", description: "Description of Shoes 2.", price: "$55", image: shoes2 },
      { name: "Shoes 3", description: "Description of Shoes 3.", price: "$55", image: shoes3 },
      { name: "Shoes 4", description: "Description of Shoes 4", price: "$55", image: shoes4 },
      { name: "Shoes 5", description: "Description of Shoes 5.", price: "$55", image: shoes5 },
      { name: "Shoes 6", description: "Description of Shoes 6.", price: "$55", image: shoes6 },
      { name: "Shoes 7", description: "Description of Shoes 7.", price: "$50", image: shoes7 },
      { name: "Shoes 8", description: "Description of Shoes 8.", price: "$50", image: shoes8 },
      { name: "Shoes 9", description: "Description of Shoes 9.", price: "$50", image: shoes9 }
    ],
    blouses: [
      { name: "Blouse 1", description: "Description of Blouse 1.", price: "$70", image: blouses1 },
      { name: "Blouse 2", description: "Description of Blouse 2.", price: "$75", image: blouses2 },
      { name: "Blouse 3", description: "Description of Blouse 3.", price: "$75", image: blouses3 },
      { name: "Blouse 4", description: "Description of Blouse 4.", price: "$75", image: blouses4 },
      { name: "Blouse 5", description: "Description of Blouse 5.", price: "$75", image: blouses5 },
      { name: "Blouse 6", description: "Description of Blouse 6.", price: "$75", image: blouses6 },
      { name: "Blouse 7", description: "Description of Blouse 7.", price: "$75", image: blouse7 },
      { name: "Blouse 8", description: "Description of Blouse 8.", price: "$75", image: blouse8 },
      { name: "Blouse 9", description: "Description of Blouse 9.", price: "$75", image: blouse9 }
    ]
  };


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage({ ...currentPage, [category]: 1 }); // Reset page number when changing category
  };

  const getCategoryProducts = (category) => {
    const startIndex = (currentPage[category] - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return (products[category] || []).slice(startIndex, endIndex);
  };

  const totalPages = (category) => {
    return Math.ceil((products[category] || []).length / productsPerPage);
  };

  const changePage = (category, page) => {
    if (page >= 1 && page <= totalPages(category)) {
      setCurrentPage({ ...currentPage, [category]: page });
    }
  };

  return (
    <div className="men-page">
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
        <div className="pagination">
          {Array.from({ length: totalPages(selectedCategory) }, (_, i) => i + 1).map((page) => (
            <button key={page} onClick={() => changePage(selectedCategory, page)}>{page}</button>
          ))}
        </div>
      </div>
      <div className="submenu">
        <ul>
          <li><a href="#tshirts" onClick={() => handleCategoryClick("tshirts")}>T-Shirts</a></li>
          <li><a href="#pants" onClick={() => handleCategoryClick("pants")}>Pants</a></li>
          <li><a href="#shoes" onClick={() => handleCategoryClick("shoes")}>Shoes</a></li>
          <li><a href="#blouses" onClick={() => handleCategoryClick("blouses")}>Blouses</a></li>
        </ul>
      </div>
    </div>
  );
}

export default MenPage;