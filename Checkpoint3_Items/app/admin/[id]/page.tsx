'use client'
import AdminFacultyTable from "@/components/FacultyTable/AdminFacultyTable";
import AdminStudentTable from "@/components/StudentTable/AdminStudentTable";
import AdminClubsTable from "@/components/ClubsTable/AdminClubsTable";
import { Group, Text } from "@mantine/core"
import AdminBonusesTable from "@/components/AdminBonusesTable";

// The page the admin sees. Mainly composed of smaller components defined in their own files
export default function AdminView() {
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
        <Group gap="lg">
            <AdminClubsTable />
            <AdminBonusesTable />
        </Group>
    </>
}