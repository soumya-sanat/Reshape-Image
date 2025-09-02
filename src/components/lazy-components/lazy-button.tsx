import React, { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';
import { buttonVariants, type ButtonProps } from '@/components/ui/button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role="alert" className="inline-block">
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className={buttonVariants({ variant: 'outline' })}
        style={{
          borderColor: '#ef4444',
          color: '#ef4444',
          backgroundColor: '#fef2f2'
        }}
      >
        Try Again
      </button>
    </div>
  );
}

const LazyButton: React.FC<LazyButtonProps> = ({
  size = 'default',
  variant = 'default',
  height,
  width,
  className,
  ...props
}) => {
  const [retryCount, setRetryCount] = useState(0);

  const Button = React.lazy(() =>
    import('@/components/ui/button')
      .then((module) => ({
        default: module.Button
      }))
      .catch((error) => {
        console.error('Failed to load Button component:', error);
        throw error;
      })
  );

  const handleReset = () => {
    setRetryCount((prev) => prev + 1);

    if (import.meta.hot) {
      console.log('Vite HMR is available');
    }
  };

  return (
    <ErrorBoundary
      key={retryCount}
      FallbackComponent={ErrorFallback}
      onReset={handleReset}
      onError={(error, info) => {
        console.error('LazyButton Error:', error, info);
      }}
    >
      <Suspense
        fallback={
          <Skeleton className={buttonVariants({ size, className })} style={{ height, width }} />
        }
      >
        <Button
          {...props}
          size={size}
          variant={variant}
          className={buttonVariants({ size, variant, className })}
          style={{
            height,
            width,
            ...(props.style || {})
          }}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

interface LazyButtonProps extends ButtonProps {
  height?: string | number;
  width?: string | number;
}

export { LazyButton };
