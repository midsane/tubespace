import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';



export const TabsWrappedLabel: React.FC<{ value: string, setValue: (text: string) => void }> = ({ value, setValue }) => {
    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                textColor="inherit"
                indicatorColor="primary"
                sx={{ fontSize: '0.875rem' }}
                onChange={handleChange}
                aria-label="wrapped bg-label tabs example"
            >
                <Tab
                    value="one"
                    sx={{ fontSize: '0.875rem' }}
                    label="Assigned Tasks"
                    wrapped
                />
                <Tab value="two" label="WorkSpaces" />
                <Tab value="three" label="Draft Videos" />
            </Tabs>
        </Box>
    );
}

