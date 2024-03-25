import "@vaadin/vaadin-lumo-styles/vaadin-iconset.js";
import ProductListItem from "Frontend/generated/org/example/fsrouterplayground/products/ProductListItem";
import {Button, Icon} from "@vaadin/react-components";
import Sidebar from "Frontend/components/Sidebar";
import ProductForm from "Frontend/views/products/{{productId}}/_ProductForm";
import {useSignal, useSignalEffect} from "@vaadin/hilla-react-signals";
import ProductFormData from "Frontend/generated/org/example/fsrouterplayground/products/ProductFormData";
import {useEffect} from "react";
import {ProductService} from "Frontend/generated/endpoints";
import {useForm} from "@vaadin/hilla-react-form";
import ProductFormDataModel from "Frontend/generated/org/example/fsrouterplayground/products/ProductFormDataModel";

export type ProductSidebarProps = {
    product?: ProductListItem
    onClose?: () => void
    onEdit?: () => void
    onSave?: () => void
    onDiscard?: () => void
    editMode?: boolean
}

export default function ProductSidebar(props: ProductSidebarProps) {

    const productFormData = useSignal<ProductFormData | undefined>(undefined)
    const form = useForm(ProductFormDataModel, {
        onSubmit: async (productData) => {
            if (props.product) {
                await ProductService.update({productId: props.product.productId, data: productData})
                if (props.onSave) {
                    props.onSave()
                }
            }
        }
    })

    useEffect(() => {
        if (props.product) {
            ProductService.get(props.product.productId).then(result => productFormData.value = result?.data)
        }
    }, [props.product])

    useSignalEffect(() => {
        form.read(productFormData.value)
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

    // TODO Implement delete
    const footer = <>
        {props.editMode ||
            <Button theme="tertiary" onClick={handleEdit}><Icon icon="lumo:edit" slot="prefix"/> Edit</Button>}
        {props.editMode || <Button theme="tertiary error"><Icon icon="vaadin:trash" slot="prefix"/> Delete</Button>}
        {props.editMode && <Button theme="primary" onClick={handleSave} disabled={form.invalid || form.submitting}><Icon icon="lumo:checkmark" slot="prefix"/> Save</Button>}
        {props.editMode && <Button theme="tertiary" onClick={handleDiscard}><Icon icon="lumo:undo"/> Discard</Button>}
    </>
    return <Sidebar title={props.editMode ? "Edit " + form.value.name : form.value.name}
                    onClose={props.onClose} hidden={!props.product} footer={footer}>
        {productFormData.value && <ProductForm form={form} editMode={props.editMode}/>}
    </Sidebar>
}