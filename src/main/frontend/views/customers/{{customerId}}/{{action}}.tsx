import {Link, To, useNavigate, useParams} from "react-router-dom";
import {useSignal} from "@vaadin/hilla-react-signals";
import CustomerListItem from "Frontend/generated/org/example/fsrouterplayground/customers/CustomerListItem";
import {useEffect} from "react";
import {CustomerService} from "Frontend/generated/endpoints";
import View from "Frontend/components/View";
import {Button, Grid, GridColumn} from "@vaadin/react-components";
import CustomerSidebar from "Frontend/views/customers/{{customerId}}/_CustomerSidebar";
import AddCustomerDialog from "Frontend/views/customers/{{customerId}}/_AddCustomerDialog";

export default function CustomersView() {
    const navigate = useNavigate()
    const {customerId, action} = useParams()

    const customers = useSignal<CustomerListItem[] | undefined>(undefined)
    const selectedCustomer = useSignal<CustomerListItem | undefined>(undefined)
    const addCustomerDialogOpened = useSignal<boolean>(false)

    useEffect(() => {
        refreshGrid()
    }, []);

    useEffect(() => {
        if (customers.value && customerId) {
            const customer = customers.value.find(item => item.customerId.toString() == customerId)
            if (customer) {
                selectedCustomer.value = customer
            } else {
                clearSelection()
            }
        } else {
            selectedCustomer.value = undefined
        }
    }, [customers.value, customerId]);

    function refreshGrid() {
        CustomerService.list().then(result => customers.value = result)
    }

    function selectCustomer(customer: CustomerListItem) {
        navigate(createCustomerDetailsLocation(customer))
    }

    function clearSelection() {
        navigate("/customers")
    }

    function editSelectedCustomer() {
        if (selectedCustomer.value) {
            navigate(createCustomerDetailsLocation(selectedCustomer.value, true))
        }
    }

    function showSelectedCustomer() {
        if (selectedCustomer.value) {
            navigate(createCustomerDetailsLocation(selectedCustomer.value, false))
        }
    }

    function refreshAndShowSelectedCustomer() {
        refreshGrid()
        showSelectedCustomer()
    }

    function openAddCustomerDialog() {
        addCustomerDialogOpened.value = true
    }

    function createCustomerDetailsLocation(customer: CustomerListItem, editMode: boolean = false): To {
        if (editMode) {
            return `/customers/${customer.customerId}/edit`
        } else {
            return `/customers/${customer.customerId}`
        }
    }

    return <View title="Customers"
                 actions={<Button theme="primary" onClick={openAddCustomerDialog}>Add Customer</Button>}
                 sidebar={<CustomerSidebar customer={selectedCustomer.value}
                                           onClose={clearSelection}
                                           onEdit={editSelectedCustomer}
                                           onDiscard={showSelectedCustomer}
                                           onSave={refreshAndShowSelectedCustomer}
                                           editMode={action == "edit"}/>}>
        <Grid items={customers.value}
              theme="no-border"
              selectedItems={selectedCustomer.value ? [selectedCustomer.value] : []}
              onActiveItemChanged={e => {
                  const item = e.detail.value
                  if (item) {
                      selectCustomer(item)
                  } else {
                      clearSelection()
                  }
              }}
              style={{height: "100%"}}>
            <GridColumn path="name" autoWidth flexGrow={1}>
                {({item}) => <Link to={createCustomerDetailsLocation(item)}
                                 aria-lavel={`Show details of ${item.name}`}
                                   title={`Show details of ${item.name}`}>{item.name}</Link>}
            </GridColumn>
            <GridColumn path="email"/>
            <GridColumn path="phone"/>
            <GridColumn path="notes" flexGrow={1}/>
        </Grid>
        <AddCustomerDialog opened={addCustomerDialogOpened.value}
                           onClose={() => addCustomerDialogOpened.value = false}
                           onAdd={refreshGrid}/>
    </View>
}