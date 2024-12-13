import { Button, Card, Group, Menu, Modal, NumberInput, rem, Select, Stack, Table, TableData, Text, Textarea, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { IconCancel, IconDotsVertical, IconFileDescription, IconFilePencil, IconFlame, IconMessageCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const AdminBonusesModal = ({ refreshData, faculty }: { refreshData: () => void, faculty: any[] }) => {
    const [amount, setAmount] = useState(0);
    const [reason, setReason] = useState("");
    const [facultyId, setFacultyId] = useState("");


    const [opened, { open, close }] = useDisclosure(false);

    const resetValues = () => {
        setAmount(0)
        setReason("")
        setFacultyId("")
    }


    const handleGrantBonus = async () => {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'grantBonus', params: { grantDate: format(new Date(), "yyyy-MM-dd"), amount: amount, reason: reason, facultyId: facultyId } }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            refreshData()
            resetValues()
            close()
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    return <>
        <Modal opened={opened} onClose={close} withCloseButton={false} title="Grant Bonus">

            <Stack gap="md">
                <NumberInput label="Amount" value={amount} min={0} onChange={(event) => setAmount(parseInt(event.toString()))} />
                <Textarea label="Reason" value={reason} onChange={(text) => setReason(text.target.value)} />
                <Select label="Faculty" searchable data={faculty.map(
                    (item) => {
                        const output = {
                            value: item.f_facultykey + "",
                            label: item.f_facultykey + '. ' + item.p_firstname + ' ' + item.p_lastname
                        }
                        return output;
                    }
                )} value={facultyId} onChange={(val) => { setFacultyId(val || "1"); console.log(val) }} />

                <Button onClick={handleGrantBonus} m="1rem 0">
                    Confirm
                </Button>
            </Stack>
        </Modal>

        <Button variant="light" m="0.5rem" onClick={open}>Grant Bonus</Button>
    </>
}

const AdminBonusesTable = () => {
    const [bonuses, setBonuses] = useState<any[]>([]);
    const [faculty, setFaculty] = useState<any[]>([]);

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

    async function fetchBonuses() {
        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'getBonuses', params: {} }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            const result = await response.json();
            // console.log('Result received:', result.result);

            setBonuses(result.result);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }


    useEffect(() => {
        fetchBonuses()
        fetchAllFaculty()
    }, [])

    return <Card radius={10} mah="30rem" m="1rem 0">

        <Table.ScrollContainer minWidth={400} type="native">
            <Group justify='space-between'>
                <Text mb="0.5rem" fw="700" c="blue">Bonuses</Text>
                <AdminBonusesModal refreshData={fetchBonuses} faculty={faculty} />
            </Group>
            <Table>
                <Table.Thead>
                    <Table.Tr >
                        {/* <Table.Td fw="700">Bonus ID</Table.Td> */}
                        <Table.Td fw="700">Amount</Table.Td>
                        <Table.Td fw="700">Recipient</Table.Td>
                        <Table.Td fw="700">Reason</Table.Td>
                        <Table.Td fw="700">Date</Table.Td>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {
                        bonuses.map(
                            (item, index) => {
                                return <Table.Tr key={index}>
                                    {/* <Table.Td>{item.b_bonuskey}</Table.Td> */}
                                    <Table.Td>${item.b_amount}</Table.Td>
                                    <Table.Td>{item.p_firstname} {item.p_lastname}</Table.Td>
                                    <Table.Td>{item.b_reason.length > 37 ? item.b_reason.substring(0, 34) + "..." : item.b_reason}</Table.Td>
                                    <Table.Td>{item.b_date}</Table.Td>
                                </Table.Tr>
                            }
                        )
                    }
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    </Card>
}

export default AdminBonusesTable