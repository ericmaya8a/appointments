import { Skeleton } from '@/components/shadcn/skeleton';

export function WeekAppointmentsSkeleton() {
  return <Skeleton data-testid="week-appointments-skeleton" className="h-36 w-full rounded-md" />;
}
