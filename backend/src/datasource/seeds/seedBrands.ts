import { Brand } from "../../entities/BrandEntitie";

export async function seedBrands() {
    const brandsData = [
        "Lustucru", "Bonduelle", "Herta", "La Laitière", "Danone", "Nestlé",
        "Yoplait", "Coca-Cola", "Pepsi", "Kellogg's", "Unilever", "Mars",
        "Haribo", "Milka", "Lindt", "Nutella", "Mondelez", "Oreo",
        "Lipton", "Twix", "Kinder", "Raffaello", "Lay's", "Pringles",
        "Ben & Jerry's", "Magnum", "Starbucks", "Fanta", "Sprite", "Evian",
        "Vittel", "Perrier", "Volvic", "Heineken", "Carlsberg", "Kronenbourg",
        "Budweiser", "Ricard", "Martini", "Chivas Regal", "Moët & Chandon",
        "Panzani", "Barilla", "Findus", "McCain", "Tipiak", "Jacquet", "Pasquier",
        "Bonne Maman", "Andros", "Brossard", "Saint Michel", "Belin", "Lu"
    ];
    for (const name of brandsData) {
        const existingBrand = await Brand.findOneBy({ name });
        if (!existingBrand) {
            const brand = new Brand();
            brand.name = name;
            await brand.save();
        }
    }
}
