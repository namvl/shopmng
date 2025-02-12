'use client';
import { UserList } from "@/components/features/users/UserList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UserHome() {
    const route = useRouter();
    const handleNewUser = () => {
        route.push("/users/create");
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>
            <div>
                <Button onClick={handleNewUser}>New User</Button>
            </div>
            <UserList />
        </div>
    );
}