import { useState, useEffect } from 'react';

// 'prefers-color-scheme'メディアクエリの変更を監視するMatch Mediaオブジェクト
const COLOR_SCHEME_QUERY = window.matchMedia('(prefers-color-scheme: dark)');

/**
 * デバイスのカラースキーム（'dark'または'light'）を返すカスタムフック。
 * OSの設定が変更されると、自動的に値を更新します。
 * @returns {'dark' | 'light'} 現在のカラースキーム
 */
export const useColorScheme = () => {
  const getInitialScheme = () => (COLOR_SCHEME_QUERY.matches ? 'dark' : 'light');

  const [colorScheme, setColorScheme] = useState(getInitialScheme);

  useEffect(() => {
    // リスナー関数
    interface ColorSchemeChangeEvent extends Event {
      readonly matches: boolean;
    }

    const handleChange = (e: ColorSchemeChangeEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };

    // リスナーを登録
    COLOR_SCHEME_QUERY.addEventListener('change', handleChange);

    // クリーンアップ関数：コンポーネントがアンマウントされたときにリスナーを解除
    return () => {
      COLOR_SCHEME_QUERY.removeEventListener('change', handleChange);
    };
  }, []); // 空の依存配列で、初回レンダリング時にのみ実行

  return colorScheme;
};