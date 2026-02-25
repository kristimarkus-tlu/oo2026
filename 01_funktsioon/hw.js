var CoffeeMachine = /** @class */ (function () {
    function CoffeeMachine(name, waterMl, beansG) {
        this.name = name;
        this.waterMl = waterMl;
        this.beansG = beansG;
        this.cashCents = 0;
    }
    CoffeeMachine.prototype.addWater = function (ml) {
        if (ml <= 0)
            throw new Error("Vesi peab olema > 0");
        this.waterMl += ml;
    };
    CoffeeMachine.prototype.addBeans = function (g) {
        if (g <= 0)
            throw new Error("Oad peavad olema > 0");
        this.beansG += g;
    };
    CoffeeMachine.prototype.makeCoffee = function (size, paidCents) {
        var recipe = size === "small"
            ? { water: 200, beans: 12, price: 150 } // 1.50 €
            : { water: 350, beans: 20, price: 220 }; // 2.20 €
        if (paidCents < recipe.price) {
            var missing = recipe.price - paidCents;
            return { ok: false, message: "Puudu ".concat((missing / 100).toFixed(2), "\u20AC") };
        }
        if (this.waterMl < recipe.water)
            return { ok: false, message: "Vett pole piisavalt" };
        if (this.beansG < recipe.beans)
            return { ok: false, message: "Kohviube pole piisavalt" };
        // teeme kohvi: võtame ressursid maha
        this.waterMl -= recipe.water;
        this.beansG -= recipe.beans;
        // lisame raha kassasse
        this.cashCents += recipe.price;
        // arvutame tagastatava raha
        var changeCents = paidCents - recipe.price;
        return {
            ok: true,
            message: "Valmis ".concat(size, " kohv \u2615"),
            changeEur: (changeCents / 100).toFixed(2)
        };
    };
    CoffeeMachine.prototype.status = function () {
        return {
            name: this.name,
            waterMl: this.waterMl,
            beansG: this.beansG,
            cashEur: (this.cashCents / 100).toFixed(2)
        };
    };
    return CoffeeMachine;
}());

var kitchen = new CoffeeMachine("Kitchen", 1000, 80);
var office = new CoffeeMachine("Office", 500, 30);
console.log("Algseis:");
console.log(kitchen.status());
console.log(office.status());
console.log("\nKitchen teeb large, maksab 3.00€:");
console.log(kitchen.makeCoffee("large", 300));
console.log("Kitchen seis:", kitchen.status());
console.log("\nOffice proovib large, maksab 2.20€:");
console.log(office.makeCoffee("large", 220));
console.log("Office seis:", office.status());
console.log("\nOffice lisab vett + ube ja teeb small, maksab 1.00€ (liiga vähe):");
office.addWater(600);
office.addBeans(50);
console.log(office.makeCoffee("small", 100));
console.log("Office seis:", office.status());
console.log("\nTõestus: masinad on eraldi (kassad ja ressursid erinevad):");
console.log("Kitchen:", kitchen.status());
console.log("Office:", office.status());
