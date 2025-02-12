import { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import { User } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { fetchAllUsers } from '@/services/userService';


const columns: ColumnDef<User>[] = [
    { accessorKey: 'username', header: 'Username' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'isActive', header: 'Active' },
    {
        id: 'actions',
        cell: ({ row }) => (
            <div className="space-x-2">
                <Link href={`/user/${row.original.id}`}>View</Link>
                <Link href={`/user/edit/${row.original.id}`}>Edit</Link>
            </div>
        ),
    },
];

export const UserList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchAllUsers(searchTerm);
            setUsers(data);
        };
        loadProducts();
    }, [searchTerm]);

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const confirmDeleteUser = (userId: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            // Add delete user logic here
            console.log('User deleted:', userId);
        }
    };

    return (
        <div>
            <Input
                placeholder="Search by username or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
