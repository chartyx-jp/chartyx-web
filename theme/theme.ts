'use client';
import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        // 基本モードをダークに設定
        mode: 'dark',

        // プライマリカラー（アクセントカラー）をGemini風の紫がかった青に設定
        primary: {
            main: '#73C4BF', // メインのアクセントカラー
            light: '#A485E1', // 少し明るいバージョン
            dark: '#12232D',  // 少し暗いバージョン
        },

        // セカンダリカラー（必要に応じて使用）
        secondary: {
            main: '#73C4BF', // 別のアクセントとして使える青色
        },

        // 背景色をGemini風の濃いグレーに設定
        background: {
            default: '#131314', // ページ全体の背景色
            paper: '#1E1E1E',   // カードやダイアログなどの背景色
        },
        
        // テキストカラーの設定
        text: {
            primary: '#E0E0E0',    // 主要なテキスト色（完全な白より少し柔らかい）
            secondary: '#B0B0B0',  // やや薄いセカンダリテキスト色
        },
    },
    typography: {
        // フォントファミリーなどもここで定義可能
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
});

export default theme;