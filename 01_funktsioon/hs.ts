//Kehamassiindeksi kalkulaator/BMI calculator

type kategooria = "alakaal/overweight" | "normaalkaal/normalweight" | "ülekaal/overweight" | "rasvumine/obesity";

type KMItulemus = {
    kmi: number;
    kategooria: kategooria;
};

function arvutaKMI(kehakaal: number, pikkuscm: number): KMItulemus {
    //arvuta kmi
    const pikkus = pikkuscm / 100;

    //teisendab cm -> m
    const kmi = kehakaal / (pikkus * pikkus);

    let kategooria: kategooria;

    if (kmi < 18.5) kategooria = "alakaal/overweight";
    else if (kmi < 25) kategooria = "normaalkaal/normalweight";
    else if (kmi < 30) kategooria = "ülekaal/overweight";
    else kategooria = "rasvumine/obesity";

    //tagastab väärtuse
    return { kmi, kategooria };
}


//prooviandmed
const samples = [
    { kg: 50, pikkuscm: 170 },
    { kg: 68, pikkuscm: 172 },
    { kg: 85, pikkuscm: 175 },
    { kg: 90, pikkuscm: 185 },
    { kg: 120, pikkuscm: 185 }
];

for (const s of samples) {

    const result = arvutaKMI(s.kg, s.pikkuscm);

    //toFixed võtab max 2 kohta peale koma
    console.log(
        `${s.kg}kg ja ${s.pikkuscm}cm -> Kehamassiindeks = ${result.kmi.toFixed(2)} (${result.kategooria})`
  );

}
