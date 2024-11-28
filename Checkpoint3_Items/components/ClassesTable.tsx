import { Card, ScrollArea, Table, TableData } from "@mantine/core"

const ClassesTable = ({classes}: {classes: any[]}) => {
    const tableData: TableData = {
        head: ['Class ID', 'Subject', 'Name', 'Teacher'],
        body: [
            [6, 12.011, 'C', 'Carbon'],
            [7, 14.007, 'N', 'Nitrogen'],
            [39, 88.906, 'Y', 'Yttrium'],
            [56, 137.33, 'Ba', 'Barium'],
            [58, 140.12, 'Ce', 'Cerium'],
        ],
    };

    return <Card radius={10} mah="30rem">
        <Table.ScrollContainer minWidth={500} type="native">
            <Table>
                <Table.Thead>
                    <Table.Tr >
                        <Table.Td>Class ID</Table.Td>
                        <Table.Td>Name</Table.Td>
                        <Table.Td>Teacher</Table.Td>
                        <Table.Td>Subject</Table.Td>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {classes.map((item, index) => {
                        // console.log(item)
                        return <Table.Tr key={index}>
                            <Table.Td>{item.cs_classkey}</Table.Td>
                            <Table.Td>{item.cs_name}</Table.Td>
                            <Table.Td>{item.p_firstname + " " + item.p_lastname}</Table.Td>
                            <Table.Td>{item.cs_subject}</Table.Td>
                        </Table.Tr>
                    })}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    </Card>
}

export default ClassesTable