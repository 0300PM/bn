'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MAX_QUANTITY } from '@/lib/commerce';
import { cn } from '@/lib/utils';

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
};

export function QuantityStepper({ value, onChange, max = MAX_QUANTITY, size = 'md', className }: QuantityStepperProps) {
  const buttonSize = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';

  return (
    <div className={cn('inline-flex items-center rounded-md border', className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(buttonSize, 'rounded-r-none')}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Zmniejsz ilość"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className={cn('min-w-10 text-center text-sm font-medium tabular-nums', size === 'sm' && 'min-w-8')}>
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(buttonSize, 'rounded-l-none')}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Zwiększ ilość"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
