import { Button, Card, Menu, rem, Table, TableData, Text } from "@mantine/core"
import { IconDotsVertical, IconFileDescription, IconFilePencil, IconMessageCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const AdminFacultyTable = () => {
    const [faculty, setFaculty] = useState<any[]>([]);
    const router = useRouter()

    async function fetchAllFaculty() {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'getFaculty', params: {} }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            const result = await response.json();
            // console.log('Result received:', result.result);

            setFaculty(result.result);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    async function fetchAllFaculty() {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'getFaculty', params: {} }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            const result = await response.json();

            setFaculty(result.result);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    const FacultyMenu = ({ id }: { id: any }) => {
        const [opened, setOpened] = useState(false);
        const handleToggle = () => setOpened((o) => !o);

        return (
            <Menu
                opened={opened}
                onClose={() => setOpened(false)}
                control={
                    <Button
                        onClick={handleToggle}
                        variant="link"
                        color="gray"
                        size="xs"
                        radius="xl"
                        padding="xs"
                        icon={<IconDotsVertical />}
                    />
                }
            >
                <Menu.Item
                    icon={<IconFilePencil />}
                    onClick={() => {
                        router.push(`/admin/faculty/${id}/edit`);
                    }}
                >
                    Edit
                </Menu.Item>
                <Menu.Item
                    icon={<IconTrash />}
                    onClick={() => {
                        router.push(`/admin/faculty/${id}/delete`);
                    }}
                >
                    Delete
                </Menu.Item>
            </Menu>
        );
    }