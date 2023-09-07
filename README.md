# BOII | DEVELOPMENT - UTILITY; UI ELEMENTS *(W.I.P)*

Here we have a large UI pack to cover most things you may need in your city.
Project is still classed as a work in progress due to some additional elements soon to be added, and some code refactoring to do.
Every element is modular to allow citizens the option of customising their UI.
Most elements come with extensive customisation options to allow you to tweak the UI to your server's style.
Includes: notifications, progressbar, drawtext ui, skill circle and a context menu.
Also includes our chip hack minigame built in along with a additional 3 brand new minigames, anagram, keydrop, and codecrack!
Enjoy!

### INSTALL

1. Customise the `html/scripts/*.js` files, most elements include a `styles` section at the top of the javascript file. You can add custom templates in these sections.
2. Drag and drop `boii_ui` into your server resources ensuring load order is correct
3. Add `ensure boii_ui` to your server.cfg if not launching categories
4. If you are using `qb-core` follow the instructions inside `readme/qbcore-edits.md` **additional framework readme's to come**
5. Restart your server.

### EXAMPLES

- Notifications

![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/15a482e3-cb91-493d-8b0b-dc3e1e705da3)
![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/58c0f2d6-4a59-4d3d-9b1a-d25bb9126f40)

Styles:
```javascript
['default']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(77, 203, 194, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1.0)',
        headerIcon: '<i class="fa-solid fa-bell"></i>',
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: undefined,
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: '/html/assets/images/logo.png',
        imageBorder: '1px solid rgba(77, 203, 194, 1.0)',
        imageBorderRadius: '15px',
        imageBoxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1.0)',
        animation: 'fade 2s',
        audio: 'assets/audio/eyes.ogg',
},
```

Export:
```lua

--[[
    NOTES:

    header - notification header text this can be left nil if do not wish to use a header *(if no header make sure to use a message)*
    message - notification message text this can be left nil if you do not with to use message text *(if no message text make sure to use a header)*
    style - style template used; these can be edited in notifications.js
    duration - time for notification to stay on screen in ms

]]

exports['boii_ui']:notify('TEST NOTIFICATION' --[[header]], 'This is a test notification!' --[[message]], 'default' --[[style]], 5000 --[[duration]])
```

- Drawtext

![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/269c9632-60ea-4ae1-adc2-1af268846525)

Styles:
```javascript
['default']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(77, 203, 194, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1.0)',
        headerIcon: '<i class="fa-solid fa-bell"></i>',
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        messageIcon: undefined,
        messageWeight: 100,
        messageShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        image: '/html/assets/images/logo.png',
        imageBorder: '1px solid rgba(77, 203, 194, 1.0)',
        imageBorderRadius: '15px',
        imageBoxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1.0)',
        animation: 'fade 2s',
        audio: 'assets/audio/when.ogg',
},
```

Export:
```lua

--[[
    NOTES:

    header - notification header text this can be left nil if do not wish to use a header *(if no header make sure to use a message)*
    message - notification message text this can be left nil if you do not with to use message text *(if no message text make sure to use a header)*
    style - style template used; these can be edited in drawtext.js

]]

exports['boii_ui']:show_drawtext('TEST DRAWTEXT' --[[header]], 'Drawtext test ui!' --[[message]], 'default' --[[style]])
```

- Progressbar

![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/31a874cc-4ee0-41a6-a0ee-4e3ac242eff5)
![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/03a7b585-67bc-4873-be33-3f892353986a)
![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/cc73d561-8cea-4838-a2d0-9651fb293fb7)

Styles:
```javascript
['default']: {
        background: 'rgba(31, 30, 30, 0.9)',
        border: '1px solid rgba(77, 203, 194, 1.0)',
        borderRadius: '15px',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Aldrich',
        boxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1.0)',
        headerIcon: '<i class="fa-solid fa-bell"></i>',
        headerWeight: 600,
        headerShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        barBackground: 'rgba(77, 203, 194, 0.5)',
        barRadius: '15px',
        animation: 'fade 1s',
        audio: 'assets/audio/hollow.ogg',
},
```

