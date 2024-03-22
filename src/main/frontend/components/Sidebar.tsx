import {Button, Icon, Tooltip} from "@vaadin/react-components";
import "@vaadin/vaadin-lumo-styles/vaadin-iconset.js";
import {useSignal} from "@vaadin/hilla-react-signals";
import {PropsWithChildren, ReactNode, useEffect} from "react";

export type SidebarProps = {
    hidden?: boolean
    canClose?: () => boolean
    onClose?: () => void
    title?: string
    footer?: ReactNode
} & PropsWithChildren

export default function Sidebar(props: SidebarProps) {

    const hidden = useSignal(props.hidden || false);

    useEffect(() => {
        hidden.value = props.hidden || false;
    }, [props.hidden]);

    function handleClose() {
        if (props.canClose && !props.canClose()) {
            return;
        }
        // Close the sidebar
        hidden.value = true;
        if (props.onClose) {
            props.onClose();
        }
    }

    return <section className={`view-sidebar ${hidden.value ? 'hidden' : ''}`} aria-labelledby="view-sidebar-title">
        <header>
            <h2 id="view-sidebar-title">{props.title}</h2>
            <Button theme="icon tertiary" className="close-button" onClick={handleClose} aria-label="Close sidebar">
                <Icon icon="lumo:cross"/>
                <Tooltip slot="tooltip" text="Close sidebar"/>
            </Button>
        </header>
        <div className="view-sidebar-content">
            {props.children}
        </div>
        {props.footer && <footer>{props.footer}</footer>}
    </section>
}