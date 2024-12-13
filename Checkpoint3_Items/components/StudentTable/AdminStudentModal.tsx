import { Button, Group, Modal, Select, Stack, TextInput } from "@mantine/core"
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { format } from "date-fns";
import { useState } from "react";


/**
 * The modal that pops up when you click the Accept Student button. It's in its own file to reduce rerendering lag.
 * Allows you to insert a student into the database. 
 */
const AdminFacultyModal = ({ refreshData }: { refreshData: () => void }) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [emailValue, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [addressValue, setAddressValue] = useState<string>("")
    const [genderIdentity, setGender] = useState<string>("");
    const [guardianName, setGuardian] = useState<string>("");
    const [dob, setDob] = useState<Date | null>(null);


    const [opened, { open, close }] = useDisclosure(false);

    // Ensures all fields are filled out
    const checkCanSend = () => {
        if (firstName.length == 0 || lastName.length == 0 || emailValue.length == 0 || phoneNumber.length == 0 || addressValue.length == 0 || genderIdentity.length == 0 || guardianName.length == 0 || !dob) {
            return false
        }
        return true
    }

    const resetValues = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhoneNumber("")
        setAddressValue("")
        setGender("")
        setGuardian("")
        setDob(null)
    }

    // Adds a student to the db
    const handleStudentAddition = async () => {
        try {
            if (!checkCanSend()) {
                alert("All fields must be filled in!")
                return
            }
            let response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'createPerson', params: { firstName: firstName, lastName: lastName, phoneNum: phoneNumber, email: emailValue, address: addressValue, gender: genderIdentity, dob: format(dob || new Date(), "yyyy-MM-dd") } }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'createStudent', params: { firstName: firstName, lastName: lastName, phoneNum: phoneNumber, email: emailValue, address: addressValue, guardian: guardianName, enrollDate: format(new Date(), "yyyy-MM-dd") } }
                )
            });

            if (!response.ok) {
                console.error('HTTP error!', response.status, response.statusText);
                return;
            }

            close()
            resetValues()
            refreshData()
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }


    return <>
        <Modal opened={opened} onClose={close} withCloseButton={false} title="Accept Student">

            <Stack gap="md">
                <Group w="100%" justify='space-between'>
                    <TextInput
                        label="First name"
                        placeholder="Enter first name"
                        value={firstName}
                        w="48%"
                        onChange={(text) => { setFirstName(text.target.value) }}
                    />
                    <TextInput
                        label="Last name"
                        placeholder="Enter last name"
                        value={lastName}
                        w="48%"
                        onChange={(text) => { setLastName(text.target.value) }}
                    />
                </Group>

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
                <DatePickerInput
                    label="Date of birth"
                    placeholder="Pick date"
                    value={dob}
                    onChange={setDob}
                />

                <Select
                    label="Gender"
                    placeholder="Select gender"
                    data={['Male', 'Female', 'Other']}
                    value={genderIdentity}
                    defaultValue="Male"
                    allowDeselect={false}
                    onChange={(text) => { setGender(text || "") }}
                />
                <TextInput
                    label="Guardian name"
                    placeholder="Enter guardian's name"
                    value={guardianName}
                    onChange={(text) => { setGuardian(text.target.value) }}
                />

                <Button onClick={handleStudentAddition} m="1rem 0">
                    Confirm
                </Button>
            </Stack>
        </Modal>

        <Button variant="light" m="0.5rem" onClick={open}>Accept Student</Button>
    </>
}

export default AdminFacultyModal