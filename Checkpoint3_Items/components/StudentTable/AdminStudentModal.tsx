import { Stack, TextInput } from "@mantine/core"
import { useState } from "react";

const AdminFacultyModal = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [emailValue, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [addressValue, setAddressValue] = useState<string>("")
    const [genderIdentity, setGender] = useState<string>("");
    const [guardianName, setGuardian] = useState<string>("");


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
            value={lastName}
            onChange={(text) => { setLastName(text.target.value) }}
        />
        <TextInput
            label="Email"
            placeholder="Enter email"
            value={emailValue}
            onChange={(text) => { setEmail(text.target.value) }}
        />
        <TextInput
            label="Phone number"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(text) => { setPhoneNumber(text.target.value) }}
        />
        <TextInput
            label="Address"
            placeholder="Enter address"
            value={addressValue}
            onChange={(text) => { setAddressValue(text.target.value) }}
        />
        <TextInput
            label="Gender"
            placeholder="Enter gender"
            value={genderIdentity}
            onChange={(text) => { setGender(text.target.value) }}
        />
        <TextInput
            label="Guardian name"
            placeholder="Enter guardian's name"
            value={guardianName}
            onChange={(text) => { setGuardian(text.target.value) }}
        />
    </Stack>
}

export default AdminFacultyModal