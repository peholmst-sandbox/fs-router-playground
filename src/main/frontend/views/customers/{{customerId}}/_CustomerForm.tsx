import {Details, FormLayout, HorizontalLayout, TextArea, TextField} from "@vaadin/react-components";
import {UseFormResult} from "@vaadin/hilla-react-form";
import CustomerFormDataModel from "Frontend/generated/org/example/fsrouterplayground/customers/CustomerFormDataModel";

export type CustomerFormProps = {
    form: UseFormResult<CustomerFormDataModel>,
    editMode?: boolean
}

export default function CustomerForm(props: CustomerFormProps) {
    const field = props.form.field
    const model = props.form.model

    return <FormLayout style={{maxWidth: "40em"}}>
        <TextField label="Customer Name" {...field(model.name)} readonly={!props.editMode}
                   hidden={!props.editMode} data-colspan={2}></TextField>
        <TextField label="Email" {...field(model.email)} readonly={!props.editMode}></TextField>
        <TextField label="Phone" {...field(model.phone)} readonly={!props.editMode}></TextField>
        <Details summary="Default Billing Address" data-colspan={2}>
            <TextField {...field(model.defaultBillingAddress.line1)} readonly={!props.editMode}
                       placeholder="Address line 1" style={{width: "100%"}}></TextField>
            <TextField {...field(model.defaultBillingAddress.line2)} readonly={!props.editMode}
                       placeholder="Address line 2" style={{width: "100%"}}></TextField>
            <HorizontalLayout theme="spacing-xs">
                <TextField {...field(model.defaultBillingAddress.zipOrPostalCode)} readonly={!props.editMode}
                           placeholder="Zip/Post code" style={{width: "9em"}}></TextField>
                <TextField {...field(model.defaultBillingAddress.cityOrPostOffice)} readonly={!props.editMode}
                           placeholder="City/Post office" style={{width: "100%"}}></TextField>
            </HorizontalLayout>
            <TextField {...field(model.defaultBillingAddress.state)} readonly={!props.editMode} placeholder="State"
                       style={{width: "100%"}}></TextField>
            <TextField {...field(model.defaultBillingAddress.country)} readonly={!props.editMode} placeholder="Country"
                       style={{width: "100%"}}></TextField>
        </Details>
        <Details summary="Default Shipping Address" data-colspan={2}>
            <TextField {...field(model.defaultShippingAddress.line1)} readonly={!props.editMode}
                       placeholder="Address line 1" style={{width: "100%"}}></TextField>
            <TextField {...field(model.defaultShippingAddress.line2)} readonly={!props.editMode}
                       placeholder="Address line 2" style={{width: "100%"}}></TextField>
            <HorizontalLayout theme="spacing-xs">
                <TextField {...field(model.defaultShippingAddress.zipOrPostalCode)} readonly={!props.editMode}
                           placeholder="Zip/Post code" style={{width: "9em"}}></TextField>
                <TextField {...field(model.defaultShippingAddress.cityOrPostOffice)} readonly={!props.editMode}
                           placeholder="City/Post office" style={{width: "100%"}}></TextField>
            </HorizontalLayout>
            <TextField {...field(model.defaultShippingAddress.state)} readonly={!props.editMode} placeholder="State"
                       style={{width: "100%"}}></TextField>
            <TextField {...field(model.defaultShippingAddress.country)} readonly={!props.editMode} placeholder="Country"
                       style={{width: "100%"}}></TextField>
        </Details>

        <TextArea label="Notes" {...field(model.notes)} readonly={!props.editMode} data-colspan={2}></TextArea>
    </FormLayout>
}