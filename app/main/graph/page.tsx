'use client';

import { Box, Typography } from '@mui/material';
import {
    createChart,
    ISeriesApi,
    IChartApi,
    Time,
} from 'lightweight-charts';
import { subMonths, format, parseISO, isValid } from 'date-fns';
import { useState, useEffect, useRef } from 'react';
import MySetButtons from '@/components/MySetButtons';
import { useTheme } from '@mui/material/styles';
import { useSearchParams } from 'next/navigation';
import { 
    Paper, 
    CircularProgress,
    Alert,
    Button
} from '@mui/material';
import { useRouter } from 'next/navigation';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
    const theme = useTheme();

    // --- チャートやDOM要素のためのRef ---
    const chartRef = useRef<HTMLDivElement>(null);
    const miniChartRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const chartInstanceRef = useRef<{ chart: IChartApi | null; miniChart: IChartApi | null }>({ chart: null, miniChart: null });
    const seriesRef = useRef<ChartSeries>({});

    // --- State管理 ---
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const [companyName, setCompanyName] = useState<string>(''); // 企業名を追加
    const [activeButtons, setActiveButtons] = useState<ActiveButtonStates>({
        candle: true,
        bar: true,
        line: false,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const ticker = searchParams.get('ticker');
    const router = useRouter();

    // --- 日付フォーマット関数 ---
    const formatDateForChart = (dateStr: string): string => {
        if (!dateStr) return '';
        
        // 既にYYYY-MM-DD形式の場合はそのまま返す
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            return dateStr;
        }
        
        // YYYY/MM/DD形式をYYYY-MM-DD形式に変換
        if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(dateStr)) {
            const [year, month, day] = dateStr.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        
        // MM/DD/YYYY形式をYYYY-MM-DD形式に変換
        if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
            const [month, day, year] = dateStr.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        
        // その他の形式は一旦そのまま返す
        return dateStr;
    };

    // --- Effect 1: チャートとシリーズの初期化（chartDataが存在し、DOM要素が準備できてから実行） ---
    useEffect(() => {
        if (!chartRef.current || !miniChartRef.current || chartData.length === 0) return;

        // 既存のチャートがあれば削除（安全に）
        try {
            if (chartInstanceRef.current.chart) {
                chartInstanceRef.current.chart.remove();
                chartInstanceRef.current.chart = null;
            }
        } catch (error) {
            console.warn('Error removing main chart:', error);
            chartInstanceRef.current.chart = null;
        }

        try {
            if (chartInstanceRef.current.miniChart) {
                chartInstanceRef.current.miniChart.remove();
                chartInstanceRef.current.miniChart = null;
            }
        } catch (error) {
            console.warn('Error removing mini chart:', error);
            chartInstanceRef.current.miniChart = null;
        }

        // seriesRefもリセット
        seriesRef.current = {};

        console.log('Initializing charts with data length:', chartData.length);
        console.log('Sample data:', chartData.slice(0, 3));

        // メインチャートの作成
        const chart = createChart(chartRef.current, {
            width: chartRef.current.clientWidth,
            height: chartRef.current.clientHeight,
            layout: { background: { color: '#000000' }, textColor: '#ffffff' },
            grid: { vertLines: { color: '#333333' }, horzLines: { color: '#333333' } },
            localization: { locale: 'ja-JP', dateFormat: 'yyyy/MM/dd' },
            crosshair: { mode: 1 },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        });

        // ミニチャートの作成
        const miniChart = createChart(miniChartRef.current, {
            width: miniChartRef.current.clientWidth,
            height: miniChartRef.current.clientHeight,
            layout: { background: { color: '#000000' }, textColor: '#ffffff' },
            grid: { vertLines: { color: '#333333' }, horzLines: { color: '#333333' } },
            localization: { locale: 'ja-JP', dateFormat: 'yyyy/MM/dd' },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        });

        chartInstanceRef.current.chart = chart;
        chartInstanceRef.current.miniChart = miniChart;

        // チャートにシリーズを追加
        const candleSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickVisible: true,
        });
        
        const lineSeries = chart.addLineSeries({ 
            color: '#2196F3', 
            lineWidth: 2, 
            visible: false 
        });
        
        const histogramSeries = miniChart.addHistogramSeries({ 
            color: '#26a69a' 
        });

        seriesRef.current.candle = candleSeries;
        seriesRef.current.line = lineSeries;
        seriesRef.current.histogram = histogramSeries;

        // データを設定
        try {
            console.log('Setting candle data...');
            candleSeries.setData(chartData);
            
            console.log('Setting line data...');
            const lineData = chartData.map(d => ({ time: d.time as Time, value: d.close }));
            lineSeries.setData(lineData);
            
            console.log('Setting histogram data...');
            const histogramData = chartData.map(d => ({ time: d.time as Time, value: d.volume }));
            histogramSeries.setData(histogramData);
        } catch (error) {
            console.error('Error setting chart data:', error);
            setError('チャートデータの設定中にエラーが発生しました。');
            return;
        }

        // 初期表示範囲の設定
        if (chartData.length > 0) {
            try {
                const latestTime = chartData[chartData.length - 1].time as Time;
                const oneMonthAgoDate = subMonths(parseISO(latestTime as string), 1);
                const oneMonthAgo = format(oneMonthAgoDate, 'yyyy-MM-dd') as Time;

                chart.timeScale().setVisibleRange({ from: oneMonthAgo, to: latestTime });
                miniChart.timeScale().setVisibleRange({ from: oneMonthAgo, to: latestTime });
            } catch (error) {
                console.warn('Error setting visible range:', error);
                // エラーが発生しても継続
            }
        }

        // ツールチップのロジック
        const tooltipElem = tooltipRef.current;
        if (tooltipElem) {
            chart.subscribeCrosshairMove((param) => {
                if (!param.time || !param.point || !candleSeries || !histogramSeries) {
                    tooltipElem.style.display = 'none';
                    return;
                }
                
                const candleData = param.seriesData.get(candleSeries) as ChartDataItem | undefined;
                const volumeData = param.seriesData.get(histogramSeries) as { value: number } | undefined;

                if (candleData) {
                    try {
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
                    } catch (error) {
                        console.warn('Error formatting tooltip:', error);
                        tooltipElem.style.display = 'none';
                    }
                } else {
                    tooltipElem.style.display = 'none';
                }
            });
        }

        // リサイズハンドラ
        const handleResize = () => {
            try {
                if (chartRef.current && chart) {
                    chart.resize(chartRef.current.clientWidth, chartRef.current.clientHeight);
                }
                if (miniChartRef.current && miniChart) {
                    miniChart.resize(miniChartRef.current.clientWidth, miniChartRef.current.clientHeight);
                }
            } catch (error) {
                console.warn('Error during chart resize:', error);
            }
        };

        window.addEventListener('resize', handleResize);

        // アンマウント時のクリーンアップ
        return () => {
            window.removeEventListener('resize', handleResize);
            
            try {
                if (chart) {
                    chart.remove();
                }
            } catch (error) {
                console.warn('Error removing main chart on cleanup:', error);
            }
            
            try {
                if (miniChart) {
                    miniChart.remove();
                }
            } catch (error) {
                console.warn('Error removing mini chart on cleanup:', error);
            }
            
            // Refもクリア
            chartInstanceRef.current.chart = null;
            chartInstanceRef.current.miniChart = null;
            seriesRef.current = {};
        };
    }, [chartData]); // chartDataが変更されるたびに再初期化

    // --- Effect 2: シリーズ表示切替（ボタンの状態が変更されるたびに実行） ---
    useEffect(() => {
        try {
            seriesRef.current.candle?.applyOptions({ visible: activeButtons.candle });
            seriesRef.current.histogram?.applyOptions({ visible: activeButtons.bar });
            seriesRef.current.line?.applyOptions({ visible: activeButtons.line });
            // 他のインジケーター（A, B, C...）のロジックをここに追加
        } catch (error) {
            console.warn('Error applying series options:', error);
        }
    }, [activeButtons]);

    // --- Effect 3: ティッカーに基づく株価データの取得 ---
    useEffect(() => {
        // tickerがない場合はデフォルト値「1301」を使用
        const targetTicker = ticker || '1301';
        
        if (targetTicker) {
            fetchStockData(targetTicker);
        } else {
            setLoading(false);
            setError('ティッカーコードが指定されていません。');
        }
    }, [ticker]);

    const fetchStockData = async (tickerCode: string) => {
        setLoading(true);
        setError(null);
        setCompanyName(''); // 企業名をリセット
        
        try {
            console.log('Original ticker from URL:', tickerCode);
            
            const cleanedTicker = tickerCode?.trim() || '';
            console.log('Cleaned ticker:', cleanedTicker);
            
            if (!cleanedTicker) {
                setError('ティッカーコードが指定されていません。');
                setLoading(false);
                return;
            }

            if (cleanedTicker.length > 100) {
                setError('ティッカーコードが長すぎます。');
                setLoading(false);
                return;
            }

            // 並行して企業名（検索API経由）と株価データを取得
            const [searchResponse, stockResponse] = await Promise.allSettled([
                fetch(`/api/proxy?endPoint=/stocks/search/&query=${encodeURIComponent(cleanedTicker)}`),
                fetch(`/api/proxy?endPoint=/stocks/ticker/&code=${encodeURIComponent(cleanedTicker)}`)
            ]);

            // 企業名の取得（検索APIから）
            if (searchResponse.status === 'fulfilled' && searchResponse.value.ok) {
                try {
                    const searchData = await searchResponse.value.json();
                    console.log('Search API response for company name:', searchData);
                    
                    if (Array.isArray(searchData) && searchData.length > 0) {
                        // 検索結果から企業名を抽出
                        // 日本語を含む項目（企業名）を探す
                        const companyNameCandidate = searchData.find(item => 
                            typeof item === 'string' && 
                            /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(item) // ひらがな、カタカナ、漢字を含む
                        );
                        
                        // または、英語の企業名（長い文字列）を探す
                        const englishCompanyName = searchData.find(item => 
                            typeof item === 'string' && 
                            item.length > 10 && 
                            /[A-Za-z\s&.,\-()]/.test(item) &&
                            !item.match(/^[A-Z0-9.-]+$/) // ティッカーコード形式ではない
                        );
                        
                        const extractedCompanyName = companyNameCandidate || englishCompanyName || '';
                        
                        console.log('Extracted company name from search:', extractedCompanyName);
                        if (extractedCompanyName) {
                            setCompanyName(extractedCompanyName);
                        }
                    }
                } catch (error) {
                    console.warn('Error parsing search response for company name:', error);
                }
            } else {
                console.warn('Failed to fetch company name via search API:', 
                    searchResponse.status === 'fulfilled' ? searchResponse.value.status : searchResponse.reason
                );
            }
            
            // 株価データの取得
            if (stockResponse.status === 'rejected') {
                throw new Error('株価データの取得に失敗しました');
            }

            const response = stockResponse.value;
            console.log('Stock data response status:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                console.log('API Response data:', data);
                console.log('Data type:', typeof data, 'Is array:', Array.isArray(data));
                
                if (Array.isArray(data) && data.length > 0) {
                    // APIガイドラインの形式に従ってデータを変換
                    const formattedData = data.map((item: Record<string, unknown>, index: number) => {
                        console.log(`Processing item ${index}:`, item);
                        
                        // 日付の処理
                        const timeValue = (item['Date'] ?? item['date'] ?? item['time'] ?? '') as string;
                        const formattedTime = formatDateForChart(timeValue);
                        
                        // 日付の有効性チェック
                        if (!formattedTime || !isValid(parseISO(formattedTime))) {
                            console.warn(`Invalid date for item ${index}:`, timeValue);
                            return null;
                        }

                        const result = {
                            time: formattedTime,
                            open: parseFloat(String(item['Open'] ?? item['open'] ?? 0)),
                            high: parseFloat(String(item['High'] ?? item['high'] ?? 0)),
                            low: parseFloat(String(item['Low'] ?? item['low'] ?? 0)),
                            close: parseFloat(String(item['Close'] ?? item['close'] ?? 0)),
                            volume: parseInt(String(item['Volume'] ?? item['volume'] ?? 0), 10)
                        };
                        
                        console.log(`Formatted item ${index}:`, result);
                        return result;
                    }).filter(item => item !== null) // nullの項目を除外
                      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()); // 時系列順にソート

                    console.log('Final formatted data length:', formattedData.length);
                    console.log('Final formatted data sample:', formattedData.slice(0, 3));
                    
                    if (formattedData.length > 0) {
                        setChartData(formattedData);
                    } else {
                        setError('有効な株価データが見つかりませんでした。');
                    }
                } else {
                    console.error('Data is not an array or is empty:', data);
                    setError('株価データが空または無効な形式です。');
                }
            } else {
                let errorMessage = `HTTP ${response.status}`;
                try {
                    const errorData = await response.json();
                    console.error('API Error response:', errorData);
                    errorMessage = errorData.error || errorData.message || errorMessage;
                } catch {
                    console.error('Failed to parse error response');
                }
                
                if (response.status === 404) {
                    setError(`ティッカーコード "${cleanedTicker}" の株価データが見つかりませんでした。`);
                } else if (response.status === 400) {
                    setError(`リクエストが無効です: ${errorMessage}`);
                } else if (response.status === 401) {
                    setError('認証が必要です。ログインし直してください。');
                } else {
                    setError(`株価データの取得に失敗しました: ${errorMessage}`);
                }
            }
        } catch (error) {
            console.error('Network/Fetch error:', error);
            setError('株価データの取得中にネットワークエラーが発生しました。');
        } finally {
            setLoading(false);
        }
    };

    // --- イベントハンドラ ---
    const handleButtonClick = (id: string) => {
        setActiveButtons(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleBackClick = () => {
        router.back();
    };

    // ローディング表示
    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                flexDirection: 'column',
                gap: 2,
            }}>
                <CircularProgress size={40} />
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    {(ticker || '1301') ? `"${ticker || '1301'}" の株価データを取得中...` : '株価データを取得中...'}
                </Typography>
            </Box>
        );
    }

    // --- JSXレンダリング ---
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%',
            backgroundColor: theme.palette.background.default,
            padding: '0 10px',
            boxSizing: 'border-box',
            minHeight: '100vh',
        }}>
            
            {/* ヘッダー部分 */}
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                mb: 3,
                pb: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
                width: { xs: '95%', sm: '85%', md: '70%', lg: '1000px', xl: '1200px' },
                marginTop: '20px',
            }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBackClick}
                    variant="outlined"
                    sx={{ mr: 1 }}
                >
                    戻る
                </Button>
                <TrendingUpIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                <Box>
                    <Typography variant="h4" sx={{ 
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        mb: 0.5,
                    }}>
                        {(ticker || '1301') ? `${ticker || '1301'} チャート` : 'チャート表示'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {chartData.length > 0 && (
                            `${chartData.length}日分のデータ`
                        )}
                        {!ticker && ' (デフォルト表示)'}
                    </Typography>
                </Box>
            </Box>

            {/* エラー表示 */}
            {error && (
                <Alert severity="error" sx={{ 
                    mb: 3, 
                    width: { xs: '95%', sm: '85%', md: '70%', lg: '1000px', xl: '1200px' } 
                }}>
                    {error}
                </Alert>
            )}

            {/* データが正常に取得できた場合のみ表示 */}
            {!error && chartData.length > 0 && (
                <>
                    {/* 企業情報ボックス */}
                    <Box sx={{
                        width: { xs: '95%', sm: '85%', md: '70%', lg: '1000px', xl: '1200px' },
                        maxWidth: '100%',
                        height: '150px', 
                        marginBottom: '20px', 
                        border: `1px solid ${theme.palette.divider}`, 
                        borderRadius: 2, 
                        padding: '16px',
                        backgroundColor: theme.palette.background.paper,
                        boxSizing: 'border-box',
                    }}>
                        <Box sx={{ height: '50%', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                            {/* 企業名を表示（存在する場合） */}
                            {companyName && (
                                <Typography variant="h5" sx={{ 
                                    color: theme.palette.text.primary, 
                                    marginRight: '15px',
                                    fontWeight: 600
                                }}>
                                    {companyName}
                                </Typography>
                            )}
                            
                            {/* ティッカーコード */}
                            <Typography variant="h5" sx={{ 
                                color: theme.palette.primary.main, 
                                marginRight: '15px',
                                fontWeight: 600,
                                fontSize: companyName ? '1.2rem' : '1.5rem'
                            }}>
                                ({ticker || '1301'})
                            </Typography>
                            
                            {/* 企業名がない場合のみ「株式会社」を表示 */}
                            {!companyName && (
                                <Typography variant="h6" sx={{ 
                                    color: theme.palette.text.secondary 
                                }}>
                                    株式会社
                                </Typography>
                            )}
                        </Box>
                        <Typography variant="h4" sx={{ 
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            textAlign: 'left'
                        }}>
                            {chartData.length > 0 ? `¥${chartData[chartData.length - 1].close.toLocaleString()}` : 'Loading...'}
                        </Typography>
                    </Box>
                    
                    {/* メインチャート */}
                    <Box ref={chartRef} sx={{
                        marginBottom: '0px',
                        width: { xs: '95%', sm: '85%', md: '70%', lg: '1000px', xl: '1200px' },
                        maxWidth: '100%',
                        aspectRatio: '16/9',
                        position: 'relative',
                        border: `1px solid ${theme.palette.divider}`,
                        overflow: 'hidden',
                        boxSizing: 'border-box',
                    }}>
                        <Box ref={tooltipRef} sx={{
                            position: 'absolute', 
                            display: 'none', 
                            padding: '8px',
                            background: theme.palette.background.paper, 
                            color: theme.palette.text.primary, 
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1, 
                            fontSize: '14px', 
                            zIndex: 1000,
                            pointerEvents: 'none', 
                            whiteSpace: 'nowrap',
                            boxShadow: 3,
                        }} />
                    </Box>

                    {/* ミニチャート（出来高） */}
                    <Box ref={miniChartRef} sx={{
                        width: { xs: '95%', sm: '85%', md: '70%', lg: '1000px', xl: '1200px' },
                        maxWidth: '100%',
                        height: '100px', 
                        border: `1px solid ${theme.palette.divider}`, 
                        borderTop: 'none',
                        overflow: 'hidden',
                        boxSizing: 'border-box',
                    }} />

                    {/* 操作ボタン */}
                    <Box sx={{
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        justifyContent: 'center', 
                        gap: '10px', 
                        marginTop: '20px',
                        marginBottom: '20px',
                        width: { xs: '95%', sm: '85%', md: '70%', lg: '1000px', xl: '1200px' },
                    }}>
                        <MySetButtons id="candle" name="ローソク" active={activeButtons.candle} onClick={handleButtonClick} />
                        <MySetButtons id="bar" name="出来高" active={activeButtons.bar} onClick={handleButtonClick} />
                        <MySetButtons id="line" name="折れ線" active={activeButtons.line} onClick={handleButtonClick} />
                    </Box>

                    {/* 株価データ詳細 */}
                    <Paper sx={{ 
                        p: 3,
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        width: { xs: '95%', sm: '85%', md: '70%', lg: '1000px', xl: '1200px' },
                        maxWidth: '100%',
                        mb: 3,
                    }}>
                        <Typography variant="h6" sx={{ 
                            color: theme.palette.text.primary,
                            mb: 2,
                        }}>
                            最新の株価情報
                        </Typography>
                        
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2 }}>
                            <Box>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                    日付
                                </Typography>
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                                    {chartData[chartData.length - 1].time}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                    終値
                                </Typography>
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                                    ¥{chartData[chartData.length - 1].close.toLocaleString()}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                    高値
                                </Typography>
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                                    ¥{chartData[chartData.length - 1].high.toLocaleString()}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                    安値
                                </Typography>
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                                    ¥{chartData[chartData.length - 1].low.toLocaleString()}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                    出来高
                                </Typography>
                                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                                    {chartData[chartData.length - 1].volume.toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </>
            )}
        </Box>
    );
}