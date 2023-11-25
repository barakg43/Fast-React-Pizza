import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItemFromCart } from './cartSlice';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  function handleDeleteItem() {
    dispatch(deleteItemFromCart(pizzaId));
  }
  return (
    <Button type="small" onClick={handleDeleteItem}>
      Delete
    </Button>
  );
}

export default DeleteItem;
