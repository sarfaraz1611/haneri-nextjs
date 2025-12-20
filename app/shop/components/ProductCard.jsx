'use client';
import { useState } from 'react';
import Link from 'next/link';

// Helper for Hex codes
const getColorHex = (name) => {
  const map = {
    'Denim Blue': '#6497B2', 'Baby Pink': '#C7ABA9', 'Pearl White': '#F5F5F5',
    'Matte Black': '#21201E', 'Pine': '#DDC194', 'Beige': '#E6E0D4',
    'Walnut': '#926148', 'Sunset Copper': '#936053', 'Royal Brass': '#B7A97C',
    'Regal Gold': '#D3B063', 'Pure Steel': '#878782', 'Metallic Grey': '#D4D4D4',
    'Sand Beige': '#D3CBBB', 'Metallic Walnut': '#7F513F', 
    'Espresso Walnut': '#926148', 'Moonlit White': '#E6E6E6',
    'Natural Pine': '#DDC194', 'Velvet Black': '#0B0A08'
  };
  return /^#/.test(name) ? name : (map[name] || '#ddd');
};

export default function ProductCard({ product, initialVariant, addToCart }) {
  const [activeVariant, setActiveVariant] = useState(initialVariant);

  const normalizePrice = (val) => {
    if(!val) return 0;
    return parseFloat(String(val).replace(/,/g, ''));
  };

  const isSamePrice = normalizePrice(activeVariant.regular_price) === normalizePrice(activeVariant.selling_price);
  
  const imageSrc = (activeVariant.file_urls && activeVariant.file_urls[0]) 
    ? activeVariant.file_urls[0] 
    : "/images/placeholder.jpg"; 

  // Clean HTML from description
  const shortDesc = product.description 
    ? product.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' 
    : '';

  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3 shop_products">
      <div className="card featured pro-card" data-product-id={activeVariant.product_id}>
        
        <Link href={`/product_detail?id=${activeVariant.product_id}&v_id=${activeVariant.id}`}>
          <div className="card_image">
            <img src={imageSrc} alt={activeVariant.variant_value} className="img-fluid-card" />
          </div>
        </Link>

        <h4 className="heading4 mbo brand_image">
          <img src="/images/Link_img.png" alt="Haneri Img" className="img-fluid-card" />
        </h4>
        <br />

        <h4 className="product_names">
          <Link 
            href={`/product_detail?id=${activeVariant.product_id}&v_id=${activeVariant.id}`} 
            className="product_nam"
          >
            {product.name}
          </Link>
        </h4>

        {shortDesc && <p className="prod-desc mb-2">{shortDesc}</p>}

        <div className="price-box">
          <div className="c_price">
            <span className="product-price heading2"> MRP ₹{activeVariant.selling_price}</span>
            {/* Conditional class string for hidden price */}
            <span className={`old-price heading2 ${isSamePrice ? 'd-none' : ''}`}>
              MRP ₹{activeVariant.regular_price}
            </span>
          </div>
          <div className="sp_price none">
            Special Price : <span className="special_price paragraph1">MRP ₹{activeVariant.sales_price_vendor}</span>
          </div>
        </div>

        <div className="cart_view_add">
          <div className="variant-swatches">
            {product.variants.map((v) => {
              const dotClass = `color-dot ${v.id === activeVariant.id ? 'active' : ''}`;
              
              return (
                <span
                  key={v.id}
                  className={dotClass}
                  style={{ background: getColorHex(v.color || v.variant_value) }}
                  title={v.color || v.variant_value}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveVariant(v);
                  }}
                ></span>
              );
            })}
          </div>
          
          <button 
            className="btn rounded-pill px-4 add_to_carts"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product.id, activeVariant.id);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}