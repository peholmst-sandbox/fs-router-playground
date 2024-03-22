import {Grid, GridColumn} from "@vaadin/react-components";
import {useSignal, useSignalEffect} from "@vaadin/hilla-react-signals";
import ProductListItem from "Frontend/generated/org/example/fsrouterplayground/products/ProductListItem";
import {useEffect} from "react";
import {ProductService} from "Frontend/generated/endpoints";
import {Link, To, useNavigate, useParams} from "react-router-dom";
import View from "Frontend/components/View";
import ProductSidebar from "Frontend/views/products/{{productId}}/_ProductSidebar";

export default function ProductsView() {
    const navigate = useNavigate();
    const {productId, action} = useParams()

    const products = useSignal<ProductListItem[]>([])
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
        <View>
            <Grid items={products.value}
                  className="content"
                  theme="no-border"
                  selectedItems={selectedProduct.value ? [selectedProduct.value] : []}
                  onActiveItemChanged={(e) => {
                      const item = e.detail.value
                      if (item) {
                          selectProduct(item)
                      } else {
                          clearSelection()
                      }
                  }}>
                <GridColumn path="name" autoWidth flexGrow={1}>
                    {({item}) => <Link to={createProductDetailsLocation(item)} aria-label={`Show details of ${item.name}`} title={`Show details of ${item.name}`}>{item.name}</Link>}
                </GridColumn>
                <GridColumn path="sku" header={"SKU"}/>
                <GridColumn path="manufacturer" autoWidth flexGrow={1}/>
                <GridColumn path="retailPrice.amount" header={"Retail Price"}/>
                <GridColumn path="retailPrice.currency.code" header={"Currency"}/>
                <GridColumn path="vatRate.name" header={"VAT Rate"}/>
            </Grid>
            <ProductSidebar product={selectedProduct.value}
                            onClose={clearSelection}
                            onEdit={editSelectedProduct}
                            onDiscard={showSelectedProduct}
                            onSave={refreshAndShowSelectedProduct}
                            editMode={action == "edit"}/>
        </View>
    )
}