import { useEffect } from "react";
import ApexCharts from "apexcharts";

function Piechart() {
	useEffect(() => {
		const getChartOptions = () => {
			return {
				series: [35.1, 23.5, 2.4, 5.4],
				colors: ["#EAC8CA", "#99E1D9", "#EB5E5E", "#878787"],
				chart: {
					height: "80%",
					width: "100%",
					type: "donut",
				},
				stroke: {
					colors: ["transparent"],
					lineCap: "",
				},
				grid: {
					padding: {
						top: 0,
					},
				},
				labels: ["Python", "Javascript", "PHP", "Java"],
				dataLabels: {
					enabled: false,
				},
				legend: {
					position: "right",
					fontFamily: "Cousine, sans-serif",
				},
				yaxis: {
					labels: {
						formatter: function (value: string) {
							return value + "%";
						},
					},
				},
			};
		};

		if (
			document.getElementById("donut-chart") &&
			typeof ApexCharts !== "undefined"
		) {
			const chart = new ApexCharts(
				document.getElementById("donut-chart"),
				getChartOptions()
			);
			chart.render();
		}
	}, []);

	return (
		<>
			<div className="flex flex-col items-start h-full w-full max-h-full">
				<p className="text-[16px] text-languages-base font-cousine">
					Languages
				</p>
				<div className="flex justify-center items-center w-full h-full border-main-100 border-opacity-10">
					<div id="donut-chart"></div>
				</div>
			</div>
		</>
	);
}

export default Piechart;
