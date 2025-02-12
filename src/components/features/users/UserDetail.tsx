import { User } from "@/types";

interface UserDetailProps {
  user: User;
}

export const UserDetail = ({ user }: UserDetailProps) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{user.username}</h1>
        <p>{user.email}</p>
        <p>Created At: {user.created_at}</p>
        <p>Is Active: {user.isActive ? 'Yes' : 'No'}</p>
    </div>
  );
};