import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css';
import { selectFilterValue, setFilterValue } from 'reduxState/slice';
export const Filter = () => {
  const dispatch = useDispatch()
  const filterValue = useSelector(selectFilterValue)
  const handleChange = (e) => {
    dispatch(setFilterValue(e.target.value.toLowerCase()))
  }
  return (
    <input
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      onChange={handleChange}
      value={filterValue}
    />
  );
};
