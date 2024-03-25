import {useSignal, useSignalEffect} from "@vaadin/hilla-react-signals";
import {useForm} from "@vaadin/hilla-react-form";
import CustomerFormDataModel from "Frontend/generated/org/example/fsrouterplayground/customers/CustomerFormDataModel";
import {CustomerService} from "Frontend/generated/endpoints";
import {useEffect} from "react";
import {Button, Dialog} from "@vaadin/react-components";
import CustomerForm from "Frontend/views/customers/{{customerId}}/_CustomerForm";

export type AddCustomerDialogProps = {
    opened?: boolean
    onClose?: () => void
    onAdd?: () => void
}

export default function AddCustomerDialog(props: AddCustomerDialogProps) {
    const opened = useSignal<boolean>(props.opened || false)

    const form = useForm(CustomerFormDataModel, {
        onSubmit: async (customerData) => {
            await CustomerService.add(customerData)
            if (props.onAdd) {
                props.onAdd()
            }
            opened.value = false
        }
    })

    useEffect(() => {
        opened.value = props.opened || false
        form.reset()
    }, [props.opened]);

    useSignalEffect(() => {
        if (!opened.value && props.onClose) {
            props.onClose()
        }
    })

    return <Dialog opened={opened.value}
                   onOpenedChanged={(e) => opened.value = e.detail.value}
                   headerTitle="Add Customer"
                   footerRenderer={() => (
                       <>
                           <Button onClick={() => opened.value = false}>Cancel</Button>
                           <Button theme="primary" onClick={() => form.submit()}
                                   disabled={form.invalid || form.submitting}>Add</Button>
                       </>
                   )}>
        <CustomerForm form={form} editMode={true}/>
    </Dialog>
}