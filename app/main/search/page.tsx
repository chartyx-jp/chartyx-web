'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
    Box, 
    Typography, 
    Paper, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemButton,
    CircularProgress,
    Alert,
    Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function SearchPage() {
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const theme = useTheme();
    const router = useRouter();

    useEffect(() => {
        if (query) {
            searchTickers(query);
        } else {
            setLoading(false);
        }
    }, [query]);

    const searchTickers = async (searchQuery: string) => {
        setLoading(true);
        setError(null);
        
        try {
            console.log('Search query:', searchQuery);
            const response = await fetch(`/api/proxy?endPoint=/stocks/search/&query=${encodeURIComponent(searchQuery)}`);
            
            console.log('Search response status:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                console.log('Search results:', data);
                
                // APIガイドラインに従って、文字列配列として処理
                if (Array.isArray(data)) {
                    setSearchResults(data);
                    console.log('Search results set:', data);
                } else {
                    setSearchResults([]);
                    setError('検索結果が予期しない形式です。');
                    console.error('Invalid search response format:', data);
                }
            } else {
                // エラーレスポンスの詳細を取得
                let errorMessage = `HTTP ${response.status}`;
                try {
                    const errorData = await response.json();
                    console.error('Search API Error response:', errorData);
                    errorMessage = errorData.error || errorData.message || errorMessage;
                } catch {
                    console.error('Failed to parse search error response');
                }
                
                if (response.status === 404) {
                    setSearchResults([]);
                    setError('該当する銘柄が見つかりませんでした。');
                } else if (response.status === 401) {
                    setError('認証が必要です。ログインし直してください。');
                } else {
                    setError(`検索中にエラーが発生しました: ${errorMessage}`);
                }
            }
        } catch (error) {
            console.error('Search network error:', error);
            setError('検索中にネットワークエラーが発生しました。');
        } finally {
            setLoading(false);
        }
    };

    // 検索結果から直接チャートページに飛ばす
    const handleTickerClick = (ticker: string) => {
        console.log('Clicking ticker for chart:', ticker);
        router.push(`/main/graph?ticker=${encodeURIComponent(ticker)}`);
    };

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                flexDirection: 'column',
                gap: 2,
            }}>
                <CircularProgress size={40} />
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    検索中...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
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
            }}>
                <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                <Box>
                    <Typography variant="h4" sx={{ 
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        mb: 0.5,
                    }}>
                        検索結果
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {query ? `"${query}" の検索結果` : '検索クエリが指定されていません'}
                    </Typography>
                </Box>
            </Box>

            {/* エラー表示 */}
            {error && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* クエリが指定されていない場合 */}
            {!query && (
                <Paper sx={{ 
                    p: 4, 
                    textAlign: 'center',
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                }}>
                    <SearchIcon sx={{ 
                        fontSize: 64, 
                        color: theme.palette.text.disabled,
                        mb: 2 
                    }} />
                    <Typography variant="h6" sx={{ 
                        color: theme.palette.text.primary,
                        mb: 1 
                    }}>
                        検索クエリが指定されていません
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        検索ボックスからキーワードを入力して検索してください。
                    </Typography>
                </Paper>
            )}

            {/* 検索結果一覧 */}
            {query && !error && searchResults.length > 0 && (
                <Paper sx={{ 
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                }}>
                    <Box sx={{ p: 2, backgroundColor: theme.palette.grey[50] }}>
                        <Typography variant="subtitle1" sx={{ 
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                        }}>
                            {searchResults.length}件の銘柄が見つかりました
                        </Typography>
                    </Box>
                    <List sx={{ py: 0 }}>
                        {searchResults.map((ticker, index) => (
                            <Box key={`${ticker}-${index}`}>
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemButton
                                        onClick={() => handleTickerClick(ticker)}
                                        sx={{
                                            py: 2,
                                            px: 3,
                                            '&:hover': {
                                                backgroundColor: theme.palette.action.hover,
                                            },
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <TrendingUpIcon sx={{ 
                                            color: theme.palette.primary.main,
                                            fontSize: 24,
                                        }} />
                                        <ListItemText
                                            primary={
                                                <Typography variant="h6" sx={{ 
                                                    color: theme.palette.primary.main,
                                                    fontWeight: 600,
                                                }}>
                                                    {ticker}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" sx={{ 
                                                    color: theme.palette.text.disabled,
                                                    fontSize: '0.8rem',
                                                }}>
                                                    チャートを表示するにはクリックしてください
                                                </Typography>
                                            }
                                        />
                                        <Box sx={{
                                            color: theme.palette.text.disabled,
                                            fontSize: '1.2rem',
                                        }}>
                                            →
                                        </Box>
                                    </ListItemButton>
                                </ListItem>
                                {index < searchResults.length - 1 && (
                                    <Divider sx={{ mx: 3 }} />
                                )}
                            </Box>
                        ))}
                    </List>
                </Paper>
            )}

            {/* 検索結果が0件の場合 */}
            {query && !error && searchResults.length === 0 && (
                <Paper sx={{ 
                    p: 4, 
                    textAlign: 'center',
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                }}>
                    <SearchIcon sx={{ 
                        fontSize: 48, 
                        color: theme.palette.text.disabled,
                        mb: 2 
                    }} />
                    <Typography variant="h6" sx={{ 
                        color: theme.palette.text.primary,
                        mb: 1 
                    }}>
                        該当する銘柄が見つかりませんでした
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        別のキーワードで検索してみてください。
                    </Typography>
                </Paper>
            )}
        </Box>
    );
}