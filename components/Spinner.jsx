const Spinner = () => {
	return (
		<div className="fixed z-50 inset-0 flex flex-col gap-4 items-center justify-center bg-black opacity-50">
			<div className="h-16 w-16 border-x-0 border-y-8 border-green-500 rounded-full animate-spin" />
			<p className="text-green-700 text-2xl">
				Loading{" "}
				<span className="animate-loading inline-block">...</span>
			</p>
		</div>
	);
};
export default Spinner;
