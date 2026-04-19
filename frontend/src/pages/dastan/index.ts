// Dastan Salah Hawrami



import { hentAllRoom, oppdaterRoom, opprettRoom, slettRoom} from "./request";



async function visRom(){
    const liste = document.getElementById("rom-liste") as HTMLElement
    liste.innerHTML ="";
    const alleRom = await hentAllRoom(); //*READ//*

for (const rom of alleRom){
liste.innerHTML += "<p>" + rom.name + "</p>";
liste.innerHTML += "<p>" + rom.description + "</p>";
liste.innerHTML += "<p>" + rom.pricePrNight +  "kr Per natt</p>";
liste.innerHTML += "<button id= 'slett-" + rom.id + "'>Slett</button>";
liste.innerHTML += "<button id='rediger-" + rom.id + "'>Rediger</button>";
liste.innerHTML += "<hr>";   
}

for (const rom of alleRom){
    const knapp = document.getElementById("slett-" + rom.id);
    knapp?.addEventListener("click" , async() => {
        await slettRoom(rom.id);  //* DELETE//*
        visRom();
    });
}
for (const rom of alleRom){
    const redigerKnapp = document.getElementById("rediger-" + rom.id);
    redigerKnapp?.addEventListener("click" , async() => {
        const nyttNavn = prompt("Nytt navn:" , rom.name);
        const nyBeskrivelse = prompt ("Ny beskrivelse:" , rom.description);
        const nyPrice = prompt ("Ny pris:" , String(rom.pricePrNight));
        await oppdaterRoom(rom.id , { //*UPDATE//*
        name: nyttNavn!,
        description: nyBeskrivelse!,
        pricePrNight:Number(nyPrice)
        });
        visRom();
    });
}

}
document.getElementById("vis-rom-knapp")?.addEventListener("click" , visRom);


document.getElementById("opprett-knapp")?.addEventListener("click" , async() => {
    const navn = prompt ("Navn på rom:");
    const beskrivelse = prompt ("Beskrivelse:");
    const pris =prompt ("Pris per natt:");

    await opprettRoom({
    name: navn!,
    description: beskrivelse!,
    pricePrNight: Number(pris)
    });

    visRom();

});