Export:
```lua
--[[
    NOTES:

    text - progress bar text
    style - style template used; these can be edited in progressbar.js
    callback - returns success or failure
    duration - time for 1% to complete on bar in ms. 60ms = 6000ms to 100%, so 6seconds to complete
    allow dead - boolean value allows the progress bar to be used when player is dead
    disable controls - boolean values to disable control accesses
    animation - animation to use with bar: dict = animation dictionary, anim = animation, flags = flags
    callback - returns finished or cancelled

]]

exports['boii_ui']:progress('Progressbar Test..' --[[text]], 'default' --[[style]], 60 --[[duration]], false --[[allow dead]], { --[[disable controls]]
        disable_mouse = false, 
        disable_move = false,
        disable_car_move = false,
        disable_combat = false
    }, { --[[animation]]
        dict = 'anim@amb@board_room@supervising@',
        anim = 'think_01_hi_amy_skater_01',
        flags = 49
    }, function(finish) --[[callback]]
        if finish then
            print('bar finish')
        else
            print('bar cancelled')
        end
    end)
```

- Anagram

![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/9c75bbca-3396-4b88-ab16-491a98cfd722)

Styles:
```javascript
['default']: {
        successAudio: 'assets/audio/swift.ogg',
        failAudio: 'assets/audio/eyes.ogg',
        errorAudio: 'assets/audio/elegant.ogg'
},
```

Export:
```lua
--[[
    NOTES:

    style - style template used; these can be edited in anagram.js
    difficulty - game difficulty: 1 = easy, 2 = intermediate, 3 = hard, 4 = expert
    guesses - maximum amount of guesses a player is allowed
    duration - amount of time allowed to find the correct word in seconds
    callback - returns success or failure
    
]]

 exports['boii_ui']:anagram('default' --[[style]], 1 --[[difficulty]], 5 --[[guesses]], 60 --[[duration]], function(success) --[[callback]]
    if success then
        print('anagram success')
    else
        print('anagram fail')
    end
end)
```

- Chip hack

![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/7fe1e9af-e429-4cb1-9c14-76c641600c5a)

Styles:
coming soon..

Export:
```lua
--[[
    NOTES: 

    chips - amount of chips player has to find
    duration - amount of time to find chips in seconds
    callback - returns success or failure
]]

exports['boii_ui']:chip_hack(5 --[[chips]], 60 --[[duration]], function(success) --[[callback]]
    if success then
        print('chip hack success')
    else
        print('chip hack fail')
    end
end)
```

- Code crack

![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/28fcbcf6-7a11-4da0-8078-68df7619aaf5)

Styles:
```javascript
['default']: {
        correctColour: 'rgba(77, 203, 194, 0.8)',
        wrongPositionColour: 'rgba(254, 221, 0, 1.0)',
        successAudio: 'assets/audio/swift.ogg',
        failAudio: 'assets/audio/eyes.ogg',
        errorAudio: 'assets/audio/elegant.ogg'
}
```

Export:
```lua
--[[
    NOTES:

    style - style template used; these can be edited in codecrack.js
    difficulty - example: incrementing the difficulty will increment the amount of digits that is required. 1 = 4 digits, 2 = 5 digits, 3 = 6 digits .. so on
    attempts - amount of attempts a player is allowed to crack the pin
    callback - returns success or failure

]]

exports['boii_ui']:code_crack('default' --[[style]], 1 --[[difficulty]], 5 --[[attempts]], function(success) --[[callback]]
    if success then
        print('code crack success')
    else
        print('code crack fail')
    end
end)
```

- Keydrop

![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/1bc772a5-5bc1-4125-a23b-649c959dab03)

Styles:

coming soon..

