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

--- Client side action menu handling
-- @script client/action_menu.lua

--- @section Variables

--- Active flag
local active = false

--- @section Local functions

--- Process and filter menu options
-- @param options table: Received options to build the menu.
local function filter_menu(options)
    local processed_options = {}
    for _, option in ipairs(options) do
        local processed_option = deep_copy(option)
        if type(processed_option.can_interact) == 'function' then
            processed_option.interactable = processed_option.can_interact()
        else
            processed_option.interactable = true
        end
        if processed_option.action_type == 'function' and type(processed_option.action) == 'function' then
            register_function(processed_option.label, processed_option.action)
            processed_option.action = processed_option.label
        end
        if processed_option.submenu then
            processed_option.submenu = filter_menu(processed_option.submenu)
        end
        processed_options[#processed_options + 1] = processed_option
    end
    return processed_options
end

--- Opens the menu with given data.
-- @param menu_data table: The incoming menu data to open.
local function open_menu(menu_data)
    if active then return end
    active = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'create_action_menu',
        menu = filter_menu(menu_data)
    })
end

--- @section NUI callbacks

--- Closes menu from UI actions.
-- @param data table: Received data from the UI.
RegisterNUICallback('close_action_menu', function(data)
    SetNuiFocus(false, false)
    active = false
end)

--- Event to close the context menu if required.
RegisterNetEvent('boii_ui:cl:close_action_menu', function()
    SetNuiFocus(false, false)
    active = false
    SendNUIMessage({ action = 'close_action_menu' })
end)

--- @section Exports

--- Opens a menu.
exports('action_menu', open_menu)

--- @section Test stuff

local test_menu = {
    {
        label = 'Level 1',
        icon = 'fa-solid fa-sitemap',
        colour = 'red',
        submenu = {
            {
                label = 'Level 2',
                icon = 'fa-solid fa-operations',
                colour = 'orange',
                submenu = {
                    {
                        label = 'Level 3',
                        icon = 'fa-solid fa-truck-moving',
                        colour = 'yellow',
                        submenu = {
                            {
                                label = 'Level 4',
                                icon = 'fa-solid fa-boxes',
                                colour = 'green',
                                submenu = {
                                    {
                                        label = 'Level 5',
                                        icon = 'fa-solid fa-map-marked-alt',
                                        colour = 'blue',
                                        submenu = {
                                            {
                                                label = 'Confirm',
                                                icon = 'fa-solid fa-check-circle',
                                                colour = 'purple',
                                                action_type = 'client',
                                                action = 'example_event',
                                                params = { example_param = 'example_value' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    {
        label = 'Quick Access',
        icon = 'fa-solid fa-toolbox',
        action_type = 'client',
        action = 'boii_target:cl:open_toolbox',
        params = {}
    }
}

RegisterCommand('testactionmenu', function()
    SetNuiFocus(true, true)
    exports.boii_ui:action_menu(test_menu)
end, false)