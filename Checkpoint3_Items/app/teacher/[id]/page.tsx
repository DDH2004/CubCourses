'use client'
import { Container, Flex, Group, Paper, Text } from "@mantine/core"
import { useParams } from 'next/navigation';
import StudentClassesTable from "@/components/ClassesTable/StudentClassesTable";
import StudentClubsTable from "@/components/ClubsTable/StudentClubsTable";
import TeacherClassesTable from "@/components/ClassesTable/TeacherClassesTable";
import TeacherClubsTable from "@/components/ClubsTable/TeacherClubsTable";
import TeacherViewStudents from "@/components/TeacherViewStudents";

export default function TeacherView() {
    const params = useParams(); // Access dynamic route parameters
    const userId = params?.id || "1"; // Retrieve the "id" parameter from the URL

    return <>
        <Group m="1rem 0 1.5rem 0">
            <Text>Currently seeing teacher view.</Text>
            <Text component="a" href="/" fw="700" c="red">Choose another role?</Text>
        </Group>

        <Paper w={1000}>
            <Group w="100%" justify="space-between">
                <TeacherClassesTable teacherID={userId} />
                <TeacherClubsTable teacherID={userId} />
            </Group>

            <TeacherViewStudents />
        </Paper>
    </>
}