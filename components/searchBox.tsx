import { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');


const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        console.log('検索ワード:', searchTerm);
        // ここに実際の検索処理を記述します
    }
};

  return (
    <TextField
      variant="outlined"
      placeholder="検索"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleSearch}
      sx={{
        margin: '0 auto',
        width: '400px',
         '& .MuiOutlinedInput-root': {
            height: '40px', // 高さを指定
            borderRadius: '50px', // 角を丸くする
         }
    }} // スタイルの指定
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBox;