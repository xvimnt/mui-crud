import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface PropsType {
    title: string,
    rows: any[],
}

export function InfoTable (props: PropsType) {
    const { rows, title } = props
    return (
        <Card>
            <CardHeader
                subtitle={`${rows.length} in total`}
                title={title}
            />
            <Divider />
            <List>
                {rows.map((item: any, i: number) => (
                    <ListItem
                        divider={i < rows.length - 1}
                        key={item.id}
                    >
                        <ListItemAvatar>
                            <img
                                alt={item.name}
                                src={item.imageUrl}
                                style={{
                                    height: 48,
                                    width: 48
                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.name}
                            secondary={`Updated`}
                        />
                        <IconButton
                            edge="end"
                            size="small"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon />}
                    size="small"
                    variant="text"
                >
                    View all
                </Button>
            </Box>
        </Card>
    );

} 