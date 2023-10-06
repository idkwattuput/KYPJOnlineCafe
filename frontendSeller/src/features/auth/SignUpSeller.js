import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
	const navigate = useNavigate();

	const [seller_name, setName] = useState('');
	const [seller_username, setUsername] = useState('');
	const [seller_password, setPassword] = useState('');
	const [seller_email, setEmail] = useState('');

	const handleNameChange = (e) => setName(e.target.value);
	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);
	const handleEmailChange = (e) => setEmail(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const registrationData = {
			seller_name,
			seller_username,
			seller_password,
			seller_email,
		};

		try {
			const response = await fetch('http://localhost:3500/seller', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(registrationData),
			});

			if (response.ok) {
				navigate('/');
			} else {
				console.log('Registration Failed!');
			}
		} catch (error) {
			console.error('Error during registration:', error);
		}
	};

	return (
		<div className='flex page bg-gradient-to-r from-slate-200 to-slate-500 font-Rubik text-zinc-900 antialiased font-bold'>

			<img src="https://i.pinimg.com/564x/f1/e2/82/f1e282268c878b2e7897b4e4528b1bb1.jpg" alt="" className="h-screen drop-shadow-lg"/>

			<div className="flex flex-col items-start justify-center m-auto">

				<h1 className="mb-10 text-5xl font-bold text-center">Sign Up</h1>

				<form action="" className="grid items-center justify-center grid-rows-4 gap-5 mb-4 drop-shadow-lg" onSubmit={handleSubmit}>

					<div className="relative grid grid-cols-2 gap-4">

						<input id="name" value={seller_name} onChange={handleNameChange} type="text" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none" required />

						<label
							htmlFor=""
							className={`absolute left-3 ${seller_name ? '-top-6 left-1 text-white-500 text-s ' : 'top-2 text-white-500'} transition-all duration-200`}
							onClick={() => {
								document.getElementById('seller_name').focus();
							}}
						>
							{seller_name ? 'Name' : 'Name'}
						</label>

						<div className="relative">

							<input id="username" value={seller_username} onChange={handleUsernameChange} type="text" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none" required />

							<label
								htmlFor=""
								className={`absolute left-3 ${seller_username ? '-top-6 left-1 text-black-500 text-s' : 'top-2 text-white-500'} transition-all duration-200`}
								onClick={() => {
									document.getElementById('username').focus();
								}}
							>
								{seller_username ? 'Username' : 'Username'}
							</label>

						</div>

					</div>

					<div className="relative">

						<input id="password" value={seller_password} onChange={handlePasswordChange} type="password" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none" required />

						<label
							htmlFor=""
							className={`absolute left-3 ${seller_password ? '-top-6 left-1 text-black-500 text-s' : 'top-2 text-white-500'} transition-all duration-200`}
							onClick={() => {
								document.getElementById('password').focus();
							}}
						>
							{seller_password ? 'Password' : 'Password'}
						</label>

					</div>

					<div className="relative">
						<input id="email" value={seller_email} onChange={handleEmailChange} type="mail" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-3xl focus:border-white-500 focus:outline-none" required />

						<label
							htmlFor=""
							className={`absolute left-3 ${seller_email ? '-top-6 left-1 text-black-500 text-s' : 'top-2 text-white-500'} transition-all duration-200`}
							onClick={() => {
								document.getElementById('email').focus();
							}}
						>
							{seller_email ? 'Email' : 'Email'}
						</label>

					</div>

					<input type="submit" value="Sign Up" className="w-32 px-3 py-2 m-auto transition duration-300 ease-in-out rounded-3xl delay-60 hover:-translate-y-1 hover:scale-110 hover:text-black bg-gradient-to-r from-yellow-200 to-yellow-500 hover:from-lime-200 hover:to-green-700"/>
					
				</form>

				<p className="w-full text-sm text-center px-3 py-2">
					Already have an account?{' '}
					<Link to="/" className="text-sm  underline hover:text-[15px] mt-4 hover:mt-8 underline-offset-2">
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
