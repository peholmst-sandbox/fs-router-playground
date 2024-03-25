import Sidebar from "Frontend/components/Sidebar";
import {Button, Icon} from "@vaadin/react-components";
import CustomerListItem from "Frontend/generated/org/example/fsrouterplayground/customers/CustomerListItem";
import {useSignal, useSignalEffect} from "@vaadin/hilla-react-signals";
import CustomerFormData from "Frontend/generated/org/example/fsrouterplayground/customers/CustomerFormData";
import CustomerFormDataModel from "Frontend/generated/org/example/fsrouterplayground/customers/CustomerFormDataModel";
import {useForm} from "@vaadin/hilla-react-form";
import {CustomerService} from "Frontend/generated/endpoints";
import {useEffect} from "react";
import CustomerForm from "Frontend/views/customers/{{customerId}}/_CustomerForm";

export type CustomerSidebarProps = {
    customer?: CustomerListItem,
    onClose?: () => void
    onEdit?: () => void
    onSave?: () => void
    onDiscard?: () => void
    editMode?: boolean
}

export default function CustomerSidebar(props: CustomerSidebarProps) {

    const customerFormData = useSignal<CustomerFormData | undefined>(undefined)
    const form = useForm(CustomerFormDataModel, {
        onSubmit: async (customerData) => {
            if (props.customer) {
                await CustomerService.update({customerId: props.customer.customerId, data: customerData})
                if (props.onSave) {
                    props.onSave()
                }
            }
        }
    })

    useEffect(() => {
        if (props.customer) {
            CustomerService.get(props.customer.customerId).then(result => customerFormData.value = result?.data)
        }
    }, [props.customer]);

    useSignalEffect(() => {
        form.read(customerFormData.value)
    })

    function handleEdit() {
        if (props.onEdit) {
            props.onEdit()
        }
    }

    async function handleSave() {
        await form.submit()
    }

    function handleDiscard() {
        form.reset()
        if (props.onDiscard) {
            props.onDiscard()
        }
    }

    const footer = <>
        {props.editMode ||
            <Button theme="tertiary" onClick={handleEdit}><Icon icon="lumo:edit" slot="prefix"/> Edit</Button>}
        {props.editMode || <Button theme="tertiary error"><Icon icon="vaadin:trash" slot="prefix"/> Delete</Button>}
        {props.editMode && <Button theme="primary" onClick={handleSave} disabled={form.invalid || form.submitting}><Icon
            icon="lumo:checkmark" slot="prefix"/> Save</Button>}
        {props.editMode && <Button theme="tertiary" onClick={handleDiscard}><Icon icon="lumo:undo"/> Discard</Button>}
    </>

    return <Sidebar title={props.editMode ? "Edit " + form.value.name : form.value.name}
                    onClose={props.onClose} hidden={!props.customer} footer={footer}>
        {customerFormData.value && <CustomerForm form={form} editMode={props.editMode}/>}
    </Sidebar>
}