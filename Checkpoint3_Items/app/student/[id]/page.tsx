'use client'
import { Group, Text } from "@mantine/core"
import { useParams } from 'next/navigation';
import StudentClassesTable from "@/components/ClassesTable/StudentClassesTable";
import StudentClubsTable from "@/components/ClubsTable/StudentClubsTable";

/**
 * This is the view the student sees for their dashboard. It includes
 * classes and clubs.
 */
export default function StudentView() {
    const params = useParams(); // Access dynamic route parameters
    const userId = params?.id || "1"; // Retrieve the "id" parameter from the URL

    return <>
        <Group m="1rem 0 1.5rem 0">
            <Text>Currently seeing student view.</Text>
            <Text component="a" href="/" fw="700" c="red">Choose another role?</Text>
        </Group>

        <Group gap={20}>
            <StudentClassesTable studentID={userId} />
            <StudentClubsTable studentID={userId} />
        </Group>
    </>
}