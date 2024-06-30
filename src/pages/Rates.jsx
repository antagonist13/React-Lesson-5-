import { Wave } from 'react-animated-text';

import { Container, Filter, Heading, RatesList, Section } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrency, selectFilteredRates, selectIsLoading } from 'reduxState/slice';
import { useEffect } from 'react';
import { getLatestRates } from 'reduxState/operations';


const Rates = () => {

  const isError = false;
  const isLoading = useSelector(selectIsLoading)
  const dispatch = useDispatch()
  const baseCurrency = useSelector(selectCurrency)
  const baseCurrencyLow = baseCurrency.toLowerCase()
  const fileredRates = useSelector(selectFilteredRates);

    useEffect(() => {
    if (baseCurrencyLow !== '') {
      dispatch(getLatestRates(baseCurrencyLow))
    }
  } , [dispatch, baseCurrencyLow])

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {isLoading && (
          <Heading
            error
            title="Loading information, please wait..."
          />
        )}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
        <Filter />
        {fileredRates.length > 0 &&<RatesList rates={fileredRates} />}
      </Container>
    </Section>
  );
};

export default Rates;
