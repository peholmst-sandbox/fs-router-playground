import {AppLayout, DrawerToggle, Icon, Scroller, SideNav, SideNavItem, Tooltip} from "@vaadin/react-components";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Suspense} from "react";

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    return <AppLayout primarySection="navbar">
        <header slot="navbar" className="layout-header">
            <DrawerToggle aria-label="Toggle menu">
                <Tooltip slot="tooltip" text="Toggle menu"/>
            </DrawerToggle>
            <h1>Vaadin ERP</h1>
        </header>

        <Scroller slot="drawer" className="layout-sidenav-scroller">
            <SideNav onNavigate={({path}) => navigate(path!)} location={location}>
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
        </Scroller>

        <Suspense fallback={<p>Please wait</p>}>
            <Outlet/>
        </Suspense>
    </AppLayout>
}