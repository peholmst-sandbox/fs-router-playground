package org.example.fsrouterplayground.customers;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.example.fsrouterplayground.postal.PostalAddress;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@BrowserCallable
@AnonymousAllowed
public class CustomerService {

    private final AtomicLong nextId = new AtomicLong(1L);

    private final Map<Long, CustomerFormData> customers = new HashMap<>();

    CustomerService() {
        add(new CustomerFormData("Joe Cool", "joe.cool@example.com", "555-1234",
                new PostalAddress("123 Main St", "Apt 4", "12345", "Anytown", "CA", "USA"),
                new PostalAddress("456 Elm St", "Suite 8", "67890", "Otherville", "NY", "USA"),
                "Prefers email communication."));
        add(new CustomerFormData("John Doe", "johndoe@email.com", "123-456-7890",
                new PostalAddress("123 Elm Street", "Apt 2", "12345", "Springfield", "Illinois", "USA"),
                new PostalAddress("124 Elm Street", "Apt 3", "12345", "Springfield", "Illinois", "USA"),
                "Prefers email communication."));
        add(new CustomerFormData("Jane Smith", "janesmith@email.com", "987-654-3210",
                new PostalAddress("456 Pine Road", "Suite 5", "67890", "Laketown", "Washington", "USA"),
                new PostalAddress("457 Pine Road", "Suite 6", "67891", "Laketown Mail Center", "Washington", "USA"),
                "Inquires about eco-friendly products."));
        add(new CustomerFormData("Alex Johnson", "alexj@email.com", "555-666-7777",
                new PostalAddress("789 Maple Avenue", "", "101112", "Rivertown Post Office", "California", "USA"),
                new PostalAddress("790 Maple Avenue", "", "101113", "Rivertown Post Office", "California", "USA"),
                "Interested in subscription services."));
        add(new CustomerFormData("Sam Lee", "samlee@email.com", "212-213-2145",
                new PostalAddress("123 Broadway", "", "10001", "New York", "New York", "USA"),
                new PostalAddress("124 Broadway", "", "10002", "New York", "New York", "USA"),
                "Seeks information about return policy."));
        add(new CustomerFormData("Chris Green", "chrisg@email.com", "323-424-5256",
                new PostalAddress("321 Oak Street", "", "303132", "Greenwood", "Oregon", "USA"),
                new PostalAddress("322 Oak Street", "", "303133", "Greenwood", "Oregon", "USA"),
                "Asks for customization options."));
        add(new CustomerFormData("Pat Kim", "patk@email.com", "404-505-6067",
                new PostalAddress("213 Willow Lane", "", "414243", "Brookdale", "Colorado", "USA"),
                new PostalAddress("214 Willow Lane", "", "414244", "Brookdale", "Colorado", "USA"),
                "Looking for bulk purchase discounts."));
        add(new CustomerFormData("Taylor Morgan", "taylorm@email.com", "515-626-7378",
                new PostalAddress("654 Birch Street", "", "525354", "Hilltop", "Utah", "USA"),
                new PostalAddress("655 Birch Street", "", "525355", "Hilltop ", "Utah", "USA"),
                "Wants newsletter subscription."));
        add(new CustomerFormData("Jamie Fox", "jamief@email.com", "616-727-8389",
                new PostalAddress("987 Cedar Ave", "", "636465", "Sunnyside", "Arizona", "USA"),
                new PostalAddress("988 Cedar Ave", "", "636466", "Sunnyside", "Arizona", "USA"),
                "Inquires about warranty periods."));
        add(new CustomerFormData("Casey White", "caseyw@email.com", "717-828-9390",
                new PostalAddress("369 Diamond Road", "", "747576", "Diamond City", "Nevada", "USA"),
                new PostalAddress("370 Diamond Road", "", "747577", "Diamond City", "Nevada", "USA"),
                "Questions on product availability."));
        add(new CustomerFormData("John Doe", "johndoe@example.com", "555-1234",
                new PostalAddress("123 Main St", "Apt 101", "12345", "Metro City", "Metro State", "CountryA"),
                new PostalAddress("124 Main St", "Apt 102", "12345", "Metro City", "Metro State", "CountryA"),
                "Prefers texts for communication."));
        add(new CustomerFormData("Emma Stone", "emmastone@example.com", "555-5678",
                new PostalAddress("456 Oak St", "", "67890", "Lakeview", "Lake State", "CountryB"),
                new PostalAddress("457 Oak St", "", "67890", "Lakeview", "Lake State", "CountryB"),
                "Inquires about bulk orders."));
        add(new CustomerFormData("Olivia Jones", "oliviaj@example.com", "555-9101",
                new PostalAddress("789 Pine Rd", "Suite 5", "101112", "Rivertown", "River State", "CountryC"),
                new PostalAddress("790 Pine Rd", "Suite 6", "101112", "Rivertown", "River State", "CountryC"),
                "Interested in eco-friendly packaging."));
        add(new CustomerFormData("Noah Smith", "noahsmith@example.com", "555-1213",
                new PostalAddress("321 Birch Ln", "", "131415", "Hilltop", "Hill State", "CountryD"),
                new PostalAddress("322 Birch Ln", "", "131415", "Hilltop", "Hill State", "CountryD"),
                "Seeks warranty information."));
        add(new CustomerFormData("Sophia Johnson", "sophiaj@example.com", "555-1415",
                new PostalAddress("654 Maple Ave", "Floor 2", "161718", "Sunnyvale", "Sunny State", "CountryE"),
                new PostalAddress("655 Maple Ave", "Floor 3", "161718", "Sunnyvale", "Sunny State", "CountryE"),
                "Questions about return policies."));
        add(new CustomerFormData("Liam Williams", "liamw@example.com", "555-1617",
                new PostalAddress("987 Cedar St", "", "192021", "Greendale", "Green State", "CountryF"),
                new PostalAddress("988 Cedar St", "", "192021", "Greendale", "Green State", "CountryF"),
                "Interested in the latest product updates."));
        add(new CustomerFormData("Isabella Brown", "isabellab@example.com", "555-1819",
                new PostalAddress("123 Willow Way", "", "222324", "Brookside", "Brook State", "CountryG"),
                new PostalAddress("124 Willow Way", "", "222324", "Brookside", "Brook State", "CountryG"),
                "Looks for discount codes."));
        add(new CustomerFormData("Ethan Davis", "ethand@example.com", "555-2021",
                new PostalAddress("456 Elm St", "Top Floor", "252627", "Cloudtown", "Cloud State", "CountryH"),
                new PostalAddress("457 Elm St", "Top Floor", "252627", "Cloudtown", "Cloud State", "CountryH"),
                "Wants to know about international shipping."));
        add(new CustomerFormData("Mia Wilson", "miaw@example.com", "555-2223",
                new PostalAddress("789 Spruce Cir", "", "282930", "Windmill", "Wind State", "CountryI"),
                new PostalAddress("790 Spruce Cir", "", "282930", "Windmill", "Wind State", "CountryI"),
                "Asks for customization options."));
        add(new CustomerFormData("Lucas Martinez", "lucasm@example.com", "555-2425",
                new PostalAddress("321 Poplar Blvd", "Unit 7", "313233", "Eastwood", "East State", "CountryJ"),
                new PostalAddress("322 Poplar Blvd", "Unit 8", "313233", "Eastwood", "East State", "CountryJ"),
                "Inquires about loyalty programs."));
    }


    public synchronized List<CustomerListItem> list() {
        return customers.entrySet()
                .stream()
                .map(entry -> new CustomerListItem(entry.getKey(), entry.getValue().name(), entry.getValue().email(), entry.getValue().phone(), entry.getValue().notes()))
                .sorted(Comparator.comparing(CustomerListItem::name))
                .toList();
    }

    public synchronized Optional<ExistingCustomerForm> get(Long customerId) {
        return Optional.ofNullable(customers.get(customerId))
                .map(customerFormData -> new ExistingCustomerForm(customerId, customerFormData));
    }

    public synchronized void update(ExistingCustomerForm existingCustomerForm) {
        customers.put(existingCustomerForm.customerId(), existingCustomerForm.data());
    }

    public synchronized Long add(CustomerFormData customerFormData) {
        var customerId = nextId.getAndIncrement();
        customers.put(customerId, customerFormData);
        return customerId;
    }
}
