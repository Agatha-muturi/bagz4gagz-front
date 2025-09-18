import{Link} from 'react-router-dom';
import { useCart } from '../context/cartcontext';


export default function Navbar(){

     const { items } = useCart();
     const count = items.reduce((s, it) => s + it.qty, 0);
    
     return(
        <div>
            <div>
                <Link to='/' className="brand">BAGS4GAGZ</Link>
            </div>
            <nav>
                <Link to='cart'>Cart</Link>
                <Link to='products'>Products</Link>
                <Link to='Checkout'>Checkout</Link>
            </nav>
        </div>
    )
}