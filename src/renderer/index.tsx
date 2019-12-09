import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/Home'
import Header from './component/Header'
import './index.css'

const App: FC = () => (
  <div style={{ padding: '0 50px' }}>
    <Header />
    <Home />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
