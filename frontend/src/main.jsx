import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'

// এখানে ReactDOM এর বদলে সরাসরি createRoot ব্যবহার করা হয়েছে
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </StrictMode>,
)