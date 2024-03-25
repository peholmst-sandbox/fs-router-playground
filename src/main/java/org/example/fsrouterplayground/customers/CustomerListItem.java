package org.example.fsrouterplayground.customers;

public record CustomerListItem(
        Long customerId,
        String name,
        String email,
        String phone,
        String notes
) {
}
