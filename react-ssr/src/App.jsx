import React, { useState } from 'react';

const App = () => {
  // 客户端才会运行的 state
  const [clickCount, setClickCount] = useState(0);

  // 点击处理函数
  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <div>
      <h1>SSR 示例（带交互）</h1>
      <p>服务器时间：{new Date().toLocaleString()}</p>
      
      {/* 添加可交互按钮 */}
      <button onClick={handleClick}>
        点击我！已点击 {clickCount} 次
      </button>
    </div>
  );
};

export default App;