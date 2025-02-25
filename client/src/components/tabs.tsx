import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export const TabsWrappedLabel: React.FC<{ value: string, setValue: (val: string) => void }> = ({ value, setValue }) => {

    return (
        <Box className="w-full bg-primary text-accent  rounded">
            <Tabs
                value={value}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                className="bg-primary"
                sx={{
                    '& .MuiTab-root': {
                        color: 'white',
                    },
                    '& .Mui-selected': {
                        color: 'theme(colors.accent)',
                    },
                }}
            >
                <Tab onClick={() => setValue('one')} value="one" label="Assigned Tasks" />
                <Tab onClick={() => setValue('two')} value="two" label="WorkSpaces" />
                <Tab onClick={() => setValue('three')} value="three" label="Draft Videos" />
            </Tabs>
        </Box>
    );
}

export const TabsWrappedLabelCol: React.FC<{ value: string, setValue: (val: string) => void }> = ({ value, setValue }) => {

    return (
        <Box className="w-full bg-primary text-accent  rounded">
            <Tabs
                value={value}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                className="bg-primary"
                sx={{
                    '& .MuiTab-root': {
                        color: 'white',
                    },
                    '& .Mui-selected': {
                        color: 'theme(colors.accent)',
                    },
                }}
            >
                <Tab onClick={() => setValue('one')} value="one" label="Pending Tasks" />
                <Tab onClick={() => setValue('two')} value="two" label="Completed Tasks" />
                <Tab onClick={() => setValue('three')} value="three" label="Joined Workspaces" />
            </Tabs>
        </Box>
    );
}

export const TabsWrappedLabel2: React.FC<{ value: string, setValue: (val: string) => void }> = ({ value, setValue }) => {

    return (
        <Box className="w-full bg-primary text-accent  rounded">
            <Tabs
                value={value}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                className="bg-primary"
                sx={{
                    '& .MuiTab-root': {
                        color: 'white',
                    },
                    '& .Mui-selected': {
                        color: 'theme(colors.accent)',
                    },
                }}
            >
                <Tab onClick={() => setValue('one')} value="one" label="Assigned Tasks" />
                <Tab onClick={() => setValue('two')} value="two" label="Draft Videos" />
                <Tab onClick={() => setValue('three')} value="three" label="Collaborators" />
            </Tabs>
        </Box>
    );
}


export const TabsWrappedLabel3: React.FC<{ value: string, setValue: (val: string) => void }> = ({ value, setValue }) => {

    return (
        <Box className="w-full bg-primary text-accent  rounded">
            <Tabs
                value={value}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                className="bg-primary"
                sx={{
                    '& .MuiTab-root': {
                        color: 'white',
                    },
                    '& .Mui-selected': {
                        color: 'theme(colors.accent)',
                    },
                }}
            >
                <Tab onClick={() => setValue('one')} value="one" label="General" />
                <Tab onClick={() => setValue('two')} value="two" label="Billings" />
            </Tabs>
        </Box>
    );
}