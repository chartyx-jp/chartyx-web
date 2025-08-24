import { useState, useEffect, useRef } from 'react';
import { 
    TextField, 
    InputAdornment, 
    Paper, 
    List, 
    ListItem, 
    ListItemText, 
    Box,
    CircularProgress,
    Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';

// 検索結果のインターface
interface SearchResult {
    ticker: string;
    name: string;
}

function SearchBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const searchBoxRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const theme = useTheme();

    // 検索予測を取得する関数
    const fetchSuggestions = async (query: string) => {
        if (query.trim().length === 0) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/proxy?endPoint=/stocks/search/&query=${encodeURIComponent(query)}`);
            if (response.ok) {
                const data = await response.json();
                console.log('Search API response:', data);
                
                if (Array.isArray(data)) {
                    // ティッカーコードらしきもののみをフィルタリング
                    const validTickers = data.filter(item => {
                        if (typeof item !== 'string') return false;
                        
                        const isValidTicker = 
                            item.length <= 10 &&
                            /^[A-Z0-9.-]+$/i.test(item) &&
                            !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3000-\u303F]/.test(item);
                        
                        return isValidTicker;
                    }).slice(0, 5); // 最大5件まで表示
                    
                    console.log('Valid tickers:', validTickers);
                    
                    // 各ティッカーの企業名を取得
                    const tickerWithNames = await Promise.all(
                        validTickers.map(async (ticker) => {
                            try {
                                const companyResponse = await fetch(`/api/proxy?endPoint=/stocks/company-name/&code=${encodeURIComponent(ticker)}`);
                                if (companyResponse.ok) {
                                    const companyData = await companyResponse.text();
                                    return { ticker, name: companyData || ticker };
                                }
                            } catch (error) {
                                console.warn(`Failed to get company name for ${ticker}:`, error);
                            }
                            return { ticker, name: ticker };
                        })
                    );
                    
                    console.log('Tickers with names:', tickerWithNames);
                    setSuggestions(tickerWithNames);
                    setShowSuggestions(tickerWithNames.length > 0);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } catch (error) {
            console.error('検索エラー:', error);
            setSuggestions([]);
            setShowSuggestions(false);
        } finally {
            setLoading(false);
        }
    };

    // 入力変更時のハンドラー
    const handleInputChange = (value: string) => {
        setSearchTerm(value);
        
        // 既存のタイマーをクリア
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // 1秒後に検索を実行（短縮）
        timeoutRef.current = setTimeout(() => {
            fetchSuggestions(value);
        }, 1000);
    };

    // Enterキーでの検索処理（直接チャートページに飛ぶ）
    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchTerm.trim()) {
            const ticker = searchTerm.trim().toUpperCase();
            console.log('Direct search for ticker:', ticker);
            setShowSuggestions(false);
            setSearchTerm('');
            router.push(`/main/graph?ticker=${encodeURIComponent(ticker)}`);
        }
    };

    // 予測候補選択時の処理（直接チャートページに飛ぶ）
    const handleSuggestionClick = (result: SearchResult) => {
        console.log('Selected ticker for chart:', result.ticker, 'Name:', result.name);
        setSearchTerm('');
        setSuggestions([]);
        setShowSuggestions(false);
        router.push(`/main/graph?ticker=${encodeURIComponent(result.ticker)}`);
    };

    // 外部クリックで予測を非表示
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <Box ref={searchBoxRef} sx={{ position: 'relative', zIndex: 1200 }}>
            <TextField
                variant="outlined"
                placeholder="ティッカーコードを入力（例: AAPL, 7203）"
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleSearch}
                onFocus={() => {
                    if (suggestions.length > 0) {
                        setShowSuggestions(true);
                    }
                }}
                sx={{
                    margin: '0 auto',
                    width: '400px',
                    '& .MuiOutlinedInput-root': {
                        height: '40px',
                        borderRadius: '50px',
                    }
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {loading ? <CircularProgress size={20} /> : <SearchIcon />}
                        </InputAdornment>
                    ),
                }}
            />
            
            {/* 検索予測のドロップダウン */}
            {showSuggestions && suggestions.length > 0 && (
                <Paper 
                    sx={{ 
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        maxHeight: '200px',
                        overflowY: 'auto',
                        zIndex: 1300,
                        mt: 1,
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Box sx={{ p: 1, backgroundColor: theme.palette.grey[50] }}>
                        <Typography variant="caption" sx={{ 
                            color: theme.palette.text.secondary,
                            fontSize: '0.7rem'
                        }}>
                            候補をクリックするか、Enterキーで検索
                        </Typography>
                    </Box>
                    <List sx={{ py: 0 }}>
                        {suggestions.map((result, index) => (
                            <ListItem
                                key={`${result.ticker}-${index}`}
                                onClick={() => handleSuggestionClick(result)}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                    borderBottom: index < suggestions.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                                    py: 1,
                                }}
                            >
                                <ListItemText 
                                    primary={
                                        <Box>
                                            <Typography variant="body1" sx={{ 
                                                fontWeight: 600,
                                                color: theme.palette.primary.main 
                                            }}>
                                                {result.ticker}
                                            </Typography>
                                            {result.name !== result.ticker && (
                                                <Typography variant="body2" sx={{ 
                                                    color: theme.palette.text.secondary,
                                                    fontSize: '0.8rem'
                                                }}>
                                                    {result.name}
                                                </Typography>
                                            )}
                                        </Box>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}

            {/* 候補がない場合のメッセージ */}
            {searchTerm.trim() && !loading && !showSuggestions && (
                <Paper 
                    sx={{ 
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1300,
                        mt: 1,
                        p: 2,
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Typography variant="body2" sx={{ 
                        color: theme.palette.text.secondary,
                        textAlign: 'center'
                    }}>
                        Enterキーを押してチャートを表示
                    </Typography>
                </Paper>
            )}
        </Box>
    );
}

export default SearchBox;