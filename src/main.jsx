import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from '@/routes'

import { rotuerViews } from "@/utils"
import store from '@/store'
import 'normalize.css'
import "./index.less"
ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<BrowserRouter>
			{/* <React.StrictMode> */}
				<Routes>
					{rotuerViews(routes)}
				</Routes>
			{/* </React.StrictMode> */}
		</BrowserRouter>
	</Provider>
)
