import React from 'react'
import ReactDOM from 'react-dom/client'
// MAINTENANCE MODE ON — swap ComingSoon → App to go live again
import ComingSoon from './ComingSoon.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ComingSoon />
  </React.StrictMode>,
)
