import {PropsWithChildren} from "react";

export type ViewProps = {
    title?: string
    actions?: React.ReactNode
    sidebar?: React.ReactNode
} & PropsWithChildren

export default function View(props: ViewProps) {
    return <main className="view" aria-labelledby="view-content-title">
        <section className="view-content-container">
            <header>
                <h2 id="view-content-title">{props.title}</h2>
                {props.actions}
            </header>
            <div className="view-content">
                {props.children}
            </div>
        </section>
        {props.sidebar}
    </main>
}