ESX = nil
PlayerLoaded = false
ESX = exports["es_extended"]:getSharedObject()
local display = false
print(ESX.GetPlayerData().job.name)

-- SET DISPLAY 
RegisterNetEvent('nt_mdt:SetDisplay')
AddEventHandler('nt_mdt:SetDisplay', function(bool)
    display = bool
    SetNuiFocus(bool, bool)
    SendNUIMessage({
        type = "ui",
        status = bool,
    })
    if display == true then
        startAnim()
        
    end
    if display == false then
        stopAnim()
    end
end)
--TABLET
function startAnim()
	Citizen.CreateThread(function()
	  RequestAnimDict("amb@world_human_seat_wall_tablet@female@base")
	  while not HasAnimDictLoaded("amb@world_human_seat_wall_tablet@female@base") do
	    Citizen.Wait(0)
	  end
		attachObject()
		TaskPlayAnim(GetPlayerPed(-1), "amb@world_human_seat_wall_tablet@female@base", "base" ,8.0, -8.0, -1, 50, 0, false, false, false)
	end)
end

function attachObject()
	tab = CreateObject(GetHashKey("prop_cs_tablet"), 0, 0, 0, true, true, true)
	AttachEntityToEntity(tab, GetPlayerPed(-1), GetPedBoneIndex(GetPlayerPed(-1), 57005), 0.17, 0.10, -0.13, 20.0, 180.0, 180.0, true, true, false, true, 1, true)
end

function stopAnim()
	StopAnimTask(GetPlayerPed(-1), "amb@world_human_seat_wall_tablet@female@base", "base" ,8.0, -8.0, -1, 50, 0, false, false, false)
	DeleteEntity(tab)
end
function disableControl(display)
    DisableControlAction(0,1, display)
    DisableControlAction(0,142, display)
    DisableControlAction(0,18, display)
    DisableControlAction(0,322, display)
    DisableControlAction(0,2, display)
    DisableControlAction(0,106, display)
end
RegisterNUICallback('login', function (data)
    TriggerServerEvent('nt_mdt:login', data, GetPlayerServerId(PlayerId()))
end)
RegisterNUICallback("exit", function(data)
    TriggerEvent('nt_mdt:SetDisplay', false)
 end)
RegisterNetEvent('nt_mdt:loginSuccess')
AddEventHandler('nt_mdt:loginSuccess', function (data,label, name)
    SendNUIMessage{
        type = "loginSuccess",
        registrationNum = data,
        label = label,
        lastName = name
    }
    ExecuteCommand('searchStats')
end)
RegisterNetEvent('nt_mdt:getNumber')
AddEventHandler('nt_mdt:getNumber', function(arresti, multe, denunce, ricercati)
    SendNUIMessage{
        type = "number",
        arresti = arresti,
        multe = multe,
        denunce = denunce,
        ricercati = ricercati,
    }
end)
RegisterNetEvent('nt_mdt:sendRicerca')
AddEventHandler('nt_mdt:sendRicerca', function(data)
    SendNUIMessage{
        type = "ricerca",
        data = data
    }
end)
RegisterNUICallback('add', function (data)
    TriggerServerEvent('nt_mdt:add', data, GetPlayerServerId(PlayerId()))
end)
RegisterNUICallback('home', function() 
    SendNUIMessage{
        type="home"
    }
    ExecuteCommand('searchStats')
end)
RegisterNUICallback('searchSus', function(data)
    TriggerServerEvent('nt_mdt:searchSus', data)

end)
RegisterNUICallback('delete', function(data) 
    TriggerServerEvent('nt_mdt:delete', data)
end)
RegisterNUICallback('edit', function(data) 
    TriggerServerEvent('nt_mdt:edit', data)
end)
RegisterNUICallback('editItem', function(data) 
    TriggerServerEvent('nt_mdt:editItem', data)
end)
RegisterNUICallback('ricerca', function(data)
    TriggerServerEvent('nt_mdt:ricerca', data)
end)
RegisterNetEvent('nt_mdt:sendSus')
AddEventHandler('nt_mdt:sendSus', function(data)
    SendNUIMessage{
        type="showSus",
        obj = data,
    }
end)
RegisterNetEvent('nt_mdt:home')
AddEventHandler('nt_mdt:home', function (grado, name)
    grado = grado or ''
    name = name or ''
    SendNUIMessage{
        type="home",
        name = name,
        grado = grado
    }
    ExecuteCommand('searchStats')
end)
RegisterNetEvent('nt_mdt:delStats')
AddEventHandler('nt_mdt:delStats', function(data) 
    SendNUIMessage{
        type="delStats",
        data = data
    }
end)
RegisterNetEvent('nt_mdt:editStats', function(id,data) 
    SendNUIMessage{
        type = "editStats",
        data = data,
        id = id
    }
end)
    RegisterCommand('mdt', function (source, args, raw)
     if ESX.GetPlayerData().job.name == 'police' then
           
        local playerPed = PlayerPedId()
        while ESX.GetPlayerData().job == nil do
            Wait(100)
        end
        PlayerLoaded = true
        if PlayerLoaded == true then
            TriggerEvent('nt_mdt:SetDisplay', not display)
                while display do
                    
                    disableControl(display)
                    Wait(1)
                    
                end
        end
     end
    end)
    RegisterKeyMapping('mdt', 'Open MDT tablet', 'keyboard', 'o')

