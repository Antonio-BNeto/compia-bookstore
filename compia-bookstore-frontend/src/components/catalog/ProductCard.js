import "../../styles/ProductCard.css";
import { FaEye, FaCartPlus } from 'react-icons/fa';
import StarRating from "./StarRating";

function ProductCard({ product }) {

    const {
        id,
        image,
        isNew,
        title,
        author,
        rating,
        reviewsCount,
        price,
        installments,
        formats,
    } = product;

    const handleViewDetails = () => {
        alert(`Ver detalhes do produto ${id}: ${title}`);
    };

    const handleAddToCart = () => {
        alert(`Adicionar ao carrinho: ${title}`);
    };

    return (
        <div className="product-card-container">
            <div className="card-image-wrapper">
                <img src={image} alt={title} className="card-image"/>
                {isNew && <span className="badge new">NOVO</span>}
            
                <div className="image-overlay">
                    <button className="overlay-add-button" onClick={handleAddToCart}>
                        <FaCartPlus />
                    </button>
                    <button className="overlay-details-button" onClick={handleViewDetails} >
                        <FaEye /> <span>Ver detalhes</span>
                    </button>
                </div>
            </div>

            <div className="card-content">
                {/* CORREÇÃO AQUI */}
                <h3 className="card-title">{title}</h3>
                <p className="card-author">{author}</p>

                <StarRating rating={rating} reviewsCount={reviewsCount}/>

                <p className="card-price">R$ {price.toFixed(2).replace('.', ',')}</p>

                {installments && (
                    <p className="card-installments">
                        ou {installments.count}x de R$ {installments.value.toFixed(2).replace('.', ',')}
                    </p>
                )}

                <div className="card-formats">
                    {formats.map((fmt, index) => (
                        <span key={index} className="format-tag">{fmt}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;