Export:
```lua
--[[
    NOTES

    score limit - the amount of correct keypresses for success
    miss limit - the amount of incorrect keypresses for failure
    fall delay - amount of time taken for letters to fall in ms
    new letter delay - amount of time take for a new letter to begin to fall
    callback - returns success or failure
]]

exports['boii_ui']:keydrop(3 --[[score limit]], 3 --[[miss limit]], 3000 --[[fall delay]], 2000 --[[new letter delay]], function(success) --[[callback]]
    if success then
        print('keydrop success')
    else
        print('keydrop failed')
    end
end)
```

- Skill circle

![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/23b9e710-78e1-4b60-a2f5-30ec804298df)
![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/7d689e07-b4d4-40bd-831c-ba82075290f4)
![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/338e88f5-00e9-4918-81cf-e206090d7ccd)

Styles:
```javascript
['default']: {
        barColour: 'rgba(77, 203, 194, 0.5)',
        backgroundColour: 'rgba(31, 30, 30, 0.8)',
        successBackgroundColour: 'rgba(77, 203, 194, 0.8)',
        fontColour: 'rgba(77, 203, 194, 1.0)',
        shadowColour: 'rgba(31, 30, 30, 0.8)',
        shadowBlur: 3,
        barFont: '6.5rem Aldrich',
        successAudio: 'assets/audio/swift.ogg',
        failAudio: 'assets/audio/eyes.ogg',
},
```

Export:
```lua
--[[
    NOTES:

    style - style template used; these can be edited in skillcircle.js
    duration - time for 1% to complete on bar in ms. 60ms = 6000ms to 100%, so 6seconds to complete
    allow dead - boolean value allows the progress bar to be used when player is dead
    animation - animation to use with bar: dict = animation dictionary, anim = animation, flags = flags
    callback - returns finished or cancelled

]]

exports['boii_ui']:skill_circle('default' --[[style]], 25 --[[duration]], false --[[allow dead]], { --[[animation]]
    dict = 'anim@amb@board_room@supervising@',
    anim = 'think_01_hi_amy_skater_01',
    flags = 49
}, function(success) --[[callback]]
    if success then
        ClearPedTasks(player)
        print('circle finish')
    else
        ClearPedTasks(player)
        print('circle failed')
    end
end)
```

- Context menu

