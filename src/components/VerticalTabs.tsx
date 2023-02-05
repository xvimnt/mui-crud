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

interface PropsType {
  rows: any[],
  title: string,
}

export default function VerticalTabs(props: PropsType) {
  const { title, rows } = props
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card>
      <CardHeader
        title={title}
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
          {rows.map(element => {
            return (
              <Tab key={element.id} label={`Orden ${element.id}`} {...a11yProps(element.id)} />
            )
          })}
        </Tabs>
        {rows.map((element, index) => {
          return (
            <TabPanel key={element.id} value={value} index={index}>
              <OrderTable order={element} />
            </TabPanel>
          )
        })}
      </Box>
    </Card>
  );
}