import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Card, CardHeader, Divider } from '@mui/material';
import OrderTable from './OrderTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: '100%' }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card>
      <CardHeader
        subtitle={`ordenes in total`}
        title="Ordenes Pendientes"
      />
      <Divider />
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Orden 234" {...a11yProps(0)} />
          <Tab label="Orden 321" {...a11yProps(1)} />
          <Tab label="Orden 543" {...a11yProps(2)} />
          <Tab label="Orden 543" {...a11yProps(3)} />
          <Tab label="Orden 453" {...a11yProps(4)} />
          <Tab label="Orden 324" {...a11yProps(5)} />
          <Tab label="Orden 543" {...a11yProps(6)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <OrderTable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OrderTable />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Orden Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Orden Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Orden Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Orden Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Orden Seven
        </TabPanel>
      </Box>
    </Card>
  );
}