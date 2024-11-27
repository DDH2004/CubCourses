import { Card, Table, TableData } from "@mantine/core"

const ClassesTable = () => {
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

    return <Card radius={10}>
        <Table data={tableData}>

        </Table>
    </Card>
}

export default ClassesTable