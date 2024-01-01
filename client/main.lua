----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

-- Locals
local active = false

--[[
    FUNCTIONS
]]

-- Function to open settings ui
local function open_settings()
    if active then return end
    active = true 
    SetNuiFocus(true, true)
    SendNUIMessage({ action = 'open_settings' })
end

--[[
    CALLBACK
]]

-- Callback to close settings ui
RegisterNUICallback('close_settings', function()
    active = false
    SetNuiFocus(false, false)
end)

-- Callback to trigger events
RegisterNUICallback('trigger_event', function(data)
    if data.action_type == 'server' then
        TriggerServerEvent(data.action, data.params)
    elseif data.action_type == 'client' then
        TriggerEvent(data.action, data.params)
    end
    if data.should_close then
        SetNuiFocus(false, false)
        SendNUIMessage({action = 'close_menu'})
    end
end)

--[[
    KEY MAPPING
]]

-- Register key mapping
RegisterKeyMapping('boii_ui:open_settings', 'Open Settings', 'keyboard', 'F10')
RegisterCommand('boii_ui:open_settings', function()
    open_settings()
end, false)
