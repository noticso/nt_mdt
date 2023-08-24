RegisterCommand('searchStats', function (source, args, raw)
    local src  = source
    local arresti = MySQL.query.await('SELECT category FROM polizia WHERE category = ?', {'arresto'})
    local denunce = MySQL.query.await('SELECT category FROM polizia WHERE category = ?', {'denuncia'})
    local multe = MySQL.query.await('SELECT category FROM polizia WHERE category = ?', {'multa'})
    local ricercato = MySQL.query.await('SELECT category FROM polizia WHERE category = ?', {'ricercato'})
    for i = 0, #arresti, 1 do
        arrestiNumber =  i
    end
    for j = 0, #denunce, 1 do
        denunceNumber =  j
    end
    for k = 0, #multe, 1 do
        multeNumber =k
    end
    for y = 0, #ricercato, 1 do
        ricercatoNumber = y
    end 
    TriggerClientEvent('nt_mdt:getNumber', src, arrestiNumber, multeNumber, denunceNumber, ricercatoNumber)
end)
RegisterNetEvent('nt_mdt:login')
AddEventHandler('nt_mdt:login', function(data, ID)
    local src = source
    local id =ESX.GetPlayerFromId(ID).identifier
    local registrationNum = json.decode(json.encode(data.loginVal))
    local matricola = MySQL.scalar.await('SELECT matricola FROM users WHERE identifier = ?', {id})
    local lastName = MySQL.scalar.await('SELECT lastname FROM users WHERE identifier = ?', {id})
    local job = MySQL.scalar.await('SELECT job FROM users WHERE identifier = ?', {id})
    local grade = MySQL.scalar.await('SELECT job_grade FROM users WHERE identifier = ?', {id})
    local label = MySQL.scalar.await('SELECT label FROM job_grades WHERE job_name=? AND grade=?', {job, grade})
    print(registrationNum, label,lastName)
    if registrationNum == matricola then
        TriggerClientEvent('nt_mdt:loginSuccess', src, registrationNum, label, lastName )
        ExecuteCommand('searchStats')
    else 
        TriggerClientEvent('esx:showNotification', src, "Incorrect Registration Number")
    end

end)
RegisterNetEvent('nt_mdt:add')
AddEventHandler('nt_mdt:add', function (data,ID) 
    local src = source
    local id =ESX.GetPlayerFromId(ID).identifier
    local fName = MySQL.scalar.await('SELECT firstname FROM users WHERE identifier = ?', {id})
    local lName = MySQL.scalar.await('SELECT lastname FROM users WHERE identifier = ?', {id})
    local matricola = MySQL.scalar.await('SELECT matricola FROM users WHERE identifier = ?', {id})
    local table = json.decode(json.encode(data))
    local editor = fName.." "..lName
    local category = table.category
    local reato = table.reato or ''
    local anni_prigione = table.anni_prigione or 0
    local euro = table.euro or 0
    local sospetto = table.sospetto or ''
    local targa_veicolo = table.targa_veicolo or ''
    local data = os.date("%Y/%m/%d %X") 
    local oggetti_sequestrati = table.oggetti_sequestrati or ''
    local confessione = table.confessione or ''
    local data_nascita = table.data_nascita 
    local rapporto = table.rapporto or ''
    local insert = MySQL.insert.await('INSERT INTO polizia (matricola, editor, category, reato, anni_prigione, euro, sospetto, targa_veicolo, data, oggetti_sequestrati, confessione, data_nascita, rapporto) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', {
        matricola,
        editor,
        category,
        reato,
        anni_prigione,
        euro,
        sospetto,
        targa_veicolo,
        data,
        oggetti_sequestrati,
        confessione,
        data_nascita,
        rapporto
    })
    print(insert)
    
    
end)
AddEventHandler('nt_mdt:searchSus')
RegisterNetEvent('nt_mdt:searchSus', function(data) 
    local src = source
    local identifier, nome, reati, riassunto, editor, anni = {}, {}, {}, {}, {}, {};
    local query = MySQL.query.await('SELECT * FROM polizia WHERE category = ?',{
        data.category
    })
    for k,v in pairs(query)do
        table.insert(identifier, v.id)
        table.insert(nome, v.sospetto)
        table.insert(reati, v.reato)
        table.insert(riassunto, v.rapporto)
        table.insert(editor,v.editor)
        table.insert(anni, v.anni_prigione)
    end
    local category ;
    if data.category == "arresto" then
        category = "arresti"
    end
    if data.category == "ricercato" then
        category = "ricercati"
    end
    if data.category == "multa" then
        category = "multe"
    end
    if data.category == "denuncia" then
        category = "denunce"
    end

    local obj = {
            nomi = nome,
            reati = reati or ' ',
            id = identifier,
            riassunti = riassunto or ' ',
            editor = editor,
            anni = anni or 0,
            category = category
        }
    TriggerClientEvent('nt_mdt:sendSus', src, obj)
end)
AddEventHandler('nt_mdt:delete')
RegisterNetEvent('nt_mdt:delete', function (data)
    local id = json.decode(json.encode(data.id))
    local src = source
    MySQL.query.await('DELETE FROM polizia WHERE id = ?',{id})
    TriggerClientEvent('nt_mdt:home', src)
    TriggerClientEvent('nt_mdt:delStats', src, id)

    ExecuteCommand('searchStats')

end)
AddEventHandler('nt_mdt:edit')
RegisterNetEvent('nt_mdt:edit', function (data)
    local id = json.decode(json.encode(data.id))
    local src = source
    local query = MySQL.query.await('SELECT * FROM polizia WHERE id = ?', {
        id
    });
    local reato, anni_prigione,euro,sospetto,targa_veicolo,oggetti_sequestrati,confessione,rapporto,data_nascita, category;
    for k,v in pairs (query) do 
        reato = v.reato
        anni_prigione = v.anni_prigione
        euro = v.euro
        sospetto = v.sospetto
        targa_veicolo = v.targa_veicolo
        oggetti_sequestrati = v.oggetti_sequestrati
        confessione = v.confessione
        rapporto = v.rapporto
        data_nascita = v.data_nascita
        category = v.category
    end
    local obj={
        ['reato'] = reato,
        ['anni_prigione'] = anni_prigione,
        ['euro'] = euro,
        ['sospetto']= sospetto,
        ['targa_veicolo'] = targa_veicolo,
        ['oggetti_sequestrati'] = oggetti_sequestrati,
        ['confessione'] = confessione,
        ['rapporto'] = rapporto,
        ['data_nascita'] = data_nascita,
        ['category'] = category
    }
    TriggerClientEvent('nt_mdt:editStats', src, id, obj)


end)
AddEventHandler('nt_mdt:editItem')
RegisterNetEvent('nt_mdt:editItem', function(data) 
    for k,v in pairs(data) do
        print(k,v)
    end
    local src = source
    local anni_prigione = data.anni_prigione or 0
    local id = data.id
    local oggetti = data.oggetti or ''
    local confessione = data.confessione or ''
    local nome = data.nome
    local bday = data.bday
    local reato = data.reato or ''
    local riassunto = data.riassunto or ''
    local euro = data.euro or 0
    local targa = data.targa or ''
    MySQL.update.await('UPDATE polizia SET anni_prigione = ?, oggetti_sequestrati = ?, confessione = ?, sospetto = ?, data_nascita = ?, reato  = ?, rapporto = ?, targa_veicolo = ?, euro = ? WHERE id = ?', {
        anni_prigione, oggetti, confessione, nome,bday, reato, riassunto, targa, euro, id
    })
    TriggerClientEvent('nt_mdt:home', src, data.name, data.grado)
    ExecuteCommand('searchStats')
    
end)
AddEventHandler('nt_mdt:ricerca')
RegisterNetEvent('nt_mdt:ricerca', function (data)
    local src =source
    local name = data.name
    local query = MySQL.query.await('SELECT * FROM polizia WHERE sospetto = ?',{
        name
    })
    local reato, anni_prigione,euro,sospetto,targa_veicolo,oggetti_sequestrati,confessione,rapporto,data_nascita, category, editor = {}, {}, {}, {},{},{},{},{},{},{}, {};
    for k, v in pairs(query) do
        table.insert(reato, v.reato)
        table.insert(anni_prigione, v.anni_prigione)
        table.insert(euro, v.euro)
        table.insert(sospetto, v.sospetto)
        table.insert(targa_veicolo, v.targa_veicolo)
        table.insert(oggetti_sequestrati, v.oggetti_sequestrati)
        table.insert(confessione, v.confessione)
        table.insert(rapporto, v.rapporto)
        table.insert(data_nascita, v.data_nascita)
        table.insert(category, v.category)
        table.insert(editor, v.editor)

    end
    local obj={
        reato = reato,
        anni_prigione= anni_prigione,
        euro= euro,
        sospetto = sospetto,
        targa_veicolo = targa_veicolo,
        oggetti_sequestrati = oggetti_sequestrati,
        confessione = confessione,
        rapporto = rapporto,
        data_nascita = data_nascita,
        category = category,
        editor = editor
    }

    TriggerClientEvent('nt_mdt:sendRicerca', src, obj)
end)

