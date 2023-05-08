### QB-CORE EDITS

For people using qb-core to integrate the UI elements into the framework directly follow the instructions below.
Replaceing the functions instructed should ensure that everything within your server will be updated to use the new UI elements.
However, due to the differences elements will default to a base template since qb-core does not use custom styles.

> Notifications

- To replace your qb-core native notifications find the following function in `qb-core/client/functions.lua`; 

```lua
function QBCore.Functions.Notify(text, texttype, length)
    if type(text) == "table" then
        local ttext = text.text or 'Placeholder'
        local caption = text.caption or 'Placeholder'
        texttype = texttype or 'primary'
        length = length or 5000
        SendNUIMessage({
            action = 'notify',
            type = texttype,
            length = length,
            text = ttext,
            caption = caption
        })
    else
        texttype = texttype or 'primary'
        length = length or 5000
        SendNUIMessage({
            action = 'notify',
            type = texttype,
            length = length,
            text = text
        })
    end
end
```

- And replace with the following function; 

```lua
function QBCore.Functions.Notify(text, texttype, length)
    local message = text or 'Placeholder'
    local style = texttype or 'primary'
    local duration = length or 5000
    exports['boii_ui']:notify(nil, message, style, duration)
end
```

> Progressbar

- To replace your qb-core native progressbar find the following function in `qb-core/client/functions.lua`;

```lua
function QBCore.Functions.Progressbar(name, label, duration, useWhileDead, canCancel, disableControls, animation, prop, propTwo, onFinish, onCancel)
    if GetResourceState('progressbar') ~= 'started' then error('progressbar needs to be started in order for QBCore.Functions.Progressbar to work') end
    exports['progressbar']:Progress({
        name = name:lower(),
        duration = duration,
        label = label,
        useWhileDead = useWhileDead,
        canCancel = canCancel,
        controlDisables = disableControls,
        animation = animation,
        prop = prop,
        propTwo = propTwo,
    }, function(cancelled)
        if not cancelled then
            if onFinish then
                onFinish()
            end
        else
            if onCancel then
                onCancel()
            end
        end
    end)
end
```

- And replace with the following function;

```lua
function QBCore.Functions.Progressbar(name, label, duration, useWhileDead, canCancel, disableControls, animation, prop, propTwo, onFinish, onCancel, style)
    if GetResourceState('boii_ui') ~= 'started' then error('boii_ui needs to be started in order for QBCore.Functions.Progressbar to work') end
    local text = label
    local style = style or 'default'
    local timer = duration/100
    local allow_dead = useWhileDead
    local controls = disableControls
    local function combine_callbacks(finish)
        if finish and onFinish then
            onFinish()
        elseif not finish and onCancel then
            onCancel()
        end
    end
    exports['boii_ui']:progress(text, style, timer, allow_dead, controls, animation, combine_callbacks)
end
```

> Drawtext

- To replace your qb-core native drawtext find the following functions in `qb-core/client/drawtext.lua`;

```lua
local function hideText()
    SendNUIMessage({
        action = 'HIDE_TEXT',
    })
end

local function drawText(text, position)
    if type(position) ~= "string" then position = "left" end
    SendNUIMessage({
        action = 'DRAW_TEXT',
        data = {
            text = text,
            position = position
        }
    })
end
```

- And replace with the following functions;

```lua
local function hideText()
    exports['boii_ui']:hide_drawtext()
end

local function drawText(text, position, header, style)
    local header = header or nil
    local style = style or 'default'
    exports['boii_ui']:show_drawtext(header, text, style)
end
```