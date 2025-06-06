'use client';

import { Box } from '@mui/material';
import { CandlestickSeries, createChart, HistogramSeries, ISeriesApi, LineSeries } from 'lightweight-charts';
import { subMonths, format, parseISO} from 'date-fns';
import { useState, useEffect, useRef } from 'react';

// import HamburgerMenu from '@/components/HamburgerMenu';
import MySetButtons from '@/components/MySetButtons';
import Header from '@/components/Header';
import HamburgerMenu from '@/components/HamburgerMenu';

type ChartSeries = {
  [key: string]: ISeriesApi<'Candlestick'> | ISeriesApi<'Histogram'> | ISeriesApi<'Line'> | null;
};

type ActiveButtonStates = {
  candle: boolean;
  bar: boolean;
  line: boolean;
  A: boolean;
  B: boolean;
  C: boolean;
  // ... 他のボタンもあれば追加
  [key: string]: boolean;
};


export default function Graph() {
    // LightWeightChartsのシリーズインスタンスを保持するref
    const seriesRef = useRef<ChartSeries>({});
    const chartRef = useRef<HTMLDivElement>(null);
    const miniChartRef = useRef<HTMLDivElement>(null);

    const [activeButtons, setActiveButtons] = useState<ActiveButtonStates>({
        candle: true,
        bar: true,
        line: false,
        A: true,
        B: false,
        C: false,
        // ... (他のボタンもあれば追加)
    });

    useEffect(() => {
        if (!chartRef.current || !miniChartRef.current) return(console.log('chart is null'));
        // chartContainerRef.currentはnullの可能性があるので、nullチェックを行う
        // lineChart

        const chart = createChart(chartRef.current, {
            width: chartRef.current.clientWidth,
            height: chartRef.current.clientHeight,
            layout: {
                background: {
                    color: '#000000',
                },
                textColor: '#ffffff',
            },
            grid: {
                vertLines: {
                    color: '#333333',
                },
                horzLines: {
                    color: '#333333',
                },
            },
            localization: {
                locale: 'ja-JP',
                dateFormat: 'yyyy/MM/dd',
            },
        });

        // miniChart
        const miniChart = createChart(miniChartRef.current, {
            width: miniChartRef.current.clientWidth,
            height: miniChartRef.current.clientHeight,
            layout: {
                background: {
                    color: '#000000',
                },
                textColor: '#ffffff',
            },
            grid: {
                vertLines: {
                    color: '#333333',
                },
                horzLines: {
                    color: '#333333',
                },
            },
            localization: {
                locale: 'ja-JP',
                dateFormat: 'yyyy/MM/dd',
            },
        })

     // シリーズインスタンスを保持
        // 既存のシリーズがある場合は、useEffectのクリーンアップで削除するようにする
        seriesRef.current.candle = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickVisible: true,
        });
        seriesRef.current.histogram = miniChart.addSeries(HistogramSeries, {
            color: '#26a69a', // 例として色を設定
        });
        // 必要に応じて他のシリーズも追加
        seriesRef.current.line = chart.addSeries(LineSeries,{ color: '#2196F3', lineWidth: 2 }); // 折れ線グラフを追加



        // ローソクグラフのデータ
        const candleSeries = chart.addSeries(CandlestickSeries);
        // 棒グラフのデータ
        const histogramSeries = miniChart.addSeries(HistogramSeries);

        // ダミーデータです↓    本実装時は消すように！！
        const dummyData = [
            {time:1732838400000,open:877,high:881,low:849,close:871,volume:14800},
            {time:1733097600000,open:885,high:885,low:850,close:850,volume:14800},
            {time:1733184000000,open:855,high:860,low:830,close:850,volume:16800},
            {time:1733270400000,open:842,high:846,low:828,close:830,volume:12000},
            {time:1733356800000,open:830,high:845,low:820,close:820,volume:17000},
            {time:1733443200000,open:823,high:823,low:782,close:794,volume:51500},
            {time:1733702400000,open:773,high:800,low:770,close:788,volume:28200},
            {time:1733788800000,open:792,high:792,low:775,close:781,volume:20200},
            {time:1733875200000,open:779,high:787,low:767,close:780,volume:14700},
            {time:1733961600000,open:784,high:804,low:780,close:791,volume:18900},
            {time:1734048000000,open:781,high:799,low:778,close:790,volume:11200},
            {time:1734307200000,open:760,high:790,low:735,close:742,volume:53900},
            {time:1734393600000,open:739,high:753,low:682,close:700,volume:65800},
            {time:1734480000000,open:685,high:728,low:680,close:725,volume:40000},
            {time:1734566400000,open:725,high:742,low:712,close:742,volume:24700},
            {time:1734652800000,open:734,high:738,low:690,close:695,volume:58000},
            {time:1734912000000,open:759,high:795,low:711,close:713,volume:450200},
            {time:1734998400000,open:743,high:756,low:705,close:705,volume:90300},
            {time:1735084800000,open:719,high:727,low:695,close:720,volume:46700},
            {time:1735171200000,open:712,high:736,low:705,close:717,volume:48600},
            {time:1735257600000,open:713,high:745,low:713,close:732,volume:54900},
            {time:1735516800000,open:739,high:882,low:739,close:882,volume:583700},
            {time:1736121600000,open:957,high:957,low:854,close:935,volume:359300},
            {time:1736208000000,open:920,high:925,low:859,close:861,volume:126900},
            {time:1736294400000,open:861,high:862,low:813,close:817,volume:78300},
            {time:1736380800000,open:808,high:815,low:790,close:797,volume:51100},
            {time:1736467200000,open:789,high:824,low:782,close:819,volume:34500},
            {time:1736812800000,open:806,high:822,low:795,close:815,volume:27000},
            {time:1736899200000,open:803,high:808,low:779,close:798,volume:24900},
            {time:1736985600000,open:797,high:813,low:793,close:797,volume:16000},
            {time:1737072000000,open:797,high:799,low:791,close:793,volume:10500},
            {time:1737331200000,open:793,high:803,low:785,close:789,volume:11600},
            {time:1737417600000,open:791,high:801,low:785,close:800,volume:12600},
            {time:1737504000000,open:800,high:811,low:787,close:801,volume:10000},
            {time:1737590400000,open:800,high:805,low:790,close:792,volume:6700},
            {time:1737676800000,open:785,high:815,low:785,close:794,volume:14500},
            {time:1737936000000,open:800,high:859,low:800,close:843,volume:46000},
            {time:1738022400000,open:841,high:863,low:830,close:841,volume:26900},
            {time:1738108800000,open:841,high:860,low:838,close:849,volume:10000},
            {time:1738195200000,open:847,high:854,low:826,close:835,volume:19300},
            {time:1738281600000,open:830,high:832,low:793,close:802,volume:35900},
            {time:1738540800000,open:793,high:793,low:775,close:775,volume:24300},
            {time:1738627200000,open:780,high:791,low:774,close:791,volume:16900},
            {time:1738713600000,open:782,high:789,low:774,close:778,volume:9300},
            {time:1738800000000,open:778,high:799,low:773,close:798,volume:12500},
            {time:1738886400000,open:801,high:805,low:785,close:797,volume:9200},
            {time:1739145600000,open:790,high:803,low:789,close:791,volume:17400},
            {time:1739318400000,open:804,high:839,low:797,close:835,volume:33000},
            {time:1739404800000,open:849,high:920,low:787,close:810,volume:123000},
            {time:1739491200000,open:833,high:900,low:813,close:881,volume:83900},
            {time:1739750400000,open:911,high:942,low:898,close:903,volume:59600},
            {time:1739836800000,open:918,high:920,low:880,close:880,volume:32100},
            {time:1739923200000,open:884,high:900,low:876,close:885,volume:13800},
            {time:1740009600000,open:872,high:883,low:862,close:862,volume:10000},
            {time:1740096000000,open:840,high:867,low:836,close:839,volume:23500},
            {time:1740441600000,open:829,high:854,low:829,close:841,volume:19400},
            {time:1740528000000,open:829,high:851,low:817,close:842,volume:17600},
            {time:1740614400000,open:827,high:842,low:824,close:830,volume:5600},
            {time:1740700800000,open:831,high:839,low:804,close:817,volume:23000},
            {time:1740960000000,open:823,high:890,low:823,close:867,volume:44000},
            {time:1741046400000,open:876,high:876,low:840,close:852,volume:22900},
            {time:1741132800000,open:847,high:853,low:829,close:830,volume:14400},
            {time:1741219200000,open:830,high:870,low:829,close:864,volume:23200},
            {time:1741305600000,open:859,high:859,low:831,close:832,volume:13300},
            {time:1741564800000,open:869,high:869,low:820,close:834,volume:17100},
            {time:1741651200000,open:819,high:828,low:791,close:828,volume:35800},
            {time:1741737600000,open:815,high:840,low:815,close:826,volume:10200},
            {time:1741824000000,open:816,high:830,low:816,close:820,volume:2800},
            {time:1741910400000,open:820,high:838,low:809,close:838,volume:11100},
            {time:1742169600000,open:830,high:830,low:810,close:811,volume:20300},
            {time:1742256000000,open:813,high:827,low:813,close:820,volume:8800},
            {time:1742342400000,open:814,high:900,low:812,close:860,volume:67900},
            {time:1742515200000,open:856,high:856,low:826,close:826,volume:16700},
            {time:1742774400000,open:822,high:840,low:819,close:819,volume:19900},
            {time:1742860800000,open:830,high:836,low:816,close:816,volume:12300},
            {time:1742947200000,open:820,high:827,low:816,close:823,volume:2900},
            {time:1743033600000,open:828,high:835,low:805,close:807,volume:12600},
            {time:1743120000000,open:805,high:820,low:805,close:807,volume:7600},
            {time:1743379200000,open:797,high:797,low:780,close:787,volume:25200},
            {time:1743465600000,open:790,high:805,low:781,close:789,volume:6800},
            {time:1743552000000,open:790,high:865,low:766,close:769,volume:93700},
            {time:1743638400000,open:750,high:772,low:733,close:758,volume:30700},
            {time:1743724800000,open:750,high:750,low:665,close:691,volume:63200},
            {time:1743984000000,open:591,high:609,low:591,close:591,volume:105300},
            {time:1744070400000,open:611,high:650,low:597,close:636,volume:40400},
            {time:1744156800000,open:610,high:653,low:605,close:615,volume:45200},
            {time:1744243200000,open:685,high:696,low:652,close:693,volume:17300},
            {time:1744329600000,open:686,high:705,low:656,close:704,volume:15200},
            {time:1744588800000,open:719,high:740,low:705,close:731,volume:10000},
            {time:1744675200000,open:746,high:751,low:718,close:750,volume:24900},
            {time:1744761600000,open:756,high:840,low:695,close:697,volume:150900},
            {time:1744848000000,open:716,high:790,low:657,close:683,volume:272900},
            {time:1744934400000,open:683,high:705,low:682,close:697,volume:27200},
            {time:1745193600000,open:700,high:787,low:665,close:703,volume:217100},
            {time:1745280000000,open:718,high:722,low:680,close:692,volume:26500},
            {time:1745366400000,open:701,high:710,low:693,close:695,volume:22000},
            {time:1745452800000,open:700,high:700,low:692,close:692,volume:4800},
            {time:1745539200000,open:691,high:697,low:688,close:689,volume:13900},
            {time:1745798400000,open:689,high:698,low:681,close:681,volume:16200},
            {time:1745971200000,open:681,high:688,low:670,close:681,volume:13300},
            {time:1746057600000,open:673,high:683,low:668,close:670,volume:13900},
 
        ];

        const dataFormatted = dummyData.map((data) => ({
            ...data,
            time: new Date(data.time).toISOString().slice(0, 10), // '2024-11-29'
            
        }));

        console.log(dataFormatted);

        // const initialDataLength = dataFormatted.length - 30;
        // if (initialDataLength > 0) {
        //     candleSeries.setData(dataFormatted.slice(0, initialDataLength));
        // } else {
        //     // データが30件未満の場合は全て表示するか、エラー処理
        //     candleSeries.setData(dataFormatted);
        // }
        

        candleSeries.setData(dataFormatted);

        // 棒グラフのデータをセット
        // volumeは数値で渡す必要があるので、parseIntで変換
        histogramSeries.setData(dataFormatted.map((data) => ({
            time: data.time,
            value: data.volume,
        })));

        // 最後の time を取得
        const latestTime = dataFormatted[dataFormatted.length - 1].time;

        // Date型に変換して1か月前に
        const latestTimeISO = new Date(latestTime).toISOString().slice(0, 10);
        const oneMonthAgoDate = subMonths(parseISO(latestTimeISO), 1);

        // 文字列で整形
        const oneMonthAgo = format(oneMonthAgoDate, 'yyyy-MM-dd');

        // 初期表示範囲（最新の日付-1カ月前から）
        chart.timeScale().setVisibleRange({
            from: oneMonthAgo,
            to: latestTimeISO,
        });
        miniChart.timeScale().setVisibleRange({
            from: oneMonthAgo,
            to: latestTimeISO,
        });


        // function sleep(milliseconds: number) {
        //     return new Promise(resolve => setTimeout(resolve, milliseconds));
        // }

    // async function rendering() {
    //     const len = dataFormatted.length;
    //     // dataFormatted.slice(0, initialDataLength) でセットしたので、
    //     // 次にupdateするのは dataFormatted[initialDataLength] から dataFormatted[len - 1] まで
    //     for (let j = 0; j < 30; j++) {
    //         const dataIndex = initialDataLength + j;
    //         if (dataIndex < len) {
    //             const dataPoint = dataFormatted[dataIndex];
    //             if (dataPoint) { // 念のためデータポイントの存在確認
    //                 console.log(`Animating: Updating with dataPoint at index ${dataIndex}`, dataPoint);
    //                 candleSeries.update(dataPoint);
    //                 chart.timeScale().scrollToRealTime();
    //                 await sleep(10); // アニメーションの速度を調整 (例: 200ms)
    //             }
    //         } else {
    //             // アニメーション対象のデータが尽きた場合
    //             break;
    //         }
    //     }
    //     console.log('Animation sequence finished.');
    // }

    //     rendering();




        // リサイズ対応
        const handleResize = () => {
            if (chartRef.current) {
                chart.applyOptions({
                    width: chartRef.current.clientWidth,
                });
            }

            if (miniChartRef.current) {
                miniChart.applyOptions({
                    width: miniChartRef.current.clientWidth,
                });
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.removeSeries(candleSeries);
            miniChart.removeSeries(histogramSeries);
            chart.remove();
            miniChart.remove();
        };
    }, []);

    useEffect(() => {
        // 各シリーズの表示状態を更新
        seriesRef.current.candle?.applyOptions({ visible: activeButtons.candle });
        seriesRef.current.histogram?.applyOptions({ visible: activeButtons.bar }); // 'bar'ボタンでヒストグラムを制御
        seriesRef.current.line?.applyOptions({ visible: activeButtons.line }); // 'line'ボタンで折れ線を制御
        // ... 他のシリーズがあれば同様に追加
        // 例: seriesRef.current.movingAverage?.applyOptions({ visible: activeButtons.A });

    }, [activeButtons]); // activeButtonsが変更されるたびに再実行

        const handleButtonClick = (id: string) => {
        setActiveButtons(prev => ({
            ...prev,
            [id]: !prev[id], // クリックされたボタンの状態を反転
        }));
    };


    return (
        <>
            <Box
                sx={{
                    marginTop: '60px',
                    width: '100vw',
                    height: '100svh-60px',
                    position: 'relative',
                }}
            >
                <Header>
                    <HamburgerMenu></HamburgerMenu>
                </Header>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100vw',
                        height: '100%',
                        backgroundColor: '#000',
                    }}
                >
                    {/* 企業情報表示エリア */}
                    <Box
                        sx={{
                            width: {
                                xs: '90%',
                                sm: '75%',
                                md: '60%',
                                lg: '1000px',
                                xl: '1200px'
                            },
                            height: '150px',
                            marginTop: '20px',
                            display: 'flex',
                            border: '1px solid #ddd',
                            borderRadius: '5px',
                        }}
                    >

                    </Box>

                    <Box ref={chartRef}
                        sx={{
                            marginTop: '20px',
                            width: {
                                xs: '90%',
                                sm: '75%',
                                md: '60%',
                                lg: '1000px',
                                xl: '1200px'
                            },
                            aspectRatio: '16/9',
                            border: '1px solid #ddd',
                        }}
                    >
                        {/* この中にチャート描画 */}
                    </Box>

                    <Box ref={miniChartRef}
                        sx={{
                            width: {
                                xs: '90%',
                                sm: '75%',
                                md: '60%',
                                lg: '1000px',
                                xl: '1200px'
                            },
                            height: '100px',
                            border: '1px solid #ddd',
                        }}>
                        {/* この中に棒グラフ描画 */}
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
                        <MySetButtons id="candle" name="ローソク" active={activeButtons.candle} onClick={handleButtonClick}></MySetButtons>
                        {/* <MySetButtons id="bar" name="棒グラフ" active={activeButtons.bar} onClick={handleButtonClick}></MySetButtons>
                        <MySetButtons id="line" name="折れ線" active={activeButtons.line} onClick={handleButtonClick}></MySetButtons>
                        <MySetButtons id="A" name="移動平均線" active={activeButtons.a} onClick={handleButtonClick}></MySetButtons>
                        <MySetButtons id="B" name="BBBBBBBBBBBBBB" active={activeButtons.b} onClick={handleButtonClick}></MySetButtons>
                        <MySetButtons id="C" name="C" active={activeButtons.c} onClick={handleButtonClick}></MySetButtons>
                        <MySetButtons id="D" name="D" active={activeButtons.d} onClick={handleButtonClick}></MySetButtons>
                        <MySetButtons id="E" name="E" active={activeButtons.e} onClick={handleButtonClick}></MySetButtons>
                        <MySetButtons id="F" name="F" active={activeButtons.f} onClick={handleButtonClick}></MySetButtons>
                        <MySetButtons id="G" name="G" active={activeButtons.g} onClick={handleButtonClick}></MySetButtons>
                        <MySetButtons id="H" name="H" active={activeButtons.h} onClick={handleButtonClick}></MySetButtons>
                        <MySetButtons id="I" name="I" active={activeButtons.i} onClick={handleButtonClick}></MySetButtons> */}
                    </Box>
                </Box>
            </Box>
        </>
    );
}
