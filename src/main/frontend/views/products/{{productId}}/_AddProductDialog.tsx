import {Button, Dialog} from "@vaadin/react-components";
import {useForm} from "@vaadin/hilla-react-form";
import ProductFormDataModel from "Frontend/generated/org/example/fsrouterplayground/products/ProductFormDataModel";
import ProductForm from "Frontend/views/products/{{productId}}/_ProductForm";
import {ProductService} from "Frontend/generated/endpoints";
import {useSignal, useSignalEffect} from "@vaadin/hilla-react-signals";
import {useEffect} from "react";

export type AddProductDialogProps = {
    opened?: boolean
    onClose?: () => void
    onAdd?: () => void
}

export default function AddProductDialog(props: AddProductDialogProps) {
    const opened = useSignal<boolean>(props.opened || false)

    const form = useForm(ProductFormDataModel, {
        onSubmit: async (productData) => {
            await ProductService.add(productData)
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
                   headerTitle="Add Product"
                   footerRenderer={() => (
                       <>
                           <Button onClick={() => opened.value = false}>Cancel</Button>
                           <Button theme="primary" onClick={() => form.submit()} disabled={form.invalid || form.submitting}>Add</Button>
                       </>
                   )}>
        <ProductForm form={form} editMode={true}/>
    </Dialog>
}
