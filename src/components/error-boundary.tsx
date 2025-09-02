import { ErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

{
  /* <ErrorBoundary
  FallbackComponent={Fallback}
  onReset={(details) => {
    // Reset the state of your app so the error doesn't happen again
  }}>
  <ExampleApplication />
</ErrorBoundary>; */
}

export default ErrorFallback;
