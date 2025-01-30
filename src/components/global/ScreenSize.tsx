'use client';

import useScreenStore from '@/stores/useScreenStore';
import { useEffect } from 'react';

export default ScreenSize;

function ScreenSize() {
  const setScreenSize = useScreenStore((s) => s.setScreenSize);

  useEffect(() => {
    const handlers: Array<{ type: string; fn: VoidFunction }> = [];

    if (typeof window !== 'undefined') {
      const resizeHandler = () => {
        setScreenSize(window.innerWidth, window.innerHeight);
      };
      setScreenSize(window.innerWidth, window.innerHeight);

      window.addEventListener('resize', resizeHandler);
      handlers.push({ type: 'resize', fn: resizeHandler });
    }
    return () => {
      for (const handler of handlers) {
        window.removeEventListener(handler.type, handler.fn);
      }
    };
  }, [setScreenSize]);

  return <></>;
}
