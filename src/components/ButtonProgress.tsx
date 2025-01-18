import { useState } from 'react';
import { Button, useMantineTheme } from '@mantine/core';
import { useInterval } from '@mantine/hooks';


export function ButtonProgress() {

  const theme = useMantineTheme();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 1;
        }
        interval.stop();
        setLoaded(true);
        return 0;
      }),
    20
  );

  return (
    <Button
    fullWidth
    className="relative transition-colors duration-200 ease-in-out bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg overflow-hidden"
    onClick={() => (loaded ? setLoaded(false) : !interval.active && interval.start())}
    color={loaded ? 'teal' : theme.primaryColor}
  >
    <div className="relative z-10 flex items-center justify-center">
      {progress !== 0 ? 'Uploading files...' : loaded ? 'Files uploaded!' : 'Upload files'}
    </div>
    {progress !== 0 && (
      <div
        className="absolute top-0 left-0 h-full bg-blue-400 transition-all ease-linear"
        style={{ width: `${progress}%`, opacity: 0.6 }}
      />
    )}
  </Button>
  
  );
}