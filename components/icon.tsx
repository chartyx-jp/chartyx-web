const ChartyxLogo = () => {
  // スタイルをオブジェクトとして定義
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem',
    marginLeft: '1rem',
    height: '8rem',
    borderRadius: '0.5rem', // 8px
  };

  const textContainerStyle = {
    fontFamily: '"Readex Pro", sans-serif',
    fontSize: '2rem',
    fontWeight: '700',
  };

  const gradientTextStyle = {
    background: 'linear-gradient(to right, #73C4BF, #4E7D7C)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };

  return (
    <a href='/main/graph'
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div style={containerStyle}>
        <div style={textContainerStyle}>
          <span style={gradientTextStyle}>
            ChartyX
          </span>
        </div>
      </div>
    </a>
  );
};
  export default ChartyxLogo;
