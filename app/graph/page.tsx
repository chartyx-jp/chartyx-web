'use client';

import { Box } from '@mui/material';
import { CandlestickSeries, createChart, LineSeries } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export default function Home() {
    const lineChartRef = useRef<HTMLDivElement>(null);
    const candleChartRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!lineChartRef.current || !candleChartRef.current) return;
        // chartContainerRef.currentはnullの可能性があるので、nullチェックを行う

        // lineChart
        const chart = createChart(document.getElementById('line-chart') as HTMLElement, {
            width: 800,
            height: 300,
            layout: {
                background: {
                    color: '#000000',
                },
                textColor: '#ffffff',
            },
            grid: {
                vertLines: {
                    color: '#e0e0e0',
                },
            },
            localization: {
                locale: 'ja-JP',
                dateFormat: 'yyyy/MM/dd',
            },
        });
        const chartB = createChart(document.getElementById('candle-chart') as HTMLElement, { width: 400, height: 300 });
        const lineSeries = chart.addSeries(LineSeries);
        lineSeries.setData([
            { time: '2019-04-11', value: 8000.01 },
            { time: '2019-04-12', value: 9600.63 },
            { time: '2019-04-13', value: 7600.64 },
            { time: '2019-04-14', value: 8100.89 },
            { time: '2019-04-15', value: 7400.43 },
            { time: '2019-04-16', value: 8000.01 },
            { time: '2019-04-17', value: 9600.63 },
            { time: '2019-04-18', value: 7600.64 },
            { time: '2019-04-19', value: 8100.89 },
            { time: '2019-04-20', value: 7400.43 },
        ]);

        // ダミーデータ（実際はAPIなどで取得してね）
        const candleSeries = chartB.addSeries(CandlestickSeries);
        candleSeries.setData([
            { time: '2023-12-01', open: 100, high: 110, low: 90, close: 105 },
            { time: '2023-12-02', open: 105, high: 115, low: 100, close: 110 },
            { time: '2023-12-03', open: 110, high: 120, low: 100, close: 115 },
            { time: '2023-12-04', open: 115, high: 118, low: 110, close: 112 },
        ]);

        // リサイズ対応
        const handleResize = () => {
            if (lineChartRef.current) {
                chart.applyOptions({
                    width: lineChartRef.current.clientWidth,
                });
            }
            if (candleChartRef.current) {
                chartB.applyOptions({
                    width: candleChartRef.current.clientWidth,
                });
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.removeSeries(lineSeries);
            chart.remove();
            chartB.removeSeries(candleSeries);
            chartB.remove();
        };
    }, []);
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    width: '100vw',
                    height: '100svh',
                    backgroundColor: '#000',
                }}
            >
                <Box
                    sx={{
                        display: 'block',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40vw',
                        height: '100svh',
                        backgroundColor: '#000',
                    }}
                ></Box>

                <Box>
                    <div id="line-chart" ref={lineChartRef} style={{ width: '60%', height: '300' }}></div>
                    <div id="candle-chart" ref={candleChartRef} style={{ width: '60%', height: '300' }}></div>
                </Box>
            </Box>
        </>
    );
}
