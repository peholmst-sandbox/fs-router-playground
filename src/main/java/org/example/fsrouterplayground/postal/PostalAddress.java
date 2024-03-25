package org.example.fsrouterplayground.postal;

public record PostalAddress(String line1,
                            String line2,
                            String zipOrPostalCode,
                            String cityOrPostOffice,
                            String state,
                            String country) {
}
