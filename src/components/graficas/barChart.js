import { useState, useEffect } from "react";
import './barChart.css';

import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart() {
    const [chartData, setChartData] = useState({
        labels: ['Enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre','diciembre'],
        datasets: [
            {
                label: 'Ventas',
                data: [2430, 6778, 8563, 6742, 5623, 7545, 5632, 6325, 5356, 6542, 4213, 4563],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgb(53, 20, 235, 0.4)'
            },
            // Agregar una segunda fila de datos para otra serie
            {
                label: 'Compras',
                data: [1000, 2000, 1500, 3000, 2500, 2000, 1800, 2200, 2800, 2100, 2400, 2800],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132, 0.4)'
            }
        ]
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartOptions({
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: "Ingreso mensual."
                }
            },
            maintainAspectRatio: false,
            responsive: true,
        });
    }, []);

    return (
        <Bar data={chartData} options={chartOptions}></Bar>
    );
}
