----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

-- Locals
local active = false

--[[
    FUNCTIONS
]]

-- Function to open menu
local function open_menu(menu)
    if active then return end
    active = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'create_menu',
        menu = table.clone(menu)
    })
end

--[[
    CALLBACKS
]]

-- Callback to close menu
RegisterNUICallback('close_menu', function()
    SetNuiFocus(false, false)
    active = false
end)

--[[
    EXPORTS
]]

-- Context menu exports
exports('menu', open_menu)

--[[
    TEST STUFF

    You can remove this
]]

local test_menu = {
    header = {
        message = 'Example Header', -- Menu header title
        icon = 'fa-solid fa-bell', -- Menu header icon 
        image = '/html/assets/images/logo.png', -- Menu header image
    },
    options = {
        {
            type = 'regular', -- Menu option type this is a regular context menu option like you are used too
            header = 'Example Menu Item', -- Menu option header
            icon = 'fa-solid fa-car', -- Menu option icon
            message = 'This is an example standard menu item', -- Menu icon message
            action_type = 'client', -- Type of action to trigger: options; 'client', 'server'
            action = 'test_event', -- Action to perform
            params = {}, -- Parameters for the above action
            should_close = true -- Toggle if clicking menu option should close the menu or not
        },
        {
            type = 'drop', -- This is the drop down option type
            header = 'Example Drop Down Item',
            icon = 'fa-solid fa-car',
            message = 'This is an example drop down menu item',
            submenu = { -- Submenu is created when clicking on main menu item, you handle the actions here instead.
                {
                    header = 'Example Sub Header',
                    message = 'This is an example sub menu item',
                    action_type = 'client',
                    action = 'test_event',
                    params = {},
                },
                {
                    header = 'Example Sub Header 2',
                    message = 'This is an example sub menu item 2',
                    action_type = 'client',
                    action = 'test_event',
                    params = {},
                },
            }   
        },
        {
            type = 'input', -- This is the input option type
            header = 'Example Input Item',
            icon = 'fa-solid fa-house',
            message = 'This is an example input menu item',
            fields = {
                id = true, -- Toggle if players ID is required
                number = false, -- Toggle a number value input
                text = true, -- Toggle a text value input
            },
            button = { -- This is the first entry for a button in the test menu the submit button will submit the values of the input fields
                text = 'Submit', -- Button text
                icon = 'fa-solid fa-plus', -- Button icon
                action_type = 'client', -- Type of action to trigger: options; 'client', 'server'
                action = 'test_event', -- Action to perform
                params = {}, -- Parameters for the above action
            },
        },
        {
            type = 'list', -- This is the list selector option type
            header = 'Example List Selector',
            icon = 'fa-solid fa-house',
            message = 'This is an example input menu item',
            options = {'Option 1', 'Option 2', 'Option 3'}, -- This is your list of available options
            button = {
                text = 'Submit',
                icon = 'fa-solid fa-plus',
                action_type = 'client',
                action = 'test_event',
                params = {},
            },
        },
        {
            type = 'colour', -- This is the colour picker option type
            header = 'Example Colour Picker',
            message = 'This is an example colour picker',
            button = {
                text = 'Submit',
                icon = 'fa-solid fa-plus',
                action_type = 'client',
                action = 'test_event',
                params = {},
            },
        },
        {
            type = 'checklist', -- This is the checklist option type
            header = 'Example Checklist',
            message = 'This is an example checklist',
            items = { -- This is where you input items for the checklist
                { id = 'item1', value = 'item1', label = 'Example Item 1' },
                { id = 'item2', value = 'item2', label = 'Example Item 2' },
            },
            button = {
                text = 'Submit',
                icon = 'fa-solid fa-plus',
                action_type = 'client',
                action = 'test_event',
                params = {},
            },
        },
        {
            type = 'slider', -- This is the slider option type
            header = 'Example Sliders',
            message = 'This is an example slider item',
            sliders = { -- This is where you add the sliders and adjust values
                { min = 0, max = 100, default = 50 },
                { min = 0, max = 200, default = 100 },
            },
            button = {
                text = 'Submit',
                icon = 'fa-solid fa-plus',
                action_type = 'client',
                action = 'test_event',
                params = {},
            },
        },
        {
            type = 'toggle', -- This is the toggle switches option type
            header = 'Example Toggle Switches',
            message = 'This is an example toggle switch item',
            toggles = {
                { 
                    label = 'Toggle 1', -- Label text for switch
                    checked = true, -- Sets the toggle switch to active 
                    action_type = 'client',
                    action = 'test_event',
                    params = {},
                },
                { 
                    label = 'Toggle 2',
                    checked = false,
                    action_type = 'client',
                    action = 'test_event',
                    params = {},
                },
            },
        },
    },
}

RegisterCommand('testmenu', function()
    SetNuiFocus(true, true)
    exports['boii_ui']:menu(test_menu)
end)