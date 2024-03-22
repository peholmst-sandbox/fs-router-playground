package org.example.fsrouterplayground.products;

import org.example.fsrouterplayground.financial.Price;
import org.example.fsrouterplayground.financial.VatRate;

public record ProductListItem(Long productId, String name, String manufacturer, String sku, Price retailPrice,
                              VatRate vatRate) {
}
