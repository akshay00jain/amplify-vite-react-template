import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { basePath } from './context/constants'

import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter basename={basePath}>
        <App />
      </BrowserRouter>
  </StrictMode>,
)