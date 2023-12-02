import { useSelector } from 'react-redux';
import Recommendation from '../components/Recommendation';
import CardFoodChosen from '../components/cards/CardFoodChosen';
import CardFoodHistory from '../components/cards/CardFoodHistory';
import CardNutritionTrack from '../components/cards/CardNutritionTrack';
import Button from '../components/buttons/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Tracking = () => {
	const [foodsSelectedToday, setFoodsSelectedToday] = useState([]);
	const token = useSelector((state) => state.auth.token);
	useEffect(() => {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios.get('/tracking/today', config).then((res) => {
			if (res.status === 200 && res.data) {
				setFoodsSelectedToday(res.data.tracking.food);
			}
		});
	}, [token]);
	return (
		<section className="px-[6.25%] w-full tab:h-full tab:pt-[4rem] mt-[7.5rem] tab:mt-14 ">
			<p className="text-2xl font-bold text-navy">Pilih Makanan</p>
			<CardFoodChosen />
			<div className="w-full mt-5 grid grid-cols-4 gap-5 lg:grid-cols-2 sm:grid-cols-1">
				<CardNutritionTrack name={'Lemak'} icon={'lemak-icon.svg'} percentase={'+10%'} value={1000} target={1000} text={'Capaian menjadi'} />{' '}
				<CardNutritionTrack
					name={'Kalori'}
					icon={'kalori-icon.svg'}
					percentase={'+10%'}
					value={1000}
					target={1000}
					text={'Capaian menjadi'}
				/>
				<CardNutritionTrack
					name={'Protein'}
					icon={'protein-icon.svg'}
					percentase={'+10%'}
					value={1000}
					target={1000}
					text={'Capaian menjadi'}
				/>
				<CardNutritionTrack
					name={'Karbohidrat'}
					icon={'carbo-icon.svg'}
					percentase={'+10%'}
					value={1000}
					target={1000}
					text={'Capaian menjadi'}
				/>
			</div>
			<div className="grid place-content-center mt-12">
				<Button buttonText={'Pilih Makanan'}></Button>
			</div>
			<p className="font-bold mt-16 text-2xl text-navy">Makanan dipilih hari ini</p>
			<div>
				{/* <CardFoodHistory /> */}
				{foodsSelectedToday.map((x) => {
					return <CardFoodHistory key={x.foodId._id} data={x.foodId} portion={x.portion} />;
				})}
			</div>

			<Recommendation />
		</section>
	);
};

export default Tracking;
