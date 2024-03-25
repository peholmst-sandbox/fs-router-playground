import {AppLayout, Icon, SideNav, SideNavItem} from "@vaadin/react-components";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Suspense} from "react";

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    return <AppLayout primarySection="drawer">
        <h1 slot="drawer" className="app-title">Vaadin ERP</h1>

        <SideNav slot="drawer" className="layout-sidenav" onNavigate={({path}) => navigate(path!)} location={location}>
            <SideNavItem path="/products">
                <Icon icon="vaadin:open-book" slot="prefix"/>
                Product Catalog
            </SideNavItem>
            <SideNavItem path="/orders">
                <Icon icon="vaadin:cart" slot="prefix"/>
                Orders
            </SideNavItem>
            <SideNavItem path="/customers">
                <Icon icon="vaadin:records" slot="prefix"/>
                Customers
            </SideNavItem>
            <SideNavItem path="/shipping">
                <Icon icon="vaadin:package" slot="prefix"/>
                Shipping
            </SideNavItem>
            <SideNavItem path="/invoicing">
                <Icon icon="vaadin:invoice" slot="prefix"/>
                Invoicing
            </SideNavItem>
            <SideNavItem path="/inventory">
                <Icon icon="vaadin:storage" slot="prefix"/>
                Inventory
            </SideNavItem>
        </SideNav>

        <div className="layout-content-container">
            <Suspense fallback={<p>Please wait</p>}>
                <Outlet/>
            </Suspense>
        </div>
    </AppLayout>
}