import React from 'react';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

interface HomeData {
  message: string;
}

export async function loader(): Promise<HomeData> {
  // 模拟数据获取
  return {
    message: '这是从服务器获取的数据',
  };
}

export default function Home() {
  const data = useLoaderData() as HomeData;

  if (!data) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h1>首页</h1>
      <p>{data.message}</p>
      <nav>
        <Link to="/about">关于页面</Link>
      </nav>
    </div>
  );
} 