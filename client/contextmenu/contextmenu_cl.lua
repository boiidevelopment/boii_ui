----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

-- Example menu options
local menu_options = {
    {
        header = 'Option 1', -- Menu option header if header is being used
        header_icon = '<i class="fa-solid fa-bell"></i>', -- Menu header icon if using one this can be removed if not
        image = '/html/assets/images/lspd.png', -- Menu header image if using one if not remove
        message = 'A menu option with icons and a image that triggers a server event.', -- Menu option text if text is being used
        message_icon = '<i class="fa-solid fa-bell"></i>', -- Menu header icon if using one this can be removed if not
        action_type = 'server_event', -- Type to trigger on click this can be removed. Actions: 'client_event', 'server_event'
        action = 'boii_ui:sv:menu_test_event',  -- Name of event to trigger
        params = {}, -- Event params
        should_close = false, -- Toggle whether event should close the menu ui
        disabled = false -- Disable the onclick function of the option
    },
    {
        header = 'Option 2', -- Menu option header if header is being used
        header_icon = '<i class="fa-solid fa-bell"></i>', -- Menu header icon if using one this can be removed if not
        message = 'A menu option with a icon that triggers a client event.', -- Menu option text if text is being used
        action_type = 'client_event', -- Type to trigger on click this can be removed. Actions: 'client_event', 'server_event'
        action = 'boii_ui:cl:menu_test_event',  -- Name of event to trigger
        params = {}, -- Event params
        should_close = false, -- Toggle whether event should close the menu ui
        disabled = false -- Disable the onclick function of the option
    },
    {
        header = 'Option 3', -- Menu option header if header is being used
        message = 'A menu option that triggers a client event and closes the menu.', -- Menu option text if text is being used
        action_type = 'client_event', -- Type to trigger on click this can be removed. Actions: 'client_event', 'server_event'
        action = 'boii_ui:cl:menu_test_event', -- Name of event to trigger
        params = {},  -- Event params
        should_close = true, -- Toggle whether event should close the menu ui
        disabled = false -- Disable the onclick function of the option
    },
}

-- Example menu_data
local menu_data = {
    main_header = { -- Main menu header
        text = 'Example Header', -- Header text
        image = '/html/assets/images/lspd.png', -- Image to display on header. Remove this to use no image
        icon = '<i class="fa-solid fa-bell"></i>' -- Icon to display next to header text. Remove this to use no icon
    },
    menu_options = menu_options, -- Menu options, refer to menu_options above, menu was split for readability 
    menu_buttons = { -- Menu buttons mostly pointless since they work the same as any other options mainly just allows for more customisation over menu templates
        close = {
            use = true, -- Toggle the close button
            action_type = 'client_event', -- Type to trigger on click this can be removed. Actions: 'client_event', 'server_event'
            action = 'boii_ui:cl:menu_test_event', -- Name of event to trigger
            params = {}, -- Event params
            should_close = true, -- Toggle whether event should close the menu ui
        }
    },
}

-- Function to open menu
local function open_menu(style, menu_data)
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'create_menu',
        type = style, 
        menu = table.clone(menu_data)
    })
end

-- Callback to trigger events
RegisterNUICallback('trigger_event', function(data)
    local action = data.action
    local params = data.params
    local action_type = data.action_type
    local should_close = data.should_close
    if action_type == 'server_event' then
        TriggerServerEvent(action, table.unpack(params))
    elseif action_type == 'client_event' then
        TriggerEvent(action, table.unpack(params))
    end
    if should_close then
        SetNuiFocus(false, false)
        SendNUIMessage({action = 'close_menu'})
        exports['boii_ui']:notify(nil, 'menu closed', 'success', 3500)
    end
end)

-- Context menu exports
exports('open_menu', open_menu)

-- Test commands/events
RegisterCommand('testmenu', function()
    SetNuiFocus(true, true)
    open_menu('default', menu_data)
end)

RegisterCommand('testmenu2', function()
    SetNuiFocus(true, true)
    open_menu('lspd', menu_data)
end)

RegisterNetEvent('boii_ui:cl:menu_test_event')
AddEventHandler('boii_ui:cl:menu_test_event', function()
    print('client event option clicked')
    exports['boii_ui']:notify(nil, 'client event triggered', 'success', 3500)
end)


