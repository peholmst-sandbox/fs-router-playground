package org.example.fsrouterplayground.financial;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class CurrencyService {

    public List<Currency> list() {
        return List.of(Currency.EUR, Currency.USD, Currency.GBP, Currency.JPY);
    }
}
