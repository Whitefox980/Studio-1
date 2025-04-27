import React from 'react';

const ErrorFallback: React.FC = () => {
  return (
    <button onClick={() => window.location.reload()}>Pokušaj ponovo</button>
  );
};

export default ErrorFallback;