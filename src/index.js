import React from 'react'
import ReactDOM from 'react-dom'
import './bootstrap-4.0.0-beta.2-dist/css/bootstrap.min.css'
// import './bootstrap-4.0.0-beta.2-dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
