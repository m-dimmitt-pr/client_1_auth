import React, { useState } from 'react';
import { useFormik } from 'formik'
import axios from 'axios'
import { Redirect, Link } from "react-router-dom";
import { Alert } from 'antd';



function Signin() {
	const [alert, setAlert] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: '',
			password: ''
		},
		onSubmit: async values => axios.post(`http://localhost:4000/signin`, values)
			.then(res => {
				console.log(res.status);
				setAlert('success')
			}, e => {
				if (e.message.includes('401')) {
					setAlert('error')
					setTimeout(function () { setAlert(false) }, 3000)
				}
			})
	})
	return (
		<>
			{alert && (alert == 'error' ? (<Alert
				message="username or password error"
				description="Check your username or password"
				type="error"
				closable
			/>) :
				<Redirect
					to={{ pathname: "/start" }}
				/>
			)}
			<form onSubmit={formik.handleSubmit}>
				<label>email</label>
				<input
					id='name'
					name='name'
					type='text'
					onChange={formik.handleChange}
					value={formik.values.email}
				/>

				<label>password</label>
				<input
					id='password'
					name='password'
					type='password'
					onChange={formik.handleChange}
					value={formik.values.password
					}
				/>
				<button type='submit'>Submit</button>

			</form>
			<div>
				<Link to="/">Sign up</Link>
			</div>
		</>
	);
}

export default Signin;
