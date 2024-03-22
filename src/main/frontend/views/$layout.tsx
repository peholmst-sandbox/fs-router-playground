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
                    <Icon icon="vaadin:storage" slot="prefix"/>
                    Products
                </SideNavItem>
            </SideNav>
        </Scroller>

        <Suspense fallback={<p>Please wait</p>}>
            <Outlet/>
        </Suspense>
    </AppLayout>
}