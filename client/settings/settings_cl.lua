----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

RegisterCommand('ui:opensettings', function()
    SetNuiFocus(true, true)
    SendNUIMessage({action = 'open_settings'})
    TriggerEvent('boii_ui:notify', nil, 'Settings opened successfully!', 'success', 5000)
end)

RegisterCommand('ui:close_settings', function()
    SetNuiFocus(false, false)
    SendNUIMessage({action = 'close_settings'})
    TriggerEvent('boii_ui:notify', nil, 'Settings closed successfully!', 'success', 5000)
end)

RegisterNUICallback('close_settings', function()
    SetNuiFocus(false, false)
    TriggerEvent('boii_ui:notify', nil, 'Settings closed successfully!', 'success', 5000)
end)

RegisterNUICallback('saved_settings', function()
    TriggerEvent('boii_ui:notify', nil, 'UI Settings saved successfully!', 'success', 5000)
end)
