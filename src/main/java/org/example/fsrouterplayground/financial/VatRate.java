package org.example.fsrouterplayground.financial;

import java.math.BigDecimal;

public record VatRate(String code, String name, BigDecimal percentage) {

    public static final VatRate VAT24 = new VatRate("VAT24", "General 24%", new BigDecimal("0.24"));
    public static final VatRate VAT14 = new VatRate("VAT14", "Reduced 14%", new BigDecimal("0.14"));
    public static final VatRate VAT10 = new VatRate("VAT10", "Reduced 10%", new BigDecimal("0.10"));
    public static final VatRate VAT0 = new VatRate("VAT0", "Zero", BigDecimal.ZERO);
}
