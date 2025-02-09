import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export const TabsWrappedLabel: React.FC<{ value: string, setValue: (text: string) => void }> = ({ value, setValue }) => {
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                textColor="inherit"
                indicatorColor="primary"
                onChange={handleChange}
                aria-label="wrapped bg-label tabs example"
            >
                <Tab
                    value="one"
                    label="Assigned Tasks"
                    wrapped
                />
                <Tab value="two" label="WorkSpaces" />
                <Tab value="three" label="Draft Videos" />
            </Tabs>
        </Box>
    );
}
