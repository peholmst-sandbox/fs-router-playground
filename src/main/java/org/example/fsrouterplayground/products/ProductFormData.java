package org.example.fsrouterplayground.products;

import org.example.fsrouterplayground.financial.Currency;
import org.example.fsrouterplayground.financial.VatRate;

import java.math.BigDecimal;

public record ProductFormData(String name, String manufacturer, String sku, BigDecimal retailPrice, Currency currency, VatRate vatRate) {
}
