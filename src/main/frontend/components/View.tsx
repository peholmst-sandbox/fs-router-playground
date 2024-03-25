import {PropsWithChildren} from "react";
import {DrawerToggle, Tooltip} from "@vaadin/react-components";

export type ViewProps = {
    title?: string
    actions?: React.ReactNode
    sidebar?: React.ReactNode
} & PropsWithChildren

export default function View(props: ViewProps) {
    return <main className="view" aria-labelledby="view-content-title">
        <section className="view-content-container">
            <header>
                <div className="view-content-title-container">
                    <DrawerToggle aria-label="Toggle menu">
                        <Tooltip slot="tooltip" text="Toggle menu"/>
                    </DrawerToggle>
                    <h2 id="view-content-title">{props.title}</h2>
                </div>
                {props.actions}
            </header>
            <div className="view-content">
                {props.children}
            </div>
        </section>
        {props.sidebar}
    </main>
}