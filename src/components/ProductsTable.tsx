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
import { Product } from '../features/products/schema';

export function ProductsTable (props: any) {
    const { products } = props
    return (
        <Card>
            <CardHeader
                subtitle={`${products.length} in total`}
                title="Latest Products"
            />
            <Divider />
            <List>
                {products.map((product: Product, i: number) => (
                    <ListItem
                        divider={i < products.length - 1}
                        key={product.id}
                    >
                        <ListItemAvatar>
                            <img
                                alt={product.name}
                                src={product.imageUrl}
                                style={{
                                    height: 48,
                                    width: 48
                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={product.name}
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