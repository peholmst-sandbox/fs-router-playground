package org.example.fsrouterplayground.products;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.example.fsrouterplayground.financial.Currency;
import org.example.fsrouterplayground.financial.Price;
import org.example.fsrouterplayground.financial.VatRate;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@BrowserCallable
@AnonymousAllowed
public class ProductService {

    private final List<ProductListItem> items = new ArrayList<>(List.of(
            new ProductListItem(1L, "QuantumCool Air Conditioner", "FutureHome Innovations", "FHAC-0924-QC", Price.of(100, Currency.EUR), VatRate.VAT24),
            new ProductListItem(2L, "ZenBrew Coffee Maker", "AromaTech Appliances", "ATCB-0312-ZB", Price.of(150, Currency.EUR), VatRate.VAT24),
            new ProductListItem(3L, "SolarFlare Portable Charger", "SunPower Gadgets", "SPGC-0785-SF", Price.of(40, Currency.EUR), VatRate.VAT24),
            new ProductListItem(4L, "EchoStream Bluetooth Speaker", "SoundWave Electronics", "SWBS-0468-ES", Price.of(90, Currency.EUR), VatRate.VAT24),
            new ProductListItem(5L, "OrbitGlide Hoverboard", "GravityRide Sports", "GRHB-0564-OG", Price.of(150, Currency.EUR), VatRate.VAT24),
            new ProductListItem(6L, "BioLume Smart Bulb", "LuminTech Lighting", "LTLB-0920-BL", Price.of(10, Currency.EUR), VatRate.VAT24),
            new ProductListItem(7L, "AquaPure Smart Water Bottle", "HydrateWell Solutions", "HWSB-0384-AP", Price.of(8, Currency.EUR), VatRate.VAT24),
            new ProductListItem(8L, "InfinityView Drone", "SkyBound Technologies", "SBTD-0674-IV", Price.of(1999, Currency.EUR), VatRate.VAT24),
            new ProductListItem(9L, "NeoCook Precision Cooker", "CulinaryTech Kitchenware", "CTKC-0812-NC", Price.of(99, Currency.EUR), VatRate.VAT24),
            new ProductListItem(10L, "VirtualFit Mirror", "ReflectFit Innovations", "RFIN-0555-VF", Price.of(49, Currency.EUR), VatRate.VAT24),
            new ProductListItem(11L, "PureBreathe Air Purifier", "CleanAir Systems", "CASP-0345-PB", Price.of(89, Currency.EUR), VatRate.VAT24),
            new ProductListItem(12L, "SmartShade Window Tint", "VistaTech Home Solutions", "VTHS-0799-SS", Price.of(45, Currency.EUR), VatRate.VAT24),
            new ProductListItem(13L, "PhantomSound Wireless Earbuds", "AudioPhantom Electronics", "APEB-0247-PS", Price.of(120, Currency.EUR), VatRate.VAT24),
            new ProductListItem(14L, "FlashCharge Solar Backpack", "EcoGear Travel", "EGTS-0633-FC", Price.of(200, Currency.EUR), VatRate.VAT24),
            new ProductListItem(15L, "IntelliLock Smart Padlock", "SecureTech Accessories", "STA-0998-IL", Price.of(50, Currency.EUR), VatRate.VAT24),
            new ProductListItem(16L, "DreamWeaver Smart Mattress", "SleepInnovate Bedding", "SIBD-0886-DW", Price.of(399, Currency.EUR), VatRate.VAT24),
            new ProductListItem(17L, "RapidBrew Tea Infuser", "BrewMaster Kitchen Appliances", "BMKA-0542-RB", Price.of(15, Currency.EUR), VatRate.VAT24),
            new ProductListItem(18L, "GlowTrack Fitness Band", "ActiveLife Wearables", "ALWF-0721-GT", Price.of(8, Currency.EUR), VatRate.VAT24),
            new ProductListItem(19L, "PixelArt Digital Frame", "MemoryCanvas Tech", "MCTF-0893-PA", Price.of(39, Currency.EUR), VatRate.VAT24),
            new ProductListItem(20L, "TerraGrow Smart Planter", "GreenThumb Indoor Gardening", "GTIG-0650-TG", Price.of(79, Currency.EUR), VatRate.VAT24)
    ));

    public synchronized List<ProductListItem> list() {
        return items.stream().sorted(Comparator.comparing(ProductListItem::name)).toList();
    }

    public synchronized Optional<ExistingProductForm> get(Long productId) {
        return items.stream()
                .filter(item -> item.productId().equals(productId))
                .findFirst()
                .map(item -> new ExistingProductForm(
                        item.productId(),
                        new ProductFormData(
                                item.name(),
                                item.manufacturer(),
                                item.sku(),
                                item.retailPrice().amount(),
                                item.retailPrice().currency(),
                                item.vatRate()
                        )
                ));
    }

    public synchronized void save(ExistingProductForm existingProductForm) {
        items.removeIf(item -> item.productId().equals(existingProductForm.productId()));
        items.add(new ProductListItem(
                existingProductForm.productId(),
                existingProductForm.data().name(),
                existingProductForm.data().manufacturer(),
                existingProductForm.data().sku(),
                new Price(existingProductForm.data().retailPrice(), existingProductForm.data().currency()),
                existingProductForm.data().vatRate()
        ));
    }
}
