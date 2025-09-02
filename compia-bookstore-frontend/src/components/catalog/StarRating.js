
import PropTypes from 'prop-types'; // 1. IMPORTE O PROP-TYPES
import '../../styles/StarRating.css';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

function StarRating({ rating, reviewsCount }) {
    const totalStars = 5;

    return (
        <div className="star-rating-container">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;

                if (starValue <= rating) {
                    return <FaStar key={index} className='star filled' />;
                } else if (starValue - 0.5 <= rating) {
                    return <FaStarHalfAlt key={index} className='star filled' />;
                } else {
                    return <FaRegStar key={index} className='star empty' />;
                }
            })}
            <span className="rating-value">{rating.toFixed(1)}</span>
            {reviewsCount && <span className='reviews-count'>({reviewsCount})</span>}
        </div>
    );
}

// 2. ADICIONE O "CONTRATO" DE PROPS AQUI
StarRating.propTypes = {
  /** A nota numérica do produto (ex: 4.6) */
  rating: PropTypes.number.isRequired,
  
  /** O número de avaliações (opcional) */
  reviewsCount: PropTypes.number,
};

export default StarRating;