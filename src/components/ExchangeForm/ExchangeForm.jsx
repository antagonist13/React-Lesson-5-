import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { setExchangeInfo } from 'reduxState/operations';

export const ExchangeForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    const inputCurrencyData = e.target.currency.value.trim();
    const isValid = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/.test(inputCurrencyData)
    if (isValid) {
      const [amount, from, , to] = inputCurrencyData.split(' ')
      dispatch(setExchangeInfo({to, from, amount}))
    }
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>
      <input name='currency' title="Request format 15 USD in UAH" className={styles.input}/>
    </form>
  );
};
