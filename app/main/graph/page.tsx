'use client';

import { Box, Typography } from '@mui/material';
import {
    createChart,
    ISeriesApi,
    IChartApi,
    Time,
} from 'lightweight-charts';
import { subMonths, format, parseISO } from 'date-fns';
import { useState, useEffect, useRef } from 'react';
import MySetButtons from '@/components/MySetButtons';
import Header from '@/components/Header';

// --- 型定義 ---

type ChartSeries = {
    candle?: ISeriesApi<'Candlestick'>;
    histogram?: ISeriesApi<'Histogram'>;
    line?: ISeriesApi<'Line'>;
    [key: string]: ISeriesApi<'Candlestick' | 'Histogram' | 'Line'> | undefined;
};

type ActiveButtonStates = {
    candle: boolean;
    bar: boolean;
    line: boolean;
    A: boolean;
    B: boolean;
    C: boolean;
    D: boolean;
    E: boolean;
    F: boolean;
    G: boolean;
    H: boolean;
    I: boolean;
    [key: string]: boolean;
};

// APIから返されるデータアイテムの型（想定）
type ChartDataItem = {
    time: string; // lightweight-charts用に'yyyy-MM-dd'形式であるべき
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
};

// --- コンポーネント ---

export default function Graph() {
    // --- チャートやDOM要素のためのRef ---
    const chartRef = useRef<HTMLDivElement>(null);
    const miniChartRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const chartInstanceRef = useRef<{ chart: IChartApi | null; miniChart: IChartApi | null }>({ chart: null, miniChart: null });
    const seriesRef = useRef<ChartSeries>({});

    // --- State管理 ---
    const [stockCode, ] = useState('1301'); // 銘柄コードの例
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const [activeButtons, setActiveButtons] = useState<ActiveButtonStates>({
        candle: true,
        bar: true,
        line: false,
        A: true,
        B: false,
        C: false,
        D: false,
        E: false,
        F: false,
        G: false,
        H: false,
        I: false,
    });

    // --- Effect 1: チャートとシリーズの初期化（一度だけ実行） ---
    useEffect(() => {
        if (!chartRef.current || !miniChartRef.current) return;

        // メインチャートの作成
        const chart = createChart(chartRef.current, {
            width: chartRef.current.clientWidth,
            height: chartRef.current.clientHeight,
            layout: { background: { color: '#000000' }, textColor: '#ffffff' },
            grid: { vertLines: { color: '#333333' }, horzLines: { color: '#333333' } },
            localization: { locale: 'ja-JP', dateFormat: 'yyyy/MM/dd' },
            crosshair: { mode: 1 },
        });

        // ミニチャートの作成
        const miniChart = createChart(miniChartRef.current, {
            width: miniChartRef.current.clientWidth,
            height: miniChartRef.current.clientHeight,
            layout: { background: { color: '#000000' }, textColor: '#ffffff' },
            grid: { vertLines: { color: '#333333' }, horzLines: { color: '#333333' } },
            localization: { locale: 'ja-JP', dateFormat: 'yyyy/MM/dd' },
        });

        chartInstanceRef.current.chart = chart;
        chartInstanceRef.current.miniChart = miniChart;

        // チャートにシリーズを追加
        seriesRef.current.candle = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickVisible: true,
        });
        seriesRef.current.line = chart.addLineSeries({ color: '#2196F3', lineWidth: 2, visible: false });
        seriesRef.current.histogram = miniChart.addHistogramSeries({ color: '#26a69a' });

        // ツールチップのロジック
        const tooltipElem = tooltipRef.current;
        if (tooltipElem) {
            chart.subscribeCrosshairMove((param) => {
                if (!param.time || !param.point || !seriesRef.current.candle || !seriesRef.current.histogram) {
                    tooltipElem.style.display = 'none';
                    return;
                }
                const candleData = param.seriesData.get(seriesRef.current.candle) as ChartDataItem | undefined;
                const volumeData = param.seriesData.get(seriesRef.current.histogram) as { value: number } | undefined;

                if (candleData) {
                    const date = format(parseISO(candleData.time as string), 'yyyy/MM/dd');
                    const vol = volumeData ? volumeData.value.toLocaleString() : 'N/A';

                    tooltipElem.style.display = 'block';
                    tooltipElem.innerHTML = `
                        <div><strong>${date}</strong></div>
                        <div>始値: ${candleData.open.toFixed(2)}</div>
                        <div>高値: ${candleData.high.toFixed(2)}</div>
                        <div>安値: ${candleData.low.toFixed(2)}</div>
                        <div>終値: ${candleData.close.toFixed(2)}</div>
                        <div>出来高: ${vol}</div>
                    `;

                    const chartContainer = chartRef.current;
                    if (chartContainer) {
                        const chartRect = chartContainer.getBoundingClientRect();
                        const tooltipWidth = tooltipElem.offsetWidth;
                        const tooltipHeight = tooltipElem.offsetHeight;

                        let left = param.point.x + 15;
                        if (left + tooltipWidth > chartRect.width) {
                            left = param.point.x - tooltipWidth - 15;
                        }

                        let top = param.point.y + 15;
                        if (top + tooltipHeight > chartRect.height) {
                            top = param.point.y - tooltipHeight - 15;
                        }

                        tooltipElem.style.left = `${left}px`;
                        tooltipElem.style.top = `${top}px`;
                    }
                } else {
                    tooltipElem.style.display = 'none';
                }
            });
        }

        // リサイズハンドラ
        const handleResize = () => {
            if (chartRef.current) {
                chart.resize(chartRef.current.clientWidth, chartRef.current.clientHeight);
            }
            if (miniChartRef.current) {
                miniChart.resize(miniChartRef.current.clientWidth, miniChartRef.current.clientHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        // アンマウント時のクリーンアップ
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
            miniChart.remove();
        };
    }, []);

    // --- Effect 2: チャートデータ取得（stockCodeが変更されるたびに実行） ---
    useEffect(() => {
        const getChartData = async (code: string) => {
            try {
                // APIエンドポイントは { prices: [...] } のような形式でデータを返すと想定
                const response = await fetch(`/api/proxy?endPoint=/stocks/ticker/&code=${code}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }
                const data = await response.json();
            if (Array.isArray(data)) {
                // サーバーからのキー（Date, Open等）をライブラリ用のキー（time, open等）に変換
                // eslint-disable-next-line
                const formattedData = data.map((item: any) => ({
                    time:   item.Date.replace(/\//g, '-'), // 'Date'を'time'に、さらに日付形式も変換
                    open:   item.Open,                      // 'Open'を'open'に
                    high:   item.High,                      // 'High'を'high'に
                    low:    item.Low,                       // 'Low'を'low'に
                    close:  item.Close,                     // 'Close'を'close'に
                    volume: item.Volume                      // 'Volume'を'volume'に
                }));
                setChartData(formattedData);
            } else {
                console.error("Error: API response was not an array.", data);
                setChartData([]);
            }
            } catch (error) {
                console.error('Error fetching chart data:', error);
                setChartData([]); // エラー時はデータをクリア
            }
        };

        getChartData(stockCode);
    }, [stockCode]); // このeffectは `stockCode` が変更されるたびに再実行される


    // --- Effect 3: チャートへのデータ設定（chartDataが変更されるたびに実行） ---
    useEffect(() => {
        const { chart, miniChart } = chartInstanceRef.current;
        const { candle, histogram, line } = seriesRef.current;

        if (!chart || !miniChart || !candle || !histogram || !line || chartData.length === 0) {
            return;
        }

        // 各シリーズにデータを設定
        candle.setData(chartData);
        line.setData(chartData.map(d => ({ time: d.time, value: d.close }))); // 例：終値の折れ線グラフ
        histogram.setData(chartData.map(d => ({ time: d.time, value: d.volume })));
        
        // 初期表示範囲の設定
        const latestTime = chartData[chartData.length - 1].time as Time;
        const oneMonthAgoDate = subMonths(parseISO(latestTime as string), 1);
        const oneMonthAgo = format(oneMonthAgoDate, 'yyyy-MM-dd') as Time;

        chart.timeScale().setVisibleRange({ from: oneMonthAgo, to: latestTime });
        miniChart.timeScale().setVisibleRange({ from: oneMonthAgo, to: latestTime });

    }, [chartData]); // このeffectは `chartData` が変更されるたびに再実行される


    // --- Effect 4: シリーズ表示切替（ボタンの状態が変更されるたびに実行） ---
    useEffect(() => {
        seriesRef.current.candle?.applyOptions({ visible: activeButtons.candle });
        seriesRef.current.histogram?.applyOptions({ visible: activeButtons.bar });
        seriesRef.current.line?.applyOptions({ visible: activeButtons.line });
        // 他のインジケーター（A, B, C...）のロジックをここに追加
    }, [activeButtons]);

    // --- イベントハンドラ ---
    const handleButtonClick = (id: string) => {
        setActiveButtons(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // --- JSXレンダリング ---
    return (
        <>
            <Box sx={{ marginTop: '60px', width: '100vw', position: 'relative' }}>
                <Header></Header>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw', height: '100%', backgroundColor: '#000', padding: '0 10px' }}>
                    
                    {/* 企業情報ボックス */}
                    <Box sx={{
                        width: { xs: '95%', sm: '85%', md: '70%', lg: '1000px', xl: '1200px' },
                        height: '150px', marginTop: '20px', border: '1px solid #ddd', borderRadius: '5px', padding: '10px'
                    }}>
                        <Box sx={{ height: '50%', display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h5" sx={{ color: '#fff', marginRight: '15px' }}>
                                {stockCode}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#fff' }}>
                                XXX株式会社
                            </Typography>
                        </Box>
                        <Typography variant="h4" sx={{ color: '#fff', flexGrow: 1, textAlign: 'left' }}>
                            {chartData.length > 0 ? `${chartData[chartData.length - 1].close.toLocaleString()}円` : 'Loading...'}
                        </Typography>
                    </Box>

                    {/* メインチャート */}
                    <Box ref={chartRef} sx={{
                        marginTop: '20px',
                        width: { xs: '95%', sm: '85%', md: '70%', lg: '1000px', xl: '1200px' },
                        aspectRatio: '16/9',
                        position: 'relative',
                        border: '1px solid #ddd'
                    }}>
                        <Box ref={tooltipRef} sx={{
                            position: 'absolute', display: 'none', padding: '8px',
                            background: 'rgba(0, 0, 0, 0.8)', color: '#fff', border: '1px solid #555',
                            borderRadius: '4px', fontSize: '14px', zIndex: 1000,
                            pointerEvents: 'none', whiteSpace: 'nowrap',
                        }} />
                    </Box>

                    {/* ミニチャート（出来高） */}
                    <Box ref={miniChartRef} sx={{
                        width: { xs: '95%', sm: '85%', md: '70%', lg: '1000px', xl: '1200px' },
                        height: '100px', border: '1px solid #ddd', borderTop: 'none'
                    }} />

                    {/* 操作ボタン */}
                    <Box sx={{
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '20px',
                        width: { xs: '95%', sm: '85%', md: '70%', lg: '1000px', xl: '1200px' },
                    }}>
                        <MySetButtons id="candle" name="ローソク" active={activeButtons.candle} onClick={handleButtonClick} />
                        <MySetButtons id="bar" name="出来高" active={activeButtons.bar} onClick={handleButtonClick} />
                        <MySetButtons id="line" name="折れ線" active={activeButtons.line} onClick={handleButtonClick} />
                        <MySetButtons id="A" name="移動平均線" active={activeButtons.A} onClick={handleButtonClick} />
                        <MySetButtons id="B" name="ボリンジャーバンド" active={activeButtons.B} onClick={handleButtonClick} />
                        <MySetButtons id="C" name="C" active={activeButtons.C} onClick={handleButtonClick} />
                        <MySetButtons id="D" name="D" active={activeButtons.D} onClick={handleButtonClick} />
                        <MySetButtons id="E" name="E" active={activeButtons.E} onClick={handleButtonClick} />
                        <MySetButtons id="F" name="F" active={activeButtons.F} onClick={handleButtonClick} />
                        <MySetButtons id="G" name="G" active={activeButtons.G} onClick={handleButtonClick} />
                        <MySetButtons id="H" name="H" active={activeButtons.H} onClick={handleButtonClick} />
                        <MySetButtons id="I" name="I" active={activeButtons.I} onClick={handleButtonClick} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}