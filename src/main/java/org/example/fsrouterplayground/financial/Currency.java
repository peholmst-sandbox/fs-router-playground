package org.example.fsrouterplayground.financial;

public record Currency(String code, String symbol, int decimalPlaces) {

    public static final Currency EUR = new Currency("EUR", "€", 2);
    public static final Currency USD = new Currency("USD", "$", 2);
    public static final Currency GBP = new Currency("GBP", "£", 2);
    public static final Currency JPY = new Currency("JPY", "¥", 0);
}
