import {ComboBox, FormLayout, NumberField, TextField} from "@vaadin/react-components";
import {useSignal} from "@vaadin/hilla-react-signals";
import Currency from "Frontend/generated/org/example/fsrouterplayground/financial/Currency";
import VatRate from "Frontend/generated/org/example/fsrouterplayground/financial/VatRate";
import {useEffect} from "react";
import {CurrencyService, VatRateService} from "Frontend/generated/endpoints";
import {UseFormResult} from "@vaadin/hilla-react-form";
import ProductFormDataModel from "Frontend/generated/org/example/fsrouterplayground/products/ProductFormDataModel";

export type ProductFormProps = {
    form: UseFormResult<ProductFormDataModel>
    editMode?: boolean
}

export default function ProductForm(props: ProductFormProps) {
    const currencies = useSignal<Currency[]>([])
    const vatRates = useSignal<VatRate[]>([])
    const field = props.form.field
    const model = props.form.model

    useEffect(() => {
        CurrencyService.list().then(result => currencies.value = result)
        VatRateService.list().then(result => vatRates.value = result)
    }, []);

    return <FormLayout>
        <TextField label="Product Name" {...field(model.name)} readonly={!props.editMode} hidden={!props.editMode}></TextField>
        <TextField label="Manufacturer" {...field(model.manufacturer)} readonly={!props.editMode}></TextField>
        <TextField label="SKU" {...field(model.sku)} readonly={!props.editMode}></TextField>
        <NumberField label="Retail Price" {...field(model.retailPrice)} readonly={!props.editMode}></NumberField>
        <ComboBox label="Currency" items={currencies.value} itemLabelPath="code" itemIdPath="code" {...field(model.currency)} readonly={!props.editMode}></ComboBox>
        <ComboBox label="VAT Rate" items={vatRates.value} itemLabelPath="name" itemIdPath="code" {...field(model.vatRate)} readonly={!props.editMode}></ComboBox>
    </FormLayout>
}