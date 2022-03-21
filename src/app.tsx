import { Fragment, VFC } from 'react';
import { IndexPage } from './pages';
import { GlobalStyle } from './styles/global';

export const App: VFC = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <IndexPage />
    </Fragment>
  );
};
