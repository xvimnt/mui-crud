import { Routes, Route } from "react-router-dom";
import Categories from "../features/categories";
import Orders from "../features/orders";
import Products from "../features/products";
import Dashboard from "../features/dashboard";
import AdminLayout from "./AdminLayout";

export default function RoutesList() {
    return (
        <Routes>
            <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/products" element={<AdminLayout><Products /></AdminLayout>} />
            <Route path="/categories" element={<AdminLayout><Categories /></AdminLayout>} />
            <Route path="/orders" element={<AdminLayout><Orders /></AdminLayout>} />
        </Routes>
    );
}