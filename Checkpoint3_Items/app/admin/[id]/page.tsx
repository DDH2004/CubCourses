'use client'
import AdminFacultyTable from "@/components/FacultyTable/AdminFacultyTable";
import AdminStudentTable from "@/components/StudentTable/AdminStudentTable";
import AdminClubsTable from "@/components/ClubsTable/AdminClubsTable";
import { Container, Flex, Group, Paper, Text } from "@mantine/core"
import { useParams } from 'next/navigation';

export default function AdminView() {
    const params = useParams(); // Access dynamic route parameters
    const userId = params?.id || "1"; // Retrieve the "id" parameter from the URL

    return <>
        <Group m="1rem 0 1.5rem 0">
            <Text>Currently seeing admin view.</Text>
            <Text component="a" href="/" fw="700" c="red">Choose another role?</Text>
        </Group>

        <Group gap={20}>
            <Text>Admin View</Text>
        </Group>

        <AdminStudentTable />
        <AdminFacultyTable />
        <AdminClubsTable />
    </>
}