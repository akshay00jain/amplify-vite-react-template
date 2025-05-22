import AppProvidersWrapper from './components/wrappers/AppProvidersWrapper'
import configureFakeBackend from './helpers/fake-backend'
import AppRouter from './routes/router'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();
import '@/assets/scss/app.scss'

configureFakeBackend()

const App = () => {
  return (
    <AppProvidersWrapper>
      <AppRouter />
    </AppProvidersWrapper>
  )
}

export default App
