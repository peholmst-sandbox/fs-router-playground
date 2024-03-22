import {PropsWithChildren} from "react";

export type ViewProps = {} & PropsWithChildren

export default function View(props: ViewProps) {
    return <main className="view">{props.children}</main>
}