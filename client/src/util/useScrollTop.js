import React from 'react';
import { useEffect } from 'react';
// 페이지네이션으로 페이지 전환시 사용 예정

const useScrollTop = () => {
  useEffect(() => {
    if (window) window.scrollTo(0, 0);
  }, []);
};

export default useScrollTop;
