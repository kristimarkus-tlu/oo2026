//Coffee maschine

class CoffeeMachine {
    //palju vett masinas
    private waterMl: number;
    //palju kohviube masinas
    private beansG: number;
    //kui palju raha masin on teeninud
    private cashCents: number;
    //private tähendab neid saab muuta ainult klass ise

constructor(public readonly name: string, waterMl: number, beansG: number) {
    this.waterMl = waterMl;
    this.beansG = beansG;
    this.cashCents = 0;
}

//lisab vett
addWater(ml: number) {

    
    if (ml <= 0) throw new Error("Vesi peab olema > 0");
    this.waterMl += ml;
}

//lisab kohviube
addBeans(g: number) {
    if (g <= 0) throw new Error("Oad peavad olema > 0");
    this.beansG += g;
}


makeCoffee(size: "small" | "large", paidCents: number) {
    //palju läheb suure/väikse kohvi jaoks ube ja mis on hind
    const recipe = size === "small"
    ? { water: 200, beans: 12, price: 150 }  // 1.50 €
    : { water: 350, beans: 20, price: 220 }; // 2.20 €

    //kontroll kas raha on piisavalt, kui puudu error
    if (paidCents < recipe.price) {
    const missing = recipe.price - paidCents;
    return { ok: false, message: `Puudu ${(missing / 100).toFixed(2)}€` };
    }

    //kontroll kas vett on piisavalt, ube on piisavalt
    if (this.waterMl < recipe.water) return { ok: false, message: "Vett pole piisavalt" };
    if (this.beansG < recipe.beans) return { ok: false, message: "Kohviube pole piisavalt" };

    // teeme kohvi: võtame ressursid maha
    this.waterMl -= recipe.water;
    this.beansG -= recipe.beans;

    // lisame raha kassasse
    this.cashCents += recipe.price;

    // arvutame tagastatava raha
    const changeCents = paidCents - recipe.price;

    return {
    ok: true,
    message: `Valmis ${size} kohv ☕`,
    changeEur: (changeCents / 100).toFixed(2)
    };
}

status() {
    return {
    name: this.name,
    waterMl: this.waterMl,
    beansG: this.beansG,
    cashEur: (this.cashCents / 100).toFixed(2)
    };
}
}

//office.addWater(500) lisab vett, office.addBeans lisab ube jne
//prooviandmed

const kitchen = new CoffeeMachine("Kitchen", 1000, 80);
const office = new CoffeeMachine("Office", 500, 30);

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
