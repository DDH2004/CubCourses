'use client'
import { Group, Text } from "@mantine/core"
import { useParams } from 'next/navigation';
import StudentClassesTable from "@/components/ClassesTable/StudentClassesTable";
import StudentClubsTable from "@/components/ClubsTable/StudentClubsTable";
import TeacherClassesTable from "@/components/ClassesTable/TeacherClassesTable";

export default function TeacherView() {
    const params = useParams(); // Access dynamic route parameters
    const userId = params?.id || "1"; // Retrieve the "id" parameter from the URL

    return <>
        <Group m="1rem 0 1.5rem 0">
            <Text>Currently seeing teacher view.</Text>
            <Text component="a" href="/" fw="700" c="red">Choose another role?</Text>
        </Group>

        <Group>
            <TeacherClassesTable teacherID={userId} />
            {/* <StudentClassesTable studentID={userId} />
            <StudentClubsTable studentID={userId} /> */}
        </Group>
    </>
}