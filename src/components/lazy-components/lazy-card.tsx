// components/LazyCard.tsx
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// Lazy load the actual Card components
const Card = React.lazy(() =>
  import('@/components/ui/card').then((module) => ({
    default: module.Card
  }))
);

const CardHeader = React.lazy(() =>
  import('@/components/ui/card').then((module) => ({
    default: module.CardHeader
  }))
);

const CardTitle = React.lazy(() =>
  import('@/components/ui/card').then((module) => ({
    default: module.CardTitle
  }))
);

const CardDescription = React.lazy(() =>
  import('@/components/ui/card').then((module) => ({
    default: module.CardDescription
  }))
);

const CardContent = React.lazy(() =>
  import('@/components/ui/card').then((module) => ({
    default: module.CardContent
  }))
);

const CardFooter = React.lazy(() =>
  import('@/components/ui/card').then((module) => ({
    default: module.CardFooter
  }))
);

const CardAction = React.lazy(() =>
  import('@/components/ui/card').then((module) => ({
    default: module.CardAction
  }))
);

// Fallback skeleton component for the Card
const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('rounded-xl border p-6 shadow-sm', className)}>
    <Skeleton className="h-6 w-3/4 mb-4" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

// Lazy Card component
interface LazyCardProps extends React.ComponentProps<typeof Card> {
  loading?: boolean;
}

const LazyCard: React.FC<LazyCardProps> = ({ loading, children, ...props }) => {
  if (loading) {
    return <CardSkeleton className={props.className} />;
  }

  return (
    <Suspense fallback={<CardSkeleton className={props.className} />}>
      <Card {...props}>{children}</Card>
    </Suspense>
  );
};

// Export all lazy components
export {
  LazyCard,
  CardHeader as LazyCardHeader,
  CardTitle as LazyCardTitle,
  CardDescription as LazyCardDescription,
  CardContent as LazyCardContent,
  CardFooter as LazyCardFooter,
  CardAction as LazyCardAction
};
