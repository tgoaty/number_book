import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './app'
import './index.css'
import {Provider} from "react-redux";
import {setupStore} from "./app/store/store.ts";

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <Index />
      </Provider>
  </React.StrictMode>,
)
