import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App.tsx'
import './index.css'

const rootElement = document.querySelector('#root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
