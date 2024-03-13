--[[
     ____   ____ _____ _____   _   _____  ________      ________ _      ____  _____  __  __ ______ _   _ _______ 
    |  _ \ / __ \_   _|_   _| | | |  __ \|  ____\ \    / /  ____| |    / __ \|  __ \|  \/  |  ____| \ | |__   __|
    | |_) | |  | || |   | |   | | | |  | | |__   \ \  / /| |__  | |   | |  | | |__) | \  / | |__  |  \| |  | |   
    |  _ <| |  | || |   | |   | | | |  | |  __|   \ \/ / |  __| | |   | |  | |  ___/| |\/| |  __| | . ` |  | |   
    | |_) | |__| || |_ _| |_  | | | |__| | |____   \  /  | |____| |___| |__| | |    | |  | | |____| |\  |  | |   
    |____/ \____/_____|_____| | | |_____/|______|   \/   |______|______\____/|_|    |_|  |_|______|_| \_|  |_|   
                              | |                                                                                
                              |_|               UI ELEMENTS
]]

--- Client side main
-- @script client/main.lua

--- @section Tables

local registered_functions = {}

--- @section Variables

--- Active flag
local active = false

--- @section Global functions

--- Creates a deep copy of a table, ensuring changes to the copy won't affect the original table.
-- @function deep_copy
-- @param t The table to copy.
-- @return A deep copy of the table.
-- @usage local copied_table = utils.tables.deep_copy(original_table)
function deep_copy(t)
    local orig_type = type(t)
    local copy
    if orig_type == 'table' then
        copy = {}
        for orig_key, orig_value in next, t, nil do
            copy[deep_copy(orig_key)] = deep_copy(orig_value)
        end
        setmetatable(copy, deep_copy(getmetatable(t)))
    else
        copy = t
    end
    return copy
end

--- Registers a function under a label to allow NUI to trigger.
-- @function register_function
-- @param label string: The label under which the function is registered.
-- @param func function: The function to register.
function register_function(label, func)
    registered_functions[label] = func
end

--- Calls a registered function by its label.
-- @function call_registered_function
-- @param label string: The label of the function to call.
function call_registered_function(label)
    if registered_functions[label] then
        registered_functions[label]()
    else
        print('Function with label ' .. label .. ' not found.')
    end
end

--- @section Local functions

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
    print('trigger event called')
    if data.action_type == 'server' then
        TriggerServerEvent(data.action, data.params, data.values or nil)
    elseif data.action_type == 'client' then
        TriggerEvent(data.action, data.params, data.values or nil)
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
