$(function () {
    function display(bool) {
        if (bool) {
            $(".tablet").show();
            $("#login").show()
            $("#home").hide()
            $("#add-arresti").hide()
            $("#add-multe").hide()
            $("#add-denunce").hide()
            $("#add-ricercati").hide()
            $("#list-arresti").hide()
            $("#list-denunce").hide()
            $("#list-multe").hide()
            $("#list-ricercati").hide()
            $("#edit").hide()
            $("#ricerca").hide()

        } else {
            $(".tablet").hide();
            $("#home").hide()
            $("#login").hide()
            $("#add-arresti").hide()
            $("#add-multe").hide()
            $("#add-denunce").hide()
            $("#add-ricercati").hide()
            $("#list-arresti").hide()
            $("#list-denunce").hide()
            $("#list-multe").hide()
            $("#list-ricercati").hide()
            $("#edit").hide()
            $("#ricerca").hide()

        }
    }
    display(false)
    window.addEventListener('message', function(event) {
        let item = event.data;
        console.log(item.type)
       
        if (item.type === "ui" ) {
            if (item.status == true) {
                display(true)
            } else {
                display(false)
            }
        }
        if (item.type === "loginSuccess"){
            $("#home").show()
            $("#login").hide()
            $("#add-arresti").hide()
            $("#add-multe").hide()
            $("#add-denunce").hide()
            $("#add-ricercati").hide()
            $("#list-arresti").hide()
            $("#list-denunce").hide()
            $("#list-multe").hide()
            $("#list-ricercati").hide()
            $("#edit").hide()
            $("#ricerca").hide()
            $(".grado").text(item.label)
            $(".name").text(item.lastName)
        }
        if(item.type === "number"){
            $(".arresti-number").text(item.arresti)
            $(".denunce-number").text(item.denunce)
            $(".ricercati-number").text(item.ricercati)
            $(".multe-number").text(item.multe)
        }
        if(item.type === "home"){
            
            let name, grado;
            console.log(item.name, item.grado)
            if(item.name){
                $(".grado").text(item.name)
            } if(item.grado){
                $(".name").text(item.grado)
            }
            $(".tablet").show();
            $("#home").show()
            $("#login").hide()
            $("#login").hide()            
            $("#add-arresti").hide()
            $("#add-multe").hide()
            $("#add-arresti").hide()
            $("#add-denunce").hide()
            $("#add-ricercati").hide()
            $("#list-arresti").hide()
            $("#list-denunce").hide()
            $("#list-multe").hide()
            $("#list-ricercati").hide()
            $("#edit").hide()
            $("#ricerca").hide()

        }
        if(item.type === "showSus"){
            
            let container = this.document.getElementById(`list-${item.obj.category}`)
            
            for(let i = 0; i <= (item.obj.id.length -1);i++){
                console.log(item.obj.riassunti[i])
            console.log(item.obj.reati[i])
                if(container.querySelector(`#s${item.obj.id[i]}`) === null){
                    let reati;
                    let scrittaReati;
                    let scrittaPersona;
                    if(item.obj.category == 'arresti' || item.obj.category == 'multe' || item.obj.category == 'ricercati' ){
                        scrittaPersona = 'Soggetto: '
                    } else if(item.obj.category == 'denunce'){
                        scrittaPersona = "Denunciante: "
                    }
                    if(item.obj.category == 'denunce' || item.obj.category == "ricercati"){
                        reati = item.obj.riassunti[i]
                        scrittaReati = 'Riassunti: '

                    } else if(item.obj.category == 'arresti' || item.obj.category == 'multe'){
                        reati = item.obj.reati[i]
                        scrittaReati = 'Reati: '

                    } 
                    let div = $(`<div class="item" id="s${item.obj.id[i]}"></div>` ).appendTo(container)
                    let string = scrittaPersona.concat(item.obj.nomi[i])
                    $(`<h1>${string}</h1>`).appendTo(div)
                    $(`<p>${scrittaReati+reati}</p>`).appendTo(div)
                    $(`<p>Agente: ${item.obj.editor[i]}</p>`).appendTo(div)
                    $(`<button class="edit button ${item.obj.id[i]}" onclick=edit(${JSON.stringify(item.obj.id[i])})>✎ Edit</button>`).appendTo(div)
                    $(`<button class="delete button ${item.obj.id[i]}" onclick=del(${JSON.stringify(item.obj.id[i])})>🗑 Delete</button>`).appendTo(div)
                }
            }
        }
        if(item.type === "delStats"){
            $(`#s${item.data}`).remove()
        }
        if(item.type === "editStats"){
            let container = this.document.getElementById('edit')
            $("#edit").show()
            $("#home").hide()
            $("#login").hide()
            $("#add-arresti").hide()
            $("#add-multe").hide()
            $("#add-denunce").hide()
            $("#add-ricercati").hide()
            $("#list-arresti").hide()
            $("#list-denunce").hide()
            $("#list-multe").hide()
            $("#list-ricercati").hide()
            let obj = {
                id : item.id,
                category: item.data.category
            }
            if(item.data.category == 'arresto'){
                if(container.querySelector(`.aggiungi`) === null){
                $(`
                <button class="lt" onclick=back()><h1>&lt;</h1></button>
                <h1 class="aggiungi">Modifica Arresto</h1>
                <form class="form-aggiungi form-arresti-edit" id="e${item.id}"onsubmit=editArrestiItem(${JSON.stringify(obj)})>
                <br>
                  <input type="text" class="input" id="nome-arresti-edit" value="${item.data.sospetto}"   required >   <br>
              <br>
                  <input type="date" class="input bday"  id="bday-arresti-edit" value="${item.data.data_nascita}"     required>
               <br>
               <br>
                  <textarea class="input textarea reati "id="reati-arresti-edit"      required  >${item.data.reato}</textarea>
               <br>
               <br>
               <input type="number" min="0" class="input " id="anni-arresti-edit"   value="${item.data.anni_prigione}"    >
               <br>
               <br>
                  <textarea class="input textarea " id="confessione-arresti-edit">${item.data.confessione}</textarea>
               <br>
               <br>
                  <textarea class="input textarea oggetti" id="oggetti-arresti-edit" required   >${item.data.oggetti_sequestrati}</textarea>
               <br>
               <br>
              <button type="submit" value="Submit"class="button submit-edit" id="edit-arresti" >Submit</button>
            </form> 
                `).appendTo(container)
            }
            else{}
        }
            if(item.data.category == 'denuncia'){
                if(container.querySelector('.aggiungi') === null){
                    $(`<button class="lt" onclick=back()><h1>&lt;</h1></button>
                    <h1 class="aggiungi">Modifica Denuncia</h1>
                    <form class="form-aggiungi form-denunce-edit" id="e${item.id}" onsubmit=editDenunceItem(${JSON.stringify(obj)})>
                    <br>
                      <input type="text" class="input nome-dr-edit"   placeholder="Nome e Cognome Denunciante" required value="${item.data.sospetto}">   <br>
                  <br>
                      <input type="date" class="input bday bday-dr-edit"     placeholder="Data di Nascita" required value="${item.data.data_nascita}">
                   <br>
                   <br>
                      <textarea class="input textarea reati riassunto-dr-edit"      placeholder="Riassunto della Denuncia" required>${item.data.rapporto}</textarea>
                  <br>
                   <br>
                  <button type="submit" value="Submit"class="button submit-edit" id="submit-denunce" >Submit</button>
                </form> `).appendTo(container)
                } else{}
            }
            if(item.data.category == 'multa'){
                if(container.querySelector(`.aggiungi`) === null){
                    $(`<button class="lt" onclick=back()><h1>&lt;</h1></button>
                    <h1 class="aggiungi">Aggiungi Multa</h1>
                    <form class="form-aggiungi" id="form-multe" onsubmit=editMulteItem(${JSON.stringify(obj)})>
                    <br>
                      <input type="text" class="input" id="nome-edit-multe"   placeholder="Nome e Cognome Soggetto" required value="${item.data.sospetto}">   <br>
                  <br>
                      <input type="date" class="input bday"  id="bday-edit-multe"     placeholder="Data di Nascita" value="${item.data.data_nascita}" required>
                   <br>
                   <br>
                      <textarea class="input textarea reati "id="reati-edit-multe"      placeholder="Reati Commessi" required>${item.data.reato}</textarea>
                   <br>
                   <br>
                   <input type="text" class="input" id="targa-edit-multe"   placeholder="Targa Veicolo" value="${item.data.targa_veicolo}"> 
                   <br><br>
                   <input type="number" min="0" class="input " id="euro-edit-multe"     placeholder ="Importo della Multa" value="${item.data.euro}">
                   <br>
                   <br>
                      <textarea class="input textarea " id="confessione-edit-multe"     placeholder="Confessione">${item.data.confessione}</textarea>
                   <br>
                   <br>
                      <textarea class="input textarea oggetti" id="oggetti-edit-multe" placeholder="Oggetti Sequestrati" required>${item.data.oggetti_sequestrati}</textarea>
                   <br>
                   <br>
                  <button type="submit" value="Submit"class="button submit-edit" id="submit-multe" >Submit</button>
                </form> `).appendTo(container)
                } else{}
            }
            if(item.data.category == 'ricercato'){
                if(container.querySelector(`.aggiungi`) === null){
                    $(`<button class="lt" onclick=back()><h1>&lt;</h1></button>
                    <h1 class="aggiungi">Modifica Denuncia</h1>
                    <form class="form-aggiungi form-denunce-edit" id="e${item.id}" onsubmit=editDenunceItem(${JSON.stringify(obj)})>
                    <br>
                      <input type="text" class="input nome-dr-edit"   placeholder="Nome e Cognome Denunciante" required value="${item.data.sospetto}">   <br>
                  <br>
                      <input type="date" class="input bday bday-dr-edit"     placeholder="Data di Nascita" required value="${item.data.data_nascita}">
                   <br>
                   <br>
                      <textarea class="input textarea reati riassunto-dr-edit"      placeholder="Riassunto della Denuncia" required>${item.data.rapporto}</textarea>
                  <br>
                   <br>
                  <button type="submit" value="Submit"class="button submit-edit" id="submit-denunce" >Submit</button>
                </form> `).appendTo(container)
                } else{}
            }
        }
        if(item.type === "ricerca"){
            let container = this.document.getElementById("list")
            let e = this.document.querySelector('#list')
            if(e){
                let child = e.lastElementChild
                console.log(child)
                while (child) {
                    e.removeChild(child)
                    child = e.lastElementChild
                }
            }
            let div = $("#ricerca")
            for (let i = 0; i <= (item.data.category.length-1); i++) {
                if(container.querySelector(`#${item.data.sospetto+i}`) === null){
                    console.log(item.data.editor[i])
                    let category = item.data.category[i];
                    let color;
                    switch (category) {
                        case 'arresto':
                                color = '#ff3333'
                            break;
                        case 'multa':
                                color = '#1cca47'
                            break;
                        case 'denuncia':
                            color = '#f39f18'
                            break;
                            case 'ricercato':
                                color = '#2f2f2f'
                            break;
                    
                        default:
                            break;
                    }
                    category = category.charAt(0).toUpperCase() + category.slice(1);
                   switch (category) {
                    case "Arresto":
                        let divArresto = $(`<div class="item" class="${item.data.sospetto}" id="${item.data.sospetto+i}"></div>` ).appendTo(container)
                        $(`<h2 style="color:${color}">${category}</h2>`).appendTo(divArresto)
                        $(`<h1>Soggetto: ${item.data.sospetto[i]}</h1>`).appendTo(divArresto)
                        $(`<p>Reati: ${item.data.reato[i]}</p>`).appendTo(divArresto)
                        $(`<p>Anni di Prigione: ${item.data.anni_prigione[i]}</p>`).appendTo(divArresto)
                        $(`<p>Oggetti Sequestrati: ${item.data.oggetti_sequestrati[i]}</p>`).appendTo(divArresto)

                        $(`<p>Agente: ${item.data.editor[i]}</p>`).appendTo(divArresto)
                        $("#ricerca-name").val('')
                        break;
                    case "Multa":
                            let divMulta = $(`<div class="item" class="${item.data.sospetto}" id="${item.data.sospetto+i}"></div>` ).appendTo(container)
                            $(`<h2 style="color:${color}">${category}</h2>`).appendTo(divMulta)
                            $(`<h1>Soggetto: ${item.data.sospetto[i]}</h1>`).appendTo(divMulta)
                            $(`<p>Reati: ${item.data.reato[i]}</p>`).appendTo(divMulta)
                            $(`<p>Targa Veicolo: ${item.data.targa_veicolo[i]}</p>`).appendTo(divMulta)
                            $(`<p>Importo Pagati: ${item.data.euro[i]}€</p>`).appendTo(divMulta)
                            $(`<p>Confessione: ${item.data.confessione[i]}</p>`).appendTo(divMulta)
                            $(`<p>Oggetti Sequestrati: ${item.data.oggetti_sequestrati[i]}</p>`).appendTo(divMulta)
                            
                            $(`<p>Agente: ${item.data.editor[i]}</p>`).appendTo(divMulta)
                            $("#ricerca-name").val('')
                            break;
                    case "Ricercato":
                        let divRicercato = $(`<div class="item" class="${item.data.sospetto}" id="${item.data.sospetto+i}"></div>` ).appendTo(container)
                        $(`<h2 style="color:${color}">${category}</h2>`).appendTo(divRicercato)
                        $(`<h1>Soggetto: ${item.data.sospetto[i]}</h1>`).appendTo(divRicercato)     
                        $(`<p>Rapporto: ${item.data.rapporto[i]}</p>`).appendTo(divRicercato)                
                        $(`<p>Agente: ${item.data.editor[i]}</p>`).appendTo(divRicercato)
                        $("#ricerca-name").val('')
                    break;
                    case "Denuncia":
                        let divDenuncia = $(`<div class="item" class="${item.data.sospetto}" id="${item.data.sospetto+i}"></div>` ).appendTo(container)
                        $(`<h2 style="color:${color}">${category}</h2>`).appendTo(divDenuncia)
                        $(`<h1>Denunciante: ${item.data.sospetto[i]}</h1>`).appendTo(divDenuncia)     
                        $(`<p>Riassunto: ${item.data.rapporto[i]}</p>`).appendTo(divDenuncia)                
                        $(`<p>Agente: ${item.data.editor[i]}</p>`).appendTo(divDenuncia)
                        $("#ricerca-name").val('')
                    break;
                    
                    default:
                        break;
                   }
                } else{
                    
                }
            }
        }
    })
    document.onkeydown = (event) => {
        if(event.which === 27 ){
            $.post(`https://nt_mdt/exit`, JSON.stringify({}))
            return
        }
    };     
    $(".login-form").submit(e => {
        e.preventDefault()
        let loginVal = $(".input-login").val()
        let loginLen = loginVal.length
        if (loginVal){
            $.post(`https://nt_mdt/login`, JSON.stringify({loginVal}));
            $(".input-login").val("")
        return
        }
    })
    $(".home").click(function () {
        $.post(`https://nt_mdt/exit`, JSON.stringify({}));
        return
    })
    $("#aggiungi-arresti").click(function () {
        $("#add-arresti").show()
        $("#home").hide()
        $("#login").hide()
        $("#add-multe").hide()
        $("#add-denunce").hide()
        $("#add-ricercati").hide()
        $("#list-arresti").hide()
        $("#list-denunce").hide()
        $("#list-multe").hide()
        $("#list-ricercati").hide()
        $("#edit").hide()
        $("#ricerca").hide()

    })
    $("#aggiungi-multe").click(function(){
        $("#add-multe").show()
        $("#home").hide()
        $("#login").hide()
        $("#add-arresti").hide()
        $("#add-denunce").hide()
        $("#add-ricercati").hide()
        $("#list-arresti").hide()
        $("#list-denunce").hide()
        $("#list-multe").hide()
        $("#list-ricercati").hide()
        $("#edit").hide()
        $("#ricerca").hide()

    })
    $("#aggiungi-denunce").click(function(){
        $("#add-denunce").show()
        $("#home").hide()
        $("#login").hide()
        $("#add-multe").hide()
        $("#add-arresti").hide()
        $("#add-ricercati").hide()
        $("#list-arresti").hide()
        $("#list-denunce").hide()
        $("#list-multe").hide()
        $("#list-ricercati").hide()
        $("#edit").hide()
        $("#ricerca").hide()

    })
    $("#aggiungi-ricercati").click(function(){
        $("#add-ricercati").show()
        $("#home").hide()
        $("#login").hide()
        $("#add-multe").hide()
        $("#add-arresti").hide()
        $("#add-denunce").hide()
        $("#list-arresti").hide()
        $("#list-denunce").hide()
        $("#list-multe").hide()
        $("#list-ricercati").hide()
        $("#edit").hide()
        $("#ricerca").hide()

    })
    $("#ricerca-button").click(function(){
        $("#ricerca").show()
        $("#home").hide()
        $("#login").hide()
        $("#add-arresti").hide()
        $("#add-multe").hide()
        $("#add-arresti").hide()
        $("#add-denunce").hide()
        $("#add-ricercati").hide()
        $("#list-arresti").hide()
        $("#list-denunce").hide()
        $("#list-multe").hide()
        $("#list-ricercati").hide()
        $("#edit").hide()
    })
    // SUBMITs FUNCTIONs
    $("#form-arresti").submit(function(e){
        e.preventDefault()
        let nome = $("#nome-arresti").val()
        let bday = $("#bday-arresti").val()
        let reati = $("#reati-arresti").val()
        let anni = $("#anni-arresti").val()
        let confessione = $("#confessione-arresti").val()
        let oggetti = $("#oggetti-arresti").val()
        $.post(`https://nt_mdt/add`, JSON.stringify({
            category: 'arresto',
            reato: reati,
            anni_prigione: anni,
            sospetto: nome,
            targa_veicolo:'',
            oggetti_sequestrati: oggetti,
            confessione: confessione,
            data_nascita: bday
        }));
        setTimeout(()=>{
            $.post(`https://nt_mdt/home`, JSON.stringify({}))
        }, 1000)
        $(".input").val('')
        $(".textarea").val('')
    })
    $("#form-multe").submit(function(e){
        e.preventDefault()
        let nome = $("#nome-multe").val()
        let bday = $("#bday-multe").val()
        let reati = $("#reati-multe").val()
        let targa = $("#targa-multe").val()
        let euro = $("#euro-multe").val()
        let oggetti = $("#oggetti-multe").val()
        $.post(`https://nt_mdt/add`, JSON.stringify({
            category: 'multa',
            reato: reati,
            euro:euro,
            sospetto: nome,
            targa_veicolo:targa,
            oggetti_sequestrati: oggetti,
            data_nascita: bday
        }));
        setTimeout(()=>{
            $.post(`https://nt_mdt/home`, JSON.stringify({}))
            }, 1000)
            $(".input").val('')
            $(".textarea").val('')
    })
    $("#form-denunce").submit(function(e){
        e.preventDefault()
        let nome = $("#nome-denunce").val()
        let bday = $("#bday-denunce").val()
        let riassunto = $("#riassunto-denunce").val()
        $.post(`https://nt_mdt/add`, JSON.stringify({
            category: 'denuncia',
            sospetto: nome, 
            data_nascita: bday,
            rapporto: riassunto,
        }));
        setTimeout(()=>{
            $.post(`https://nt_mdt/home`, JSON.stringify({}))
            }, 1000)
            $(".input").val('')
            $(".textarea").val('')
    })
    $("#form-ricercati").submit(function(e){
        e.preventDefault()
        let nome = $("#nome-ricercati").val()
        let bday = $("#bday-ricercati").val()
        let riassunto = $("#riassunto-ricercati").val()
        $.post(`https://nt_mdt/add`, JSON.stringify({
            category: 'ricercato',
            sospetto: nome, 
            data_nascita: bday,
            rapporto: riassunto,
        }));
        setTimeout(()=>{
            $.post(`https://nt_mdt/home`, JSON.stringify({}))
            }, 1000)
            $(".input").val('')
            $(".textarea").val('')

    })
    $("#form-ricerca").submit(e=>{
        e.preventDefault()
        let name = $("#ricerca-name").val()
        $.post('https://nt_mdt/ricerca', JSON.stringify({name}))
    })
    $("#arresti-button").click(e=>{
        let container = document.getElementById("list")
        $("#list-arresti").show()
        $("#home").hide()
        $("#login").hide()
        $("#add-multe").hide()
        $("#add-arresti").hide()
        $("#add-denunce").hide()
        $("#add-ricercati").hide()
        $("#list-denunce").hide()
        $("#list-multe").hide()
        $("#list-ricercati").hide()
        $("#edit").hide()
        $("#ricerca").hide()
        $(".caro-arresti").text("ARRESTI")
        $.post(`https://nt_mdt/searchSus`, JSON.stringify({category:'arresto'}))
            return
    })
    $("#multe-button").click(e=>{
        $("#list-multe").show()
        $("#home").hide()
        $("#login").hide()
        $("#add-multe").hide()
        $("#add-arresti").hide()
        $("#add-denunce").hide()
        $("#add-ricercati").hide()
        $("#list-arresti").hide()
        $("#list-denunce").hide()
        $("#list-ricercati").hide()
        $("#edit").hide()
        $("#ricerca").hide()
        $(".caro-multe").text("MULTE")
        $.post(`https://nt_mdt/searchSus`, JSON.stringify({category:'multa'}))
            return
    })
    $("#denunce-button").click(e=>{
        $("#list-denunce").show()
        $("#home").hide()
        $("#login").hide()
        $("#add-multe").hide()
        $("#add-arresti").hide()
        $("#add-denunce").hide()
        $("#add-ricercati").hide()
        $("#list-arresti").hide()
        $("#list-multe").hide()
        $("#list-ricercati").hide()
        $("#edit").hide()
        $("#ricerca").hide()

        $(".caro-denunce").text("DENUNCE")
        $.post(`https://nt_mdt/searchSus`, JSON.stringify({category:'denuncia'}))
            return

    })
    $("#ricercati-button").click(e=>{
        $("#list-ricercati").show()
        $("#home").hide()
        $("#login").hide()
        $("#add-multe").hide()
        $("#add-arresti").hide()
        $("#add-denunce").hide()
        $("#add-ricercati").hide()
        $("#list-arresti").hide()
        $("#list-denunce").hide()
        $("#list-multe").hide()
        $("#edit").hide()
        $("#ricerca").hide()
        $(".caro-ricercati").text("RICERCATI")
        $.post(`https://nt_mdt/searchSus`, JSON.stringify({category:'ricercato'}))
            return

    })
    $(".lt").click(function(){
        $("#home").show()
        $("#login").hide()
        $("#add-arresti").hide()
        $("#add-multe").hide()
        $("#add-arresti").hide()
        $("#add-denunce").hide()
        $("#add-ricercati").hide()
        $("#list-arresti").hide()
        $("#list-denunce").hide()
        $("#list-multe").hide()
        $("#list-ricercati").hide()
        $("#edit").hide()
        $("#ricerca").hide()

    })

})