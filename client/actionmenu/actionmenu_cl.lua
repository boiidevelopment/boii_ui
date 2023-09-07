local action_menu_options = {
    {
        header = 'Vehicle Options', -- Option header text
        header_icon = '<i class="fa-solid fa-car"></i>', -- Header font awesome icon
        message = 'View vehicle actions.', -- Message to display below header
        --action_type = 'client_event', -- Type to trigger on click this can be removed. Actions: 'client_event', 'server_event'
        --action = 'boii_ui:cl:submenu_test_event', -- Name of event
        --params = {}, -- Event params
        should_close = false, -- Toggle whether event should close the menu ui
        submenu = {
            {
                header = 'Open Garage', -- Sub menu header text
                action_type = 'client_event', -- Type to trigger on click this can be removed. Actions: 'client_event', 'server_event'
                action = 'boii_ui:cl:submenu_test_event', -- Name of event
                params = {}, -- Event params
                should_close = false -- Toggle whether event should close the menu ui
            },
            {
                header = 'Store Vehicle',
                action_type = 'client_event',
                action = 'boii_ui:cl:submenu_test_event',
                params = {},
                should_close = true
            },
            {
                header = 'Check VIN',
                action_type = 'client_event',
                action = 'boii_ui:cl:submenu_test_event',
                params = {},
                should_close = true
            }
        }
    },
    {
        header = 'Payment Options',
        header_icon = '<i class="fa-solid fa-bank"></i>',
        message = 'View payment actions.',
        params = {},
        should_close = false,
        submenu = {
            {
                header = 'Check Payment Time',
                action_type = 'client_event',
                action = 'boii_ui:cl:submenu_test_event',
                params = {},
                should_close = false
            },
            {
                header = 'Pay Invoice',
                action_type = 'client_event',
                action = 'boii_ui:cl:submenu_test_event',
                params = {},
                should_close = true
            },
        }
    },
}

local action_menu_data = {
    main_header = {
        text = 'Action Menu', -- Main header text
        icon = '<i class="fa-solid fa-cog"></i>' -- Main header icon
        --image = '/html/assets/images/lspd.png', -- Image to display on main header
    },
    menu_options = action_menu_options, -- Menu options this was split and placed above for readability
    menu_button = { -- Menu button
        text = 'Exit', -- Button text
        action_type = 'client_event', -- Type to trigger on click this can be removed. Actions: 'client_event', 'server_event'
        action = 'boii_ui:cl:menu_test_event', -- Name of event
        params = {}, -- Event params
        should_close = true -- Toggle whether event should close the menu ui
    }
}

--[[
    FUNCTIONS
]]

-- Function to open menu
local function open_action_menu(style, menu)
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'create_action_menu',
        type = style, 
        menu = table.clone(menu)
    })
end

--[[
    EVENTS
]]

-- Callback to trigger events
RegisterNUICallback('trigger_action_event', function(data)
    if data.action_type == 'server_event' then
        TriggerServerEvent(data.action, data.params)
    elseif data.action_type == 'client_event' then
        TriggerEvent(data.action, data.params)
    end
    if data.should_close then
        SetNuiFocus(false, false)
        SendNUIMessage({action = 'close_action_menu'})
    end
    exports['boii_ui']:notify('ACTION MENU', 'Action sub menu option clicked.', 'success', 3500)
end)

--[[
    NUI CALLBACKS
]]

-- Callback to close menu
RegisterNUICallback('close_action_menu', function()
    SetNuiFocus(false, false)
end)


--[[
    EXPORTS
]]

-- Context menu exports
exports('open_action_menu', open_action_menu)

--[[
    TEST STUFF

    You can remove this
]]

RegisterCommand('testactionmenu', function()
    SetNuiFocus(true, true)
    exports['boii_ui']:open_action_menu('default', action_menu_data)
end)