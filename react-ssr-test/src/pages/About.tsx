import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      <h1>关于页面</h1>
      <nav>
        <Link to="/">返回首页</Link>
      </nav>
    </div>
  );
} 