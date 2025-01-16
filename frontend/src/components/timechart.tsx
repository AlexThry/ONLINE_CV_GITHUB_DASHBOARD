import { useEffect } from "react";
import ApexCharts from "apexcharts";

function Timechart() {
	useEffect(() => {
		const options = {
			chart: {
				height: "80%",
				maxWidth: "100%",
				type: "area",
				fontFamily: "Cousine",
				dropShadow: {
					enabled: false,
				},
				toolbar: {
					show: false,
				},
			},
			tooltip: {
				enabled: true,
				marker: {
					show: true,
				},
				shared: false,
				x: {
					show: true,
				},
				onDatasetHover: {
					highlightDataSeries: false,
				},
			},
			fill: {
				type: "gradient",
				gradient: {
					opacityFrom: 0,
					opacityTo: 0,
					shade: "#99E1D9",
					gradientToColors: ["#99E1D9"],
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				width: 8,
			},
			grid: {
				show: false,
				strokeDashArray: 4,
				padding: {
					left: 2,
					right: 2,
					top: 0,
				},
			},
			series: [
				{
					name: "New users",
					data: [6500, 6418, 6456, 6526, 6356, 6456],
					color: "#99E1D9",
				},
			],
			xaxis: {
				categories: [
					"01 February",
					"02 February",
					"03 February",
					"04 February",
					"05 February",
					"06 February",
					"07 February",
				],
				labels: {
					show: false,
				},
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
				tooltip: {
					enabled: false,
				},
			},
			yaxis: {
				show: false,
			},
		};

		if (
			document.getElementById("area-chart") &&
			typeof ApexCharts !== "undefined"
		) {
			const chart = new ApexCharts(
				document.getElementById("area-chart"),
				options
			);
			chart.render();
		}
	}, []);
	return (
		<>
			<div className="flex flex-col h-full w-full max-h-full">
				<p className="text-[16px] text-commits-base font-cousine">
					Commits
				</p>
				<div className="h-full border-b border-l border-main-100 border-opacity-10">
					<div id="area-chart"></div>
				</div>
			</div>
		</>
	);
}

export default Timechart;
