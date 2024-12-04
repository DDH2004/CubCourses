import { Flex, Group, Text } from "@mantine/core"

const Header = ({ role, tab }: { role: string, tab: string }) => {
    return <Flex align="baseline" justify="space-between" w="100%" mb="2rem">
        <Text fw="700" fz="36">CubCourses</Text>
        <Group gap="3rem">
            <Text component="a" href="/" fw={tab === 'classes' ? '700' : '400'} fz="18" opacity={tab === 'classes' ? 1 : 0.8}>Classes</Text>
            <Text component="a" href="/" fw={tab === 'clubs' ? '700' : '400'} fz="18" opacity={tab === 'clubs' ? 1 : 0.8}>Clubs</Text>
            <Text component="a" href="/" fw={tab === 'students' ? '700' : '400'} fz="18" opacity={tab === 'students' ? 1 : 0.8} display={role === 'admin' ? "inline" : "none"}>Students</Text>
            <Text component="a" href="/" fw={tab === 'faculty' ? '700' : '400'} fz="18" opacity={tab === 'faculty' ? 1 : 0.8} display={role === 'admin' ? "inline" : "none"}>Faculty</Text>
            <Text component="a" href="/" fw='400' fz="18" opacity={0.8}>Change Role</Text>
        </Group>
    </Flex>
}

export default Header