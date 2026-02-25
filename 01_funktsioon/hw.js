//Kehamassiindeksi kalkulaator/BMI calculator
function arvutaKMI(kehakaal, pikkuscm) {
    //arvuta kmi
    var pikkus = pikkuscm / 100;
    //teisendab cm -> m
    var kmi = kehakaal / (pikkus * pikkus);
    var kategooria;
    if (kmi < 18.5)
        kategooria = "alakaal/overweight";
    else if (kmi < 25)
        kategooria = "normaalkaal/normalweight";
    else if (kmi < 30)
        kategooria = "ülekaal/overweight";
    else
        kategooria = "rasvumine/obesity";
    //tagastab väärtuse
    return { kmi: kmi, kategooria: kategooria };
}
//prooviandmed
var samples = [
    { kg: 50, pikkuscm: 170 },
    { kg: 68, pikkuscm: 172 },
    { kg: 85, pikkuscm: 175 },
    { kg: 90, pikkuscm: 185 },
    { kg: 120, pikkuscm: 185 }
];
for (var _i = 0, samples_1 = samples; _i < samples_1.length; _i++) {
    var s = samples_1[_i];
    var result = arvutaKMI(s.kg, s.pikkuscm);
    //toFixed võtab max 2 kohta peale koma
    console.log("".concat(s.kg, "kg ja ").concat(s.pikkuscm, "cm -> Kehamassiindeks = ").concat(result.kmi.toFixed(2), " (").concat(result.kategooria, ")"));
}