![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/be8486d0-9d5c-474e-88db-5e24cfe2a4ec)
![image](https://github.com/boiidevelopment/boii_ui/assets/90377400/53a17de2-182e-435b-98a8-3da7681607d9)

Styles:
```javascript
['default']: {
        mainHeaderBackground: 'rgba(31, 30, 30, 0.8)',
        mainHeaderBoxShadow: '0px 0px 4px 0px rgba(77, 203, 194, 0.8)',
        mainHeaderBorder: '1px solid rgba(77, 203, 194, 0.8)',
        mainHeaderBorderRadius: '15px',
        mainHeaderColor: 'rgba(255, 255, 255, 0.8)',
        mainHeaderFontFamily: 'Aldrich',
        mainHeaderImageBorder: '2px solid rgba(77, 203, 194, 0.8)',
        mainHeaderImageBorderRadius: '15px',
        mainHeaderImageBoxShadow: '0px 0px 4px 0px rgba(77, 203, 194, 0.8)',
        mainHeaderFontSize: '1.0rem',
        mainHeaderWeight: 600,
        mainHeaderShadow: '0px 0px 8px 0px rgba(31, 30, 30, 0.8)',
        optionBackground: 'rgba(31, 30, 30, 0.8)',
        optionBoxShadow: '0px 0px 4px 0px rgba(77, 203, 194, 0.8)',
        optionBorder: '1px solid rgba(77, 203, 194, 0.8)',
        optionBorderRadius: '15px',
        optionColor: 'rgba(255, 255, 255, 0.8)',
        optionFontFamily: 'Aldrich',
        optionHeaderFontSize: '1.0rem',
        optionMessageFontSize: '1.0rem',
        optionHeaderWeight: 600,
        optionMessageWeight: 100,
        optionImageBorder: '2px solid rgba(77, 203, 194, 0.8)',
        optionImageBorderRadius: '15px',
        optionImageBoxShadow: '0px 0px 4px 0px rgba(77, 203, 194, 0.8)',
        optionHeaderShadow: '0px 0px 8px 0px rgba(31, 30, 30, 0.8)',
        optionHoverBackground: 'rgba(31, 30, 30, 0.8)',
        optionHoverBoxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1)',
        optionHoverColor: 'rgba(255, 255, 255, 1)',
        buttonBackground: 'rgba(31, 30, 30, 0.8)',
        buttonBorder: '1px solid rgba(77, 203, 194, 1.0)',
        buttonBorderRadius: '15px',
        buttonBoxShadow: '0px 0px 4px 0px rgba(77, 203, 194, 0.8)',
        buttonFontSize: '1.0rem',
        buttonFontFamily: 'Aldrich',
        buttonFontWeight: 600,
        buttonColor: 'rgba(255, 255, 255, 0.8)',
        buttonHoverBackground: 'rgba(31, 30, 30, 0.8)',
        buttonHoverBoxShadow: '0px 0px 5px 0px rgba(77, 203, 194, 1)',
        buttonHoverColor: 'rgba(255, 255, 255, 1)'
},
```

Export:
```lua
--[[
    NOTES:

    style - style template used; these can be edited in contextmenu.js
    menu_data - menu data to open in ui refer to example menu

]]
exports['boii_ui']:open_menu('default' --[[style]], menu_data --[[menu data]])
```

Example menu:
```lua
-- Example menu options
local menu_options = {
    {
        header = 'Option 1', -- Menu option header if header is being used
        header_icon = '<i class="fa-solid fa-bell"></i>', -- Menu header icon if using one this can be removed if not
        image = '/html/assets/images/logo.png', -- Menu header image if using one if not remove
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
        image = '/html/assets/images/logo.png', -- Image to display on header. Remove this to use no image
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
```

- Action Menu

Styles: 

```javascript
const action_menu_styles = {
    // default
    ['default']: {
        mainHeaderBackground: 'rgba(31, 30, 30, 0.8)',
        mainHeaderBoxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
        mainHeaderBorder: '3px solid rgba(0, 0, 0, 0.5)',
        mainHeaderBorderRadius: '10px',
        mainHeaderColor: 'rgba(255, 255, 255, 0.8)',
        mainHeaderFontFamily: 'Roboto',
        mainHeaderImageBorder: undefined,
        mainHeaderImageBorderRadius: undefined,
        mainHeaderImageBoxShadow: undefined,
        mainHeaderFontSize: '1.0rem',
        mainHeaderWeight: 600,
        mainHeaderShadow: '0px 0px 8px 0px rgba(31, 30, 30, 0.8)',
        optionBackground: 'rgba(31, 30, 30, 0.8)',
        optionBoxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
        optionBorder: '3px solid rgba(0, 0, 0, 0.5)',
        optionBorderRadius: '10px',
        optionColor: 'rgba(255, 255, 255, 0.8)',
        optionFontFamily: 'Roboto',
        optionHeaderFontSize: '1.0rem',
        optionMessageFontSize: '1.0rem',
        optionHeaderWeight: 600,
        optionMessageWeight: 100,
        optionImageBorder: undefined,
        optionImageBorderRadius: undefined,
        optionImageBoxShadow: undefined,
        optionHeaderShadow: '0px 0px 8px 0px rgba(31, 30, 30, 0.8)',
        optionHoverBackground: 'rgba(31, 30, 30, 0.8)',
        optionHoverBoxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.5)',
        optionHoverColor: 'rgba(255, 255, 255, 1)',
        buttonBackground: 'rgba(31, 30, 30, 0.8)',
        buttonBorder: '3px solid rgba(0, 0, 0, 0.5)',
        buttonBorderRadius: '15px',
        buttonBoxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
        buttonFontSize: '1.0rem',
        buttonFontFamily: 'Roboto',
        buttonFontWeight: 600,
        buttonColor: 'rgba(255, 255, 255, 0.8)',
        buttonHoverBackground: 'rgba(31, 30, 30, 0.9)',
        buttonHoverBoxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.9)',
        buttonHoverColor: 'rgba(255, 255, 255, 1)'
    },
};
```

Export:

```lua
exports['boii_ui']:open_action_menu('default', action_menu_data)
```

Example Menu: 

```lua
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
```

- Input

Styles:

```javascript
const input_styles = {
    // default
    ['default']: {
        mainHeaderBackground: 'rgba(31, 30, 30, 0.8)',
        mainHeaderBoxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
        mainHeaderBorder: '3px solid rgba(0, 0, 0, 0.5)',
        mainHeaderBorderRadius: '10px',
        mainHeaderColor: 'rgba(255, 255, 255, 0.8)',
        mainHeaderFontFamily: 'Roboto',
        mainHeaderImageBorder: undefined,
        mainHeaderImageBorderRadius: undefined,
        mainHeaderImageBoxShadow: undefined,
        mainHeaderFontSize: '1.0rem',
        mainHeaderWeight: 600,
        mainHeaderShadow: '0px 0px 8px 0px rgba(31, 30, 30, 0.8)',
        optionBackground: 'rgba(31, 30, 30, 0.8)',
        optionBoxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
        optionBorder: '3px solid rgba(0, 0, 0, 0.5)',
        optionBorderRadius: '10px',
        optionColor: 'rgba(255, 255, 255, 0.8)',
        optionFontFamily: 'Roboto',
        optionHeaderFontSize: '1.0rem',
        optionMessageFontSize: '1.0rem',
        optionHeaderWeight: 600,
        optionMessageWeight: 100,
        optionImageBorder: '3px solid rgba(0, 0, 0, 0.5)',
        optionImageBorderRadius: '10px',
        optionImageBoxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
        optionHeaderShadow: '0px 0px 8px 0px rgba(31, 30, 30, 0.8)',
        optionHoverBackground: 'rgba(31, 30, 30, 0.8)',
        optionHoverBoxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.5)',
        optionHoverColor: 'rgba(255, 255, 255, 1)',
        buttonBackground: 'rgba(31, 30, 30, 0.8)',
        buttonBorder: '3px solid rgba(0, 0, 0, 0.5)',
        buttonBorderRadius: '10px',
        buttonBoxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
        buttonFontSize: '1.0rem',
        buttonFontFamily: 'Roboto',
        buttonFontWeight: 600,
        buttonColor: 'rgba(255, 255, 255, 0.8)',
        buttonHoverBackground: 'rgba(31, 30, 30, 0.9)',
        buttonHoverBoxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.9)',
        buttonHoverColor: 'rgba(255, 255, 255, 1)'
    },
}
```

Export:

```lua
exports['boii_ui']:open_input('default', input_data)
```

Example Input:

```lua
-- Input example
local input_data = {
    main_header = { -- Main menu header
        text = 'Example Header', -- Header text
        image = '/html/assets/images/lspd.png', -- Image to display on header. Remove this to use no image
        icon = '<i class="fa-solid fa-bell"></i>' -- Icon to display next to header text. Remove this to use no icon
    },
    input_fields = {
        id = true, -- Toggle if id input should be displayed
        value = true, -- Toggle if value input should be displayed
    },
    input_button = {
        text = 'Submit', -- Submit 
        action_type = 'client_event', -- Type to trigger on click this can be removed. Actions: 'client_event', 'server_event'
        action = 'boii_ui:cl:input_test_event', -- Name of event to trigger
        params = {}, -- Event params
        should_close = true, -- Toggle whether event should close the input ui
    },
}
```

### PREVIEW
https://www.youtube.com/watch?v=wauI7hyfrqE

### SUPPORT
https://discord.gg/boiidevelopment
