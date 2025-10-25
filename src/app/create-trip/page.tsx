import { CreateTripSkeleton, CreateTripView } from '@/modules/trip/ui/views/create-trip';
import { caller, getQueryClient } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { Suspense } from 'react'

export const dynamic = "force-dynamic"

const CreateTrip = async () => {

  const queryClient = getQueryClient();

  const session = await caller.auth.session();
  const user = session.user;

  if (!user) redirect('/login');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<CreateTripSkeleton />}>
        <CreateTripView userId={user.id} />
      </Suspense>
    </HydrationBoundary >
  )
}

export default CreateTrip