import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, Grid } from '@mui/material';
import LeftBar from '.././components/LeftBar';

export default function AdminLayout(props: any) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <LeftBar></LeftBar>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 6 }}>
                <Grid container>
                    {props.children}
                </Grid>
            </Box>
        </Box>
    );
}
