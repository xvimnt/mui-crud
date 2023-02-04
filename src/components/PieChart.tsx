import { Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { LaptopMac, Tablet, Phone } from '@mui/icons-material';

export const PieChart = (props: any) => {

    const devices = [
        {
          title: 'Desktop',
          value: 63,
          icon: LaptopMac,
          color: '#3F51B5'
        },
        {
          title: 'Tablet',
          value: 15,
          icon: Tablet,
          color: '#E53935'
        },
        {
          title: 'Mobile',
          value: 23,
          icon: Phone,
          color: '#FB8C00'
        }
      ];

  return (
    <Card {...props}>
      <CardHeader title="Traffic by Device" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 325,
            position: 'relative'
          }}
        >
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
