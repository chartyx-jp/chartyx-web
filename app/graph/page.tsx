'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import { CandlestickSeries, createChart, LineSeries } from 'lightweight-charts';
import { subMonths, format, parseISO} from 'date-fns';
import { useState, useEffect, useRef } from 'react';

import MySetButtons from '@/components/MySetButtons';

export default function Graph() {
    const chartRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!chartRef.current) return(console.log('chart is null'));
        // chartContainerRef.currentはnullの可能性があるので、nullチェックを行う
        
        // lineChart
        const chart = createChart(chartRef.current, {
            width: chartRef.current.clientWidth,
            height: 600,
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


        const lineSeries = chart.addSeries(LineSeries);
        // lineSeries.setData([
        //     { time: '2019-04-11', value: 8000.01 },
        //     { time: '2019-04-12', value: 9600.63 },
        //     { time: '2019-04-13', value: 7600.64 },
        //     { time: '2019-04-14', value: 8100.89 },
        //     { time: '2019-04-15', value: 7400.43 },
        //     { time: '2019-04-16', value: 8000.01 },
        //     { time: '2019-04-17', value: 9600.63 },
        //     { time: '2019-04-18', value: 7600.64 },
        //     { time: '2019-04-19', value: 8100.89 },
        //     { time: '2019-04-20', value: 7400.43 },
        // ]);

        // ダミーデータ（実際はAPIなどで取得してね）
        const candleSeries = chart.addSeries(CandlestickSeries);
        const dummyData = [
            { time: '2025-03-26', open: 100, high: 110, low: 90, close: 105 },
            { time: '2025-03-27', open: 100, high: 110, low: 90, close: 105 },
            { time: '2025-03-28', open: 100, high: 110, low: 90, close: 105 },
            { time: '2025-03-29', open: 100, high: 110, low: 90, close: 105 },
            { time: '2025-03-30', open: 100, high: 110, low: 90, close: 105 },
            { time: '2025-03-31', open: 100, high: 110, low: 90, close: 105 },
            { time: '2025-04-02', open: 105, high: 115, low: 100, close: 110 },
            { time: '2025-04-03', open: 110, high: 120, low: 100, close: 115 },
            { time: '2025-04-04', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-05', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-06', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-07', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-08', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-09', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-10', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-11', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-12', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-13', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-14', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-15', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-16', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-17', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-18', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-19', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-20', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-21', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-22', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-23', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-24', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-25', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-26', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-27', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-28', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-29', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-04-30', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-05-01', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-05-02', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-05-03', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-05-04', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-05-05', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-05-06', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-05-07', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-05-08', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-05-09', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-05-10', open: 115, high: 118, low: 110, close: 112 },
            { time: '2025-05-11', open: 115, high: 118, low: 110, close: 112 },
        ];

        candleSeries.setData(dummyData);

        // 最後の time を取得
        const latestTime = dummyData[dummyData.length - 1].time;

        // Date型に変換して1か月前に
        const oneMonthAgoDate = subMonths(parseISO(latestTime), 1);

        // 文字列で整形
        const oneMonthAgo = format(oneMonthAgoDate, 'yyyy-MM-dd');

        chart.timeScale().setVisibleRange({
            from: oneMonthAgo,
            to: latestTime,
        });

        // ボタン管理
        const buttons = ['A', 'B', 'C', 'D', 'E'];




        // リサイズ対応
        const handleResize = () => {
            if (chartRef.current) {
                chart.applyOptions({
                    width: chartRef.current.clientWidth,
                });
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.removeSeries(lineSeries);
            chart.removeSeries(candleSeries);
            chart.remove();
        };
    }, []);
    
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100vw',
                    height: '100svh-80px',
                    backgroundColor: '#000',
                }}
            >

                <Box ref={chartRef} 
                    sx={{
                        width: {
                            xs: '90%',
                            sm: '75%',
                            md: '60%',
                            lg: '1000px',
                            xl: '1200px'
                        },
                        minHeight: '600px',
                        border: '1px solid #fff',
                    }}
                >
                    {/* この中にチャート描画 */}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: {
                            xs: '90%',
                            md: '60%',
                            
                        },
                        height: 'auto',
                    }}
                >
                    <MySetButtons id="candle" name="ローソク" active={true}></MySetButtons>
                    <MySetButtons id="bar" name="棒グラフ" active={true}></MySetButtons>
                    <MySetButtons id="line" name="折れ線" active={true}></MySetButtons>
                    <MySetButtons id="A" name="A" active={true}></MySetButtons>
                    <MySetButtons id="B" name="B" active={true}></MySetButtons>
                    <MySetButtons id="C" name="C" active={true}></MySetButtons>
                    <MySetButtons id="C" name="C" active={true}></MySetButtons>
                    <MySetButtons id="C" name="C" active={true}></MySetButtons>
                    <MySetButtons id="C" name="C" active={true}></MySetButtons>
                    <MySetButtons id="C" name="C" active={true}></MySetButtons>
                    <MySetButtons id="C" name="C" active={true}></MySetButtons>
                    <MySetButtons id="C" name="C" active={true}></MySetButtons>
                </Box>
            </Box>
        </>
    );
}
