import * as React from 'react'
import { UserDetail } from '@/components/features/users/UserDetail';
import { UserService } from '@/services/userService';

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const user = await UserService.fetchUserById(id);

  if (!user) return <div>user not found</div>;

  return (
    <div className="container mx-auto p-4">
      <UserDetail user={user} />
    </div>
  );
}