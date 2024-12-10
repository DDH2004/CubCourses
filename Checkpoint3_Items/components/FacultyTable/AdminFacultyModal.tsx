import { Button, Checkbox, Group, Modal, NumberInput, Select, Stack, Text, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowLeft } from "@tabler/icons-react";
import { format } from "date-fns";
import { useState } from "react";

const GeneralForm = ({ generalData, setGeneralData, checkCanSend, setFormStep }) => <>
    <Group w="100%" justify='space-between'>
        <TextInput
            label="First name"
            placeholder="Enter first name"
            value={generalData.firstName}
            w="48%"
            onChange={(text) => {
                setGeneralData({
                    ...generalData,
                    firstName: text.target.value
                })
            }}
        />
        <TextInput
            label="Last name"
            placeholder="Enter last name"
            value={generalData.lastName}
            w="48%"
            onChange={(text) => {
                setGeneralData({
                    ...generalData,
                    lastName: text.target.value
                })
            }}
        />
    </Group>
    <Group w="100%" justify='space-between'>
        <TextInput
            label="Email"
            placeholder="Enter email"
            value={generalData.email}
            w="48%"
            onChange={(text) => {
                setGeneralData({
                    ...generalData,
                    email: text.target.value
                })
            }}
        />
        <TextInput
            label="Phone number"
            placeholder="Enter phone number"
            value={generalData.phoneNum}
            w="48%"
            onChange={(text) => {
                setGeneralData({
                    ...generalData,
                    phoneNum: text.target.value
                })
            }}
        />
    </Group>
    <TextInput
        label="Address"
        placeholder="Enter address"
        value={generalData.address}
        onChange={(text) => {
            setGeneralData({
                ...generalData,
                address: text.target.value
            })
        }}
    />
    <DatePickerInput
        label="Date of birth"
        placeholder="Pick date"
        value={generalData.dob}
        onChange={(date) => setGeneralData({
            ...generalData,
            dob: date || new Date()
        })}
    />
    <Select
        label="Gender"
        placeholder="Select gender"
        data={['Male', 'Female', 'Other']}
        value={generalData.gender}
        defaultValue="Male"
        allowDeselect={false}
        onChange={(text) => {
            setGeneralData({
                ...generalData,
                gender: text || ""
            })
        }}
    />
    <Select
        label="Role"
        placeholder="Select role"
        data={['Teacher', 'Admin']}
        value={generalData.role}
        defaultValue="Teacher"
        allowDeselect={false}
        onChange={(text) => {
            setGeneralData({
                ...generalData,
                role: text || ""
            })
        }}
    />

    <Button onClick={() => {
        if (!checkCanSend()) {
            alert("All fields must be filled in before moving on.")
            return
        }
        setFormStep(1)
    }} m="1rem 0">Next Step</Button>
</>

