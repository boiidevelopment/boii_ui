----------------------------------
--<!>-- BOII | DEVELOPMENT --<!>--
----------------------------------

# BOII | DEVELOPMENT - UTILITY; UI ELEMENTS

Here we have a large UI pack to cover most things you may need in your city.
Every element is modular to allow citizens the option of customising their UI.
Most elements come with extensive customisation options to allow you to tweak the UI to your server's style.
Includes: notifications, progressbar, drawtext ui, and a skill circle.
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

### PREVIEW
coming soon..

### SUPPORT
https://discord.gg/boiidevelopment