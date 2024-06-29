import { Container, ExchangeForm, ExchangeInfo, Heading, Loader, Section } from 'components';
import { useSelector } from 'react-redux';
import { selectError, selectExchangeInfo, selectIsLoading } from 'reduxState/slice';

const Home = () => {
  const isError = useSelector(selectError);
  const exchangeInfo = useSelector(selectExchangeInfo);
  const isLoading = useSelector(selectIsLoading)
  return (
    <Section>
      <Container>
        <ExchangeForm />
        {isLoading && <Loader/>}
        {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}
        <Heading info title="What currencies do you want to exchange?🙂" />
        {isError && (<Heading
            error
            title={isError}
          />
        )}
      </Container>
    </Section>
  );
};

export default Home;
