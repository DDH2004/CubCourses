import { Stack, TextInput } from "@mantine/core"
import { useState } from "react";

const AdminFacultyModal = () => {
    const [firstName, setFirstName] = useState<string>("");

    return <Stack gap="md">
        <TextInput
            label="First name"
            placeholder="Enter first name"
            value={firstName}
            onChange={(text) => { setFirstName(text.target.value) }}
        />
        <TextInput
            label="Last name"
            placeholder="Enter last name"
        />
        <TextInput
            label="Email"
            placeholder="Enter email"
        />
        <TextInput
            label="Phone number"
            placeholder="Enter phone number"
        />
        <TextInput
            label="Address"
            placeholder="Enter address"
        />
        <TextInput
            label="Gender"
            placeholder="Enter gender"
        />

    </Stack>
}

export default AdminFacultyModal