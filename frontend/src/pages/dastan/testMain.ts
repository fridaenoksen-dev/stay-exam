//* Dastan Salah Hawrami//*


import { hentAllRoom, oppdaterRoom, opprettRoom, slettRoom} from "./request";


async function main () {


    // slette alt og start på nytt

       await fetch ("http://localhost:3000/api/reset", {
        method:"POST",
        headers:{
            "authorization": "Bearer mittPassord123"
        }
    });
    console.log("Alt er nullstilit");
    

    // GET

    const alleRom = await hentAllRoom();
    console.log("Read - alle room:" , alleRom);



    //POST

    const nyttRom = await opprettRoom({
        name: "suitrom",
        description: "Perfetk til et bryllup dag",
        pricePrNight: 6000,
        maxGuests: 2
    });
   
    console.log("Lag - opprett et nytt rom:" , nyttRom);
    
    

    //PUT

    const oppdatering = await oppdaterRoom(2, {
        name: "Dobbeltrom med sjøutsikt", 
        description: "nylig oppusset rom med bedre utsikt",
        pricePrNight: 3400,
        maxGuests:2,
    });
   
    console.log("oppdatering - oppdatert rom:" , oppdatering);

    //Delete

    await slettRoom(nyttRom.id);
    
    console.log("slettet - rom med ID 1 er slettet");
    
    
}

main();