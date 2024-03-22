package org.example.fsrouterplayground.financial;

import java.math.BigDecimal;
import java.math.RoundingMode;

public record Price(BigDecimal amount, Currency currency) {

    public static Price of(int amount, Currency currency) {
        return new Price(new BigDecimal(amount).setScale(currency.decimalPlaces(), RoundingMode.UNNECESSARY), currency);
    }
}
