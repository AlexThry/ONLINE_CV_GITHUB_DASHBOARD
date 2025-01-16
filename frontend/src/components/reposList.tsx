function RepoList() {
	const repo = (
		title: string,
		description: string,
		owner: string,
		imageUrl: string,
		last: boolean = false
	) => {
		return (
			<>
				<div className="flex w-full  items-center justify-around border-main-100 border-opacity-10 h-14 md:flex-1 md:h-auto">
					<h1 className="font-cousine text-[12px] text-repos-base font-bold mdl:text-[16px]">
						{title}
					</h1>
					<p className="font-cousine line-clamp-3 text-[10px] text-repos-base w-[150px] mdl:text-[12px] mdl:w-[250px] lg:w-[350px]">
						{description}
					</p>
					<p className="font-cousine line-clamp-1 text-[10px] text-repos-base max-w-[150px] mdl:text-[12px]">
						{owner}
					</p>
				</div>
				{!last && (
					<div className="w-full border-main-100 border-opacity-10 border-b h-[1px]" />
				)}
			</>
		);
	};

	return (
		<>
			<div className="flex flex-col flex-auto w-full">
				{[...Array(5)].map((_, index) => {
					return repo(
						`Title ${index + 1}`,
						`Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla est culpa accusamus consectetur molestias sapiente magnam totam, impedit tempore, reprehenderit sequi doloribus, esse eos error aliquam sed vitae ab id.  ${
							index + 1
						}`,
						`Owner ${index + 1}`,
						`ImageURL ${index + 1}`,
						index === 4
					);
				})}
			</div>
		</>
	);
}
export default RepoList;
