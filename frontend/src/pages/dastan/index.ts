// Dastan Salah Hawrami //



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
        const liste = document.getElementById("rom-liste") as HTMLElement
        liste.innerHTML += "<p><label >Nytt navn:</label></p>";
        liste.innerHTML += "<p><input id='nytt-navn' /></p>";
        liste.innerHTML += "<p><label >Ny beskrivelse:</label></p>";
        liste.innerHTML += "<p><input id='ny-beskrivelse' /></p>";
        liste.innerHTML += "<p><label >Ny pris per natt:</label></p>";
        liste.innerHTML += "<p><input type='number' id='ny-pris' /></p>";
        liste.innerHTML += "<p><button id='lagre-knapp' >Lagre</button></p>";
        const nameInput = (document.getElementById("nytt-navn") as HTMLInputElement);
        nameInput.value = rom.name;
        const descriptionInput = (document.getElementById("ny-beskrivelse") as HTMLInputElement);
        descriptionInput.value = rom.description;
        const priceInput = (document.getElementById("ny-pris") as HTMLInputElement);
        priceInput.value = rom.pricePrNight.toString();
        (document.getElementById("lagre-knapp"))?.addEventListener("click", async() => {
            await oppdaterRoom(rom.id , { //*UPDATE//*
                name: nameInput.value,
                description: descriptionInput.value,
                pricePrNight:Number(priceInput.value)
        });
        visRom();
        })
    });
}

}

document.getElementById("vis-rom-knapp")?.addEventListener("click" , visRom);
document.getElementById("opprett-knapp")?.addEventListener("click" , async() => {
    const liste = document.getElementById("rom-liste") as HTMLElement;
        liste.innerHTML += "<p><label >Navn på rom:</label></p>";
        liste.innerHTML += "<p><input id='opprett-navn' /></p>";
        liste.innerHTML += "<p><label >Beskrivelse:</label></p>";
        liste.innerHTML += "<p><input id='opprett-beskrivelse' /></p>";
        liste.innerHTML += "<p><label >Pris per natt:</label></p>";
        liste.innerHTML += "<p><input type='number' id='opprett-pris' /></p>";
        liste.innerHTML += "<p><button id='opprett-bekreft-knapp' >Bekreft</button></p>";
        const getNameValue = () => (document.getElementById("opprett-navn") as HTMLInputElement).value;
        const getdescriptionValue =() => (document.getElementById("opprett-beskrivelse") as HTMLInputElement).value;
        const getpriceValue =() => (document.getElementById("opprett-pris") as HTMLInputElement).value;
        document.getElementById("opprett-bekreft-knapp")?.addEventListener("click", async() => {
    await opprettRoom({
        name: getNameValue(),
        description: getdescriptionValue(),
        pricePrNight: Number(getpriceValue())
     });
     visRom();
  });
});

