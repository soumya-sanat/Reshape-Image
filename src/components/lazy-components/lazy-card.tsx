import React, { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// Error Fallback Component for Card
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function CardErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 p-6 shadow-sm bg-red-50">
      <div className="text-red-700 text-sm mb-3">
        Failed to load card component: {error.message}
      </div>
      <button
        onClick={resetErrorBoundary}
        className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 border border-red-200"
      >
        Try Again
      </button>
    </div>
  );
}

// Define proper types for card components
interface CardComponentProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

// Lazy load the actual Card components with error handling
const createLazyCardComponent = <T extends CardComponentProps>(
  loader: () => Promise<{ [key: string]: React.ComponentType<T> }>,
  componentName: string
) => {
  return React.lazy(() =>
    loader()
      .then((module) => ({
        default: module[componentName] as React.ComponentType<T>
      }))
      .catch((error) => {
        console.error(`Failed to load ${componentName}:`, error);
        throw error;
      })
  );
};

// Create lazy components with proper typing
const Card = createLazyCardComponent(() => import('@/components/ui/card'), 'Card');

const CardHeader = createLazyCardComponent(() => import('@/components/ui/card'), 'CardHeader');

const CardTitle = createLazyCardComponent(() => import('@/components/ui/card'), 'CardTitle');

const CardDescription = createLazyCardComponent(
  () => import('@/components/ui/card'),
  'CardDescription'
);

const CardContent = createLazyCardComponent(() => import('@/components/ui/card'), 'CardContent');

const CardFooter = createLazyCardComponent(() => import('@/components/ui/card'), 'CardFooter');

const CardAction = createLazyCardComponent(() => import('@/components/ui/card'), 'CardAction');

// Fallback skeleton component for the Card
const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('rounded-xl border p-6 shadow-sm', className)}>
    <Skeleton className="h-6 w-3/4 mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

// Individual card components with error boundaries
const createCardComponentWithErrorBoundary = <T extends CardComponentProps>(
  Component: React.LazyExoticComponent<React.ComponentType<T>>,
  displayName: string
) => {
  const ComponentWithErrorBoundary: React.FC<T> = (props) => {
    const [retryCount, setRetryCount] = useState(0);

    const handleReset = () => {
      setRetryCount((prev) => prev + 1);
    };

    return (
      <ErrorBoundary key={retryCount} FallbackComponent={CardErrorFallback} onReset={handleReset}>
        <Suspense fallback={<Skeleton className="h-6 w-full" />}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };

  ComponentWithErrorBoundary.displayName = displayName;
  return ComponentWithErrorBoundary;
};

// Create wrapped components with error boundaries
const CardWithErrorBoundary = createCardComponentWithErrorBoundary(Card, 'CardWithErrorBoundary');
const CardHeaderWithErrorBoundary = createCardComponentWithErrorBoundary(
  CardHeader,
  'CardHeaderWithErrorBoundary'
);
const CardTitleWithErrorBoundary = createCardComponentWithErrorBoundary(
  CardTitle,
  'CardTitleWithErrorBoundary'
);
const CardDescriptionWithErrorBoundary = createCardComponentWithErrorBoundary(
  CardDescription,
  'CardDescriptionWithErrorBoundary'
);
const CardContentWithErrorBoundary = createCardComponentWithErrorBoundary(
  CardContent,
  'CardContentWithErrorBoundary'
);
const CardFooterWithErrorBoundary = createCardComponentWithErrorBoundary(
  CardFooter,
  'CardFooterWithErrorBoundary'
);
const CardActionWithErrorBoundary = createCardComponentWithErrorBoundary(
  CardAction,
  'CardActionWithErrorBoundary'
);

// Get the original Card props type
// type CardProps = React.ComponentProps<typeof Card>;
type CardProps = React.ComponentProps<'div'>;

// Lazy Card component
interface LazyCardProps extends CardProps {
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const LazyCard: React.FC<LazyCardProps> = ({ loading, children, className, ...props }) => {
  const [retryCount, setRetryCount] = useState(0);

  const handleReset = () => {
    setRetryCount((prev) => prev + 1);
  };

  if (loading) {
    return <CardSkeleton className={className} />;
  }

  return (
    <ErrorBoundary key={retryCount} FallbackComponent={CardErrorFallback} onReset={handleReset}>
      <Suspense fallback={<CardSkeleton className={className} />}>
        <CardWithErrorBoundary className={className} {...props}>
          {children}
        </CardWithErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  );
};

// Export all lazy components with error boundaries
export {
  LazyCard,
  CardHeaderWithErrorBoundary as LazyCardHeader,
  CardTitleWithErrorBoundary as LazyCardTitle,
  CardDescriptionWithErrorBoundary as LazyCardDescription,
  CardContentWithErrorBoundary as LazyCardContent,
  CardFooterWithErrorBoundary as LazyCardFooter,
  CardActionWithErrorBoundary as LazyCardAction
};
