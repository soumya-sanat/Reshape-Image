const Loader = () => {
  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    customLoader: {
      width: '50px',
      height: '50px',
      display: 'grid',
      borderRadius: '50%',
      WebkitMask: 'radial-gradient(farthest-side,#0000 40%,#000 41%)',
      background:
        'linear-gradient(0deg ,#766DF480 50%,#766DF4FF 0) center/4px 100%, linear-gradient(90deg,#766DF440 50%,#766DF4BF 0) center/100% 4px',
      backgroundRepeat: 'no-repeat',
      animation: 's3 1s infinite steps(12)'
    },
    keyframes: `
      @keyframes s3 {
        100% {
          transform: rotate(1turn)
        }
      }
    `
  };

  return (
    <div style={styles.wrapper}>
      <style>{styles.keyframes}</style>
      <div className="custom-loader" style={styles.customLoader}>
        <div
          style={{
            gridArea: '1/1',
            borderRadius: '50%',
            background: 'inherit',
            opacity: 0.915,
            transform: 'rotate(30deg)'
          }}
        />
        <div
          style={{
            gridArea: '1/1',
            borderRadius: '50%',
            background: 'inherit',
            opacity: 0.83,
            transform: 'rotate(60deg)'
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
