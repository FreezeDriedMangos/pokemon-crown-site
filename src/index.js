import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';


    
fetch("/pokemon.json")
	.then(res => res.json())
	.then(data => {
		console.log(data)
		// simple addition of root element so that we don't need an index.html template
		const body = document.getElementsByTagName('BODY')[0];
		const root = document.createElement('div');
		root.id = 'root';
		body.appendChild(root);
		
		// render the app
		ReactDOM.render(<App data={data}/>, body);
	})
