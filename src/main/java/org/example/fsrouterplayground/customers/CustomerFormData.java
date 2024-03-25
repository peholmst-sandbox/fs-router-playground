package org.example.fsrouterplayground.customers;

import com.vaadin.hilla.Nonnull;
import org.example.fsrouterplayground.postal.PostalAddress;

public record CustomerFormData(
        String name,
        String email,
        String phone,
         PostalAddress defaultBillingAddress,
         PostalAddress defaultShippingAddress,
        String notes
) {
}
