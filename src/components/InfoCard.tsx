import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";


interface PropsType {
    title: string,
    body: string,
    icon: ReactNode,
    colorClass: "error" | "primary" | "secondary" | "info" | "success" | "warning" | undefined,
    children: ReactNode,
}

export default function InfoCard(props: PropsType) {
    const { title, body, icon, colorClass, children } = props

    return (
        <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
        >
            <Card
                sx={{ height: '100%' }}
            >
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                        sx={{ justifyContent: 'space-between' }}
                    >
                        <Grid item>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="overline"
                            >
                                {title}
                            </Typography>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                {body}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Avatar
                                sx={{
                                    backgroundColor: `${colorClass}.main`,
                                    height: 56,
                                    width: 56
                                }}
                            >
                                {icon}
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            pt: 2,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {/* Footer to be displayed in the card */}
                        {children}
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}
