'use client';

import { CandlestickSeries, createChart, LineSeries } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export default function Home() {
    useEffect(() => {
        // lineChart
        const chart = createChart(document.getElementById('line-chart') as HTMLElement, { width: 400, height: 300, 
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
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
        };
        window.addEventListener('resize', handleResize);
    
        
        return () => {
            chart.removeSeries(lineSeries);
            chart.remove();
        };
    }, []);
    return (
        <>
            <div id="line-chart"></div>
            <div id ="candle-chart"></div>
        </>
    );
}