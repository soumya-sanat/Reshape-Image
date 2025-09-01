// components/LazyButton.tsx
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { buttonVariants, type ButtonProps } from '@/components/ui/button';

// Lazy load the actual Button component
const Button = React.lazy(() =>
  import('@/components/ui/button').then((module) => ({
    default: module.Button
  }))
);

interface LazyButtonProps extends ButtonProps {
  height?: string | number;
  width?: string | number;
}

const LazyButton: React.FC<LazyButtonProps> = ({
  size = 'default',
  variant = 'default',
  height,
  width,
  className,
  ...props
}) => {
  return (
    <Suspense
      fallback={
        <Skeleton className={buttonVariants({ size, className })} style={{ height, width }} />
      }>
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
  );
};

export { LazyButton };
