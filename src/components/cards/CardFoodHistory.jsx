/* eslint-disable react/prop-types */

function NutritionWrap({ name, icon, value }) {
	return (
		<div className="h-14 flex flex-col justify-center  items-center py-2">
			<p className="text-navy font-medium opacity-90 sm:text-sm">{name}</p>
			<div className="flex flex-row justify-center gap-2 items-center">
				<img src={`/icons/${icon}`} className="h-[18px] sm:h-4" alt={`icon ${name}`} />
				<p className="font-semibold text-cyan-900 sm:text-sm">{value}+</p>
			</div>
		</div>
	);
}

function CardFoodHistory({ data, portion, date, time, onDelete }) {
	const fat = data ? (data.fat * portion).toFixed(2).toString() : '';
	const calorie = data ? (data.cal * portion).toFixed(2).toString() : '';
	const protein = data ? (data.protein * portion).toFixed(2).toString() : '';
	const carbo = data ? (data.carb * portion).toFixed(2).toString() : '';
	return (
		<div className="flex justify-between items-center tab:flex-col w-full mt-5 border border-white-400/60 rounded-[10px] p-4 sm:p-3">
			<div className="w-[25%] 2lg:w-[27%] tab:flex tab:justify-between tab:items-center tab:w-full">
				<div className="flex flex-row gap-5 sm:gap-3 items-center">
					<img
						src={data.image.includes('http') ? data.image : 'https://picsum.photos/265/150'}
						alt={data ? data.name : 'food'}
						className="w-[70px] sm:w-12 2lg:w-14 h-[70px] 2lg:h-14 sm:h-12 rounded-full"
					/>
					<div className="flex flex-col h-14 text-navy justify-center">
						<p className="text-lg font-semibold ">{data ? data.name : ''}</p>
						<p className="text-sm text-slate-500">Makanan Utama</p>
					</div>
				</div>
				<div className="hidden py-2 sm:py-1 px-5 sm:px-3 rounded-full bg-slate-200 tab:flex flex-row items-center justify-center">
					<p className="sm:text-sm">{portion} Porsi</p>
				</div>
			</div>
			<div className="w-[55%] tab:w-full tab:mt-2 grid grid-cols-4 gap-5 sm:gap-2 sm:mr-4">
				<NutritionWrap name="Lemak" icon="icon-lemak-no-bg.svg" value={parseFloat(fat.length > 4 ? fat.slice(0, 4) : fat)} />
				<NutritionWrap name="Kalori" icon="icon-calori-no-bg.svg" value={parseFloat(calorie.length > 4 ? calorie.slice(0, 4) : calorie)} />
				<NutritionWrap name="Protein" icon="icon-protein-no-bg.svg" value={parseFloat(protein.length > 4 ? protein.slice(0, 4) : protein)} />
				<NutritionWrap name="Karbohidrat" icon="icon-karbo-no-bg.svg" value={parseFloat(carbo.length > 4 ? carbo.slice(0, 4) : carbo)} />
			</div>
			<div className="w-32 h-9 rounded-full bg-slate-200 flex flex-row items-center justify-center tab:hidden">
				<p>{portion} Porsi</p>
			</div>
			{ onDelete && <div className="flex items-center justify-center">
				<button
					type="button"
					className="me-2 ml-4 py-2 px-3 bg-red border-2 rounded-lg"
					onClick={() => onDelete({ date, foodId: data._id, time })}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="icon-tabler icon-tabler-trash text-white"
						>
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M4 7l16 0" />
						<path d="M10 11l0 6" />
						<path d="M14 11l0 6" />
						<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
						<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
					</svg>
				</button>
			</div>}
			
			</div>
	);
}

export default CardFoodHistory;
