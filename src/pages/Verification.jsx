/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { errorInterceptor } from '../utils/axiosInterceptor';

function Verification() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: sessionStorage.getItem ('email'),
		code_verify: '',
	});
	axios.interceptors.response.use(null, (err) => errorInterceptor(err, { navigate }));
	const getVerifyCode = () => {
		setLoading(true);
		axios
			.post('/verification/request-code', { email: formData.email })
			.then((res) => {
				if (res.status === 201) {
					toast.success(res.data.message || 'Code sent successfully', { position: 'bottom-right' });
				} else if (res.status === 200) {
					toast.warn(res.data.message || 'Something went wrong!', { position: 'bottom-right' });
				}
			})
			.finally(() => setLoading(false));
	};
	const submitCode = () => {
		setLoading(true);
		axios
			.post('/verification/verify-code', { email: formData.email, code: formData.code_verify })
			.then((res) => {
				// console.log(res);
				if (res.status === 200) {
					navigate('/login');
					// toast.info(res.data.message || 'Something went wrong!', { position: 'bottom-right' });
				}
			})
			.finally(() => setLoading(false));
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div style={{ backgroundImage: 'url(/images/Background.png)' }} className="bg-cover bg-center h-screen w-full grid place-items-center">
			<div className="w-[58%] lg:w-[68%] tab:w-[78%] flex sm:flex-col bg-white/10 backdrop-blur-[5px] rounded-2xl overflow-hidden">
				<div className="w-[48.6%] sm:w-full h-[400px] sm:h-[185px] aspect-square">
					<img src="/images/login1.png" alt="background" className="w-full h-full object-cover" />
				</div>
				<div className="w-[51.4%] sm:w-full flex flex-col justify-center p-10 shadow-lg">
					<h1 className="text-2xl">
						<span className="text-[#FB8500] font-bold">Verifikasi</span>
					</h1>
					<div className="overflow-hidden w-full">
						<div className="flex">
							<div className={`mt-1 transition-all w-full flex-shrink-0 flex-grow-0 `}>
								<input
									type="email"
									className="block w-full mt-3 rounded-md h-11 p-4 placeholder-[#002140]"
									placeholder="Email"
									value={formData.email}
									name="email"
									onChange={handleChange}
									disabled={true}
								/>
								<input
									type="text"
									className={`block w-full mt-3 rounded-md h-11 p-4 placeholder-[#002140] transition-all transform translate-x-0`}
									placeholder="Masukkan Kode Verifikasi"
									value={formData.code_verify}
									name="code_verify"
									onChange={handleChange}
								/>
								<button
									type="submit"
									className={`mt-5 text-xs w-full bg-[#FB8500] px-2 py-1 h-11 rounded-md text-white transition-all ${loading ? 'cursor-wait bg-[#d66f00f5]' : 'cursor-pointer'} `}
									onClick={() => submitCode()}
								>
									Submit
								</button>
								<p className={`text-white text-xs mt-2`}>
									Belum menerima kode verifikasi?
									{' '}
									<button className="text-orange font-semibold" type="button" onClick={() => getVerifyCode()}>
										Kirim ulang kode.
									</button>
								</p>
							</div>
						</div>
					</div>
					<p className="mt-3 text-xs text-white text-center">
						Kembali ke
						{' '}
						<Link to="/signup" className="text-[#FB8500] font-bold">
							Register
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Verification;
