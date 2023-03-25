import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';

import { cartActions } from '../../store/cart-slice';

const CartItem = (props) => {
  const { title, quantity, total, price,id } = props.item;

  const dispatch=useDispatch()

  const product={
    title:title,
    quantity:quantity,
    total:total,
    price:price,
    id:id
  }
  const addProductHandler=()=>{
    dispatch(cartActions.addProduct(product))
  }

  const removeProductHandler=()=>{
    dispatch(cartActions.removeProduct(product))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeProductHandler}>-</button>
          <button onClick={addProductHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
