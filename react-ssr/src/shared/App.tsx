import React, { useState } from 'react';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <h1>React SSR Example</h1>
      <p>This is a server-side rendered React application.</p>
      <button onClick={handleClick}>
        点击次数: {count}
      </button>
    </div>
  );
};

export default App; 