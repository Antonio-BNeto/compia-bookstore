import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../../styles/Header.css';

function Header(){
    return(
        <header className='main-header'>
            <Link to='/' className='logo-link'>
                <h1>📚 COMPIA Bookstore</h1>
            </Link>

            <nav className='main-nav'>
                <Link to='/'>Home</Link>
                <Link to='/carrinho'>Carrinho</Link>
                <Link to='/CheckoutPage'>Checkout</Link>
                <Link to='/admin'>Admin</Link>
            </nav>
            <div className='header-cart'>
                <Link to='/carrinho'>
                    <FaShoppingCart size={24} />
                    <span className='cart-count'>3</span>
                </Link>
            </div>
        </header>
    )
}

export default Header;