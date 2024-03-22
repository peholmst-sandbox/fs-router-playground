package org.example.fsrouterplayground.financial;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class VatRateService {

    public List<VatRate> list() {
        return List.of(VatRate.VAT24, VatRate.VAT14, VatRate.VAT10, VatRate.VAT0);
    }
}
