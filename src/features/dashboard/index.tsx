import InfoCard from "../../components/InfoCard";
// Mui
import { Container, Grid, Box, Typography, LinearProgress } from "@mui/material";
// Icons
import { Money, Person, ArrowDownward, ArrowUpward, InsertChart, AttachMoney } from "@mui/icons-material";
import { BarChart } from "../../components/BarChart";
import { PieChart } from "../../components/PieChart";
import { ProductsTable } from "../../components/ProductsTable";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectProducts } from "../products/slice";
import { getAllProducts } from "../products/api";
import VerticalTabs  from "../../components/VerticalTabs";

export default function Dashboard() {
    
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                }}
            >
                <Typography variant="h3" sx={{ marginBottom: 4 }}>
                    Dashboard
                </Typography>
                <Container maxWidth={false}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <InfoCard title="Capital" body="$24k" icon={<Money />} colorClass="error">
                            <ArrowDownward color="error" />
                            <Typography color="success" sx={{ mr: 1 }} variant="body2">
                                12%
                            </Typography>
                            <Typography color="textSecondary" variant="caption">
                                Desde el ultimo mes
                            </Typography>
                        </ InfoCard>
                        <InfoCard title="Clientes" body="35" icon={<Person />} colorClass="success">
                            <ArrowUpward color="success" />
                            <Typography color="success" sx={{ mr: 1 }} variant="body2">
                                5%
                            </Typography>
                            <Typography color="textSecondary" variant="caption">
                                Desde el ultimo mes
                            </Typography>
                        </ InfoCard>
                        <InfoCard title="Cumplimiento de Metas" body="75%" icon={<InsertChart />} colorClass="warning">
                            <Box sx={{ pt: 3, width: '100%' }}>
                                <LinearProgress value={75} variant="determinate" />
                            </Box>
                        </ InfoCard>
                        <InfoCard title="Ventas" body="$10k" icon={<AttachMoney />} colorClass="primary">
                            <ArrowUpward color="primary" />
                            <Typography color="success" sx={{ mr: 1 }} variant="body2">
                                5%
                            </Typography>
                            <Typography color="textSecondary" variant="caption">
                                Desde el ultimo mes
                            </Typography>
                        </ InfoCard>
                        <Grid
                            item
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            <BarChart />
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            <PieChart />
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            <ProductsTable products={products.data}/>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            <VerticalTabs />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