const TeacherForm = ({ setFormStep, generalData, setGeneralData, teacherInfo, setTeacherInfo, handleTeacherAddition }) => {
    return <>
        <Group onClick={() => setFormStep(0)} style={{ cursor: 'pointer' }} gap='sm'>
            <IconArrowLeft size={24} />
            <Text>Back</Text>
        </Group>
        <NumberInput
            label="Salary"
            placeholder="Enter salary"
            value={generalData.salary}
            min={0}
            onChange={(event) => setGeneralData({
                ...generalData,
                salary: parseInt(event.toString())
            })}
        />
        <Select
            label="Subject"
            placeholder="Select subject"
            data={['English', 'History', 'Math', 'Music', 'PE', 'Art', 'Science', 'French', 'Spanish']}
            value={teacherInfo.subject}
            allowDeselect={false}
            onChange={(text) => {
                setTeacherInfo({
                    ...teacherInfo,
                    subject: text || ""
                })
            }}
        />
        <Checkbox
            label="Tenured"
            checked={teacherInfo.tenure}
            onChange={(event) => setTeacherInfo({ ...teacherInfo, tenure: event.currentTarget.checked })}

        />
        <Select
            label="Office"
            placeholder="Select office"
            data={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']}
            value={teacherInfo.office}
            allowDeselect={false}
            onChange={(text) => {
                setTeacherInfo({
                    ...teacherInfo,
                    office: text || ""
                })
            }}
        />
        <Button onClick={handleTeacherAddition} m="1rem 0">
            Confirm
        </Button>
    </>
}

const AdminForm = ({ setFormStep, generalData, setGeneralData, adminInfo, setAdminInfo, handleAdminAddition }) => {
    return <>
        <Group onClick={() => setFormStep(0)} style={{ cursor: 'pointer' }} gap='sm'>
            <IconArrowLeft size={24} />
            <Text>Back</Text>
        </Group>
        <NumberInput
            label="Salary"
            placeholder="Enter salary"
            value={generalData.salary}
            min={0}
            onChange={(event) => setGeneralData({
                ...generalData,
                salary: parseInt(event.toString())
            })}
        />
        <TextInput
            label="Position"
            placeholder="Enter position"
            value={adminInfo.position}
            onChange={(text) => setAdminInfo({ ...adminInfo, position: text.target.value })}
        />
        <Select
            label="Department"
            placeholder="Select department"
            data={['Administration', 'Guidance', 'Sports']}
            value={adminInfo.dept}
            allowDeselect={false}
            onChange={(text) => {
                setAdminInfo({
                    ...adminInfo,
                    dept: text || ""
                })
            }}
        />
        <Button onClick={handleAdminAddition} m="1rem 0">
            Confirm
        </Button>
    </>
}

const AdminFacultyModal = ({ refreshData }: { refreshData: () => void }) => {
    const [generalData, setGeneralData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNum: "",
        address: "",
        gender: "",
        role: "",
        salary: 0,
        dob: new Date()
    })

    const [formStep, setFormStep] = useState(0)

    const [teacherInfo, setTeacherInfo] = useState(
        {
            subject: "",
            tenure: false,
            office: "",
        }
    )

    const [adminInfo, setAdminInfo] = useState(
        {
            position: "",
            dept: "",
            // budgetResponsibility: 0, // I honestly don't remember why I added this
        }
    )

    const [opened, { open, close }] = useDisclosure(false);

    const checkCanSend = () => {
        if (generalData.firstName.length == 0 || generalData.lastName.length == 0 || generalData.email.length == 0 || generalData.phoneNum.length == 0 || generalData.address.length == 0 || generalData.gender.length == 0 || generalData.role.length == 0) {
            return false
        }
        return true
    }

    const resetValues = () => {
        setGeneralData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNum: "",
            address: "",
            gender: "",
            role: "",
            salary: 0,
            dob: new Date()
        })

        setTeacherInfo({
            subject: "",
            tenure: false,
            office: "",
        })

        setAdminInfo({
            position: "",
            dept: "",
            // budgetResponsibility: 0,
        })
        setFormStep(0)
    }


    const handleTeacherAddition = async () => {
        try {
            if (teacherInfo.subject.length == 0 || teacherInfo.office.length == 0) {
                alert("All fields must be filled in!")
                return
            }
            let response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'createPerson', params: { firstName: generalData.firstName, lastName: generalData.lastName, phoneNum: generalData.phoneNum, email: generalData.email, address: generalData.address, gender: generalData.gender, dob: format(generalData.dob || new Date(), "yyyy-MM-dd") } }
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
                    {
                        queryType: 'createFaculty', params: {
                            firstName: generalData.firstName, lastName: generalData.lastName, phoneNum: generalData.phoneNum, email: generalData.email, address: generalData.address, hireDate: format(new Date(), "yyyy-MM-dd"), salary: generalData.salary, role: generalData.role
                        }
                    }
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
                    {
                        queryType: 'createTeacher', params: {
                            firstName: generalData.firstName, lastName: generalData.lastName, phoneNum: generalData.phoneNum, email: generalData.email, address: generalData.address, subject: teacherInfo.subject, tenure: teacherInfo.tenure, office: teacherInfo.office
                        }
                    }
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

    const handleAdminAddition = async () => {
        try {
            if (adminInfo.dept.length == 0 || adminInfo.position.length == 0) {
                alert("All fields must be filled in!")
                return
            }
            let response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    { queryType: 'createPerson', params: { firstName: generalData.firstName, lastName: generalData.lastName, phoneNum: generalData.phoneNum, email: generalData.email, address: generalData.address, gender: generalData.gender, dob: format(generalData.dob || new Date(), "yyyy-MM-dd") } }
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
                    {
                        queryType: 'createFaculty', params: {
                            firstName: generalData.firstName, lastName: generalData.lastName, phoneNum: generalData.phoneNum, email: generalData.email, address: generalData.address, hireDate: format(new Date(), "yyyy-MM-dd"), salary: generalData.salary, role: generalData.role
                        }
                    }
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
                    {
                        queryType: 'createAdmin', params: {
                            firstName: generalData.firstName, lastName: generalData.lastName, phoneNum: generalData.phoneNum, email: generalData.email, address: generalData.address, position: adminInfo.position, dept: adminInfo.dept
                        }
                    }
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
        <Button variant="light" m="0.5rem" onClick={open}>Hire Employee</Button>
        <Modal opened={opened} onClose={close} withCloseButton={false} title="Hire Employee">
            <Stack gap="md">
                {formStep === 0 ? <GeneralForm generalData={generalData} setGeneralData={setGeneralData} setFormStep={setFormStep} checkCanSend={checkCanSend} /> :
                    (generalData.role === "Admin" ? <AdminForm generalData={generalData} setGeneralData={setGeneralData} setFormStep={setFormStep} adminInfo={adminInfo} setAdminInfo={setAdminInfo} handleAdminAddition={handleAdminAddition} /> : <TeacherForm generalData={generalData} setGeneralData={setGeneralData} setFormStep={setFormStep} teacherInfo={teacherInfo} setTeacherInfo={setTeacherInfo} handleTeacherAddition={handleTeacherAddition} />)
                }
            </Stack>
        </Modal>
    </>
}

export default AdminFacultyModal