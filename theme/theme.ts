'use client';
import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        // 基本モードをダークに設定
        mode: 'dark',

        // プライマリカラー（アクセントカラー）
        primary: {
            main: '#73C4BF',     // メインのアクセントカラー
            light: '#9ED4D1',    // 少し明るいバージョン
            dark: '#4A9B96',     // 少し暗いバージョン
            contrastText: '#ffffff',
        },

        // セカンダリカラー
        secondary: {
            main: '#A485E1',     // 紫系のアクセントカラー
            light: '#C4A8E8',
            dark: '#8B6BD1',
            contrastText: '#ffffff',
        },

        // 背景色の改善
        background: {
            default: '#0A0A0B',    // より深い黒に変更
            paper: '#1A1A1C',      // カードやダイアログの背景を少し明るく
        },
        
        // テキストカラーの改善
        text: {
            primary: '#FFFFFF',      // メインテキストを完全な白に
            secondary: '#B8B8B8',    // セカンダリテキストを少し明るく
            disabled: '#666666',     // 無効化テキストの色
        },

        // 区切り線の色
        divider: '#333333',

        // アクション関連の色
        action: {
            hover: 'rgba(115, 196, 191, 0.08)',    // ホバー時の背景
            selected: 'rgba(115, 196, 191, 0.16)',  // 選択時の背景
            disabled: 'rgba(255, 255, 255, 0.26)',  // 無効化時の色
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
        },

        // エラーカラー
        error: {
            main: '#F44336',
            light: '#E57373',
            dark: '#D32F2F',
            contrastText: '#ffffff',
        },

        // 成功カラー
        success: {
            main: '#4CAF50',
            light: '#81C784',
            dark: '#388E3C',
            contrastText: '#ffffff',
        },

        // 警告カラー
        warning: {
            main: '#FF9800',
            light: '#FFB74D',
            dark: '#F57C00',
            contrastText: '#ffffff',
        },

        // 情報カラー
        info: {
            main: '#2196F3',
            light: '#64B5F6',
            dark: '#1976D2',
            contrastText: '#ffffff',
        },
    },
    
    typography: {
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        
        // ヘッダーのフォントサイズ調整
        h4: {
            fontWeight: 600,
            fontSize: '2rem',
            lineHeight: 1.2,
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.3,
        },
        h6: {
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.4,
        },
        
        // ボディテキストの調整
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.43,
        },
        
        // ボタンテキストの調整
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    
    components: {
        // Buttonコンポーネントのデフォルトスタイル
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 500,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                contained: {
                    '&:hover': {
                        boxShadow: '0 2px 8px rgba(115, 196, 191, 0.3)',
                    },
                },
                outlined: {
                    borderWidth: '1px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', // 非アクティブ時の背景を少し明るく
                    color: '#FFFFFF', // 文字色を白に変更
                    borderColor: '#444444', // より見やすいボーダー
                    '&:hover': {
                        borderWidth: '1px',
                        backgroundColor: 'rgba(115, 196, 191, 0.1)', // ホバー時の背景
                        borderColor: '#73C4BF', // ホバー時のボーダー
                        color: '#FFFFFF', // ホバー時のテキスト
                    },
                },
            },
        },
        
        // Paperコンポーネントのスタイル
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#1A1A1C',
                    borderRadius: 8,
                },
            },
        },
        
        // Avatarコンポーネントのスタイル
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#73C4BF',
                    color: '#ffffff',
                    fontWeight: 600,
                },
            },
        },
        
        // Popoverコンポーネントのスタイル
        MuiPopover: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1A1A1C',
                    border: '1px solid #333333',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                },
            },
        },
        
        // AppBarコンポーネントのスタイル
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1A1A1C',
                    borderBottom: '1px solid #333333',
                    boxShadow: '0 1px 8px rgba(0, 0, 0, 0.3)',
                },
            },
        },
    },
    
    // カスタムブレークポイント
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    
    // カスタムシャドウ
    shadows: [
        'none',
        '0 1px 3px rgba(0, 0, 0, 0.3)',
        '0 1px 5px rgba(0, 0, 0, 0.3)',
        '0 1px 8px rgba(0, 0, 0, 0.3)',
        '0 2px 4px rgba(0, 0, 0, 0.3)',
        '0 3px 5px rgba(0, 0, 0, 0.3)',
        '0 3px 5px rgba(0, 0, 0, 0.3)',
        '0 4px 5px rgba(0, 0, 0, 0.3)',
        '0 5px 5px rgba(0, 0, 0, 0.3)',
        '0 5px 6px rgba(0, 0, 0, 0.3)',
        '0 6px 6px rgba(0, 0, 0, 0.3)',
        '0 6px 7px rgba(0, 0, 0, 0.3)',
        '0 7px 8px rgba(0, 0, 0, 0.3)',
        '0 7px 8px rgba(0, 0, 0, 0.3)',
        '0 7px 9px rgba(0, 0, 0, 0.3)',
        '0 8px 9px rgba(0, 0, 0, 0.3)',
        '0 8px 10px rgba(0, 0, 0, 0.3)',
        '0 8px 11px rgba(0, 0, 0, 0.3)',
        '0 9px 11px rgba(0, 0, 0, 0.3)',
        '0 9px 12px rgba(0, 0, 0, 0.3)',
        '0 10px 13px rgba(0, 0, 0, 0.3)',
        '0 10px 13px rgba(0, 0, 0, 0.3)',
        '0 10px 14px rgba(0, 0, 0, 0.3)',
        '0 11px 14px rgba(0, 0, 0, 0.3)',
        '0 11px 15px rgba(0, 0, 0, 0.3)',
    ],
});

export default theme;