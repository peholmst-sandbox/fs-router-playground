import {Button, Grid, GridColumn} from "@vaadin/react-components";
import {useSignal} from "@vaadin/hilla-react-signals";
import ProductListItem from "Frontend/generated/org/example/fsrouterplayground/products/ProductListItem";
import {useEffect} from "react";
import {ProductService} from "Frontend/generated/endpoints";
import {Link, To, useNavigate, useParams} from "react-router-dom";
import View from "Frontend/components/View";
import ProductSidebar from "Frontend/views/products/{{productId}}/_ProductSidebar";

export default function ProductsView() {
    const navigate = useNavigate();
    const {productId, action} = useParams()

    const products = useSignal<ProductListItem[] | undefined>(undefined)
    const selectedProduct = useSignal<ProductListItem | undefined>(undefined);

    useEffect(() => {
        refreshGrid()
    }, []);

    useEffect(() => {
        if (products.value && productId) {
            const product = products.value.find(item => item.productId.toString() == productId)
            if (product) {
                selectedProduct.value = product
            } else {
                clearSelection()
            }
        } else {
            selectedProduct.value = undefined
        }
    }, [products.value, productId])

    function refreshGrid() {
        ProductService.list().then(result => products.value = result)
    }

    function selectProduct(product: ProductListItem) {
        navigate(createProductDetailsLocation(product))
    }

    function clearSelection() {
        console.log("Clearing selection")
        navigate("/products")
    }

    function editSelectedProduct() {
        if (selectedProduct.value) {
            navigate(createProductDetailsLocation(selectedProduct.value, true))
        }
    }

    function showSelectedProduct() {
        if (selectedProduct.value) {
            navigate(createProductDetailsLocation(selectedProduct.value, false))
        }
    }

    function refreshAndShowSelectedProduct() {
        refreshGrid()
        showSelectedProduct()
    }

    function createProductDetailsLocation(product: ProductListItem, editMode: boolean = false): To {
        if (editMode) {
            return `/products/${product.productId}/edit`
        } else {
            return `/products/${product.productId}`
        }
    }

    return (
        <View title="Product Catalog"
              actions={<Button theme="primary">Add Product</Button>}
              sidebar={<ProductSidebar product={selectedProduct.value}
                                       onClose={clearSelection}
                                       onEdit={editSelectedProduct}
                                       onDiscard={showSelectedProduct}
                                       onSave={refreshAndShowSelectedProduct}
                                       editMode={action == "edit"}/>}>
            <Grid items={products.value}
                  theme="no-border"
                  selectedItems={selectedProduct.value ? [selectedProduct.value] : []}
                  onActiveItemChanged={(e) => {
                      const item = e.detail.value
                      if (item) {
                          selectProduct(item)
                      } else {
                          clearSelection()
                      }
                  }}
            style={{height:"100%"}}>
                <GridColumn path="name" autoWidth flexGrow={1}>
                    {({item}) => <Link to={createProductDetailsLocation(item)}
                                       aria-label={`Show details of ${item.name}`}
                                       title={`Show details of ${item.name}`}>{item.name}</Link>}
                </GridColumn>
                <GridColumn path="sku" header={"SKU"} autoWidth/>
                <GridColumn path="manufacturer"/>
                <GridColumn path="retailPrice.amount" header={"Retail Price"}/>
                <GridColumn path="retailPrice.currency.code" header={"Currency"}/>
                <GridColumn path="vatRate.name" header={"VAT Rate"}/>
            </Grid>
        </View>
    )
}