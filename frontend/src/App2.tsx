function App2() {
	const repo = (
		title: string,
		description: string,
		owner: string,
		imageUrl: string
	) => {
		return (
			<>
				<div className="flex w-full h-[75px] bg-yellow-950 mb-5">
					{/* ...content... */}
				</div>
			</>
		);
	};

	return (
		<>
        <div className="h-screen w-screen bg-black flex flex-col p-5">
            <div className="h-40 min-h-40 bg-red-600 mb-5"></div>
            <div className="h-40 min-h-40 bg-blue-600 mb-5"></div>
            <div className="flex-auto flex gap-5 p-5 bg-green-600">
                <div className="flex flex-col h-full gap-5 p-5 w-96 bg-yellow-400">
                    <div className="flex-1 bg-slate-600"></div>
                    <div className="flex-1  bg-slate-600"></div>
                </div>
                <div className="h-full flex-auto bg-fuchsia-700 p-5 overflow-hidden overflow-y-scroll max-h-full">
                    {[...Array(2)].map((_, index) => (
                        <div key={index}>
                            {repo(
                                `Title ${index + 1}`,
                                `Description ${index + 1}`,
                                `Owner ${index + 1}`,
                                `ImageURL ${index + 1}`
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>

            {/* <div class="h-screen w-screen bg-black flex flex-col p-5">
  <div class="h-40 min-h-40 bg-red-600 mb-5"></div>
  <div class="h-40 min-h-40 bg-blue-600 mb-5"></div>
  <div class="flex-auto flex gap-5 p-5 bg-green-600">
    <div class="flex flex-col bg-red-500 w-40 h-full p-5 gap-5">
      <div class="flex-1 bg-blue-500"></div>
      <div class="flex-1 bg-blue-500"></div>
    </div>
    <div class="flex flex-col h-full flex-1 bg-yellow-500 overflow-y-scroll p-5 gap-5">
      <div class="h-10 bg-blue-500"></div>
      <div class="h-10 bg-blue-500"></div>
      
    </div>
    
  </div>
</div> */}
		</>
	);
}

export default App2;
