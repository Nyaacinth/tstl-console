--[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
---[[ Lua Library inline imports
local function __TS__ArrayIsArray(value)
    return (type(value) == "table") and ((value[1] ~= nil) or (next(value, nil) == nil))
end
local function __TS__ArrayForEach(arr, callbackFn)
    do
        local i = 0
        while i < #arr do
            callbackFn(_G, arr[i + 1], i, arr)
            i = i + 1
        end
    end
end
local function __TS__ObjectGetOwnPropertyDescriptors(object)
    local metatable = getmetatable(object)
    if not metatable then
        return {}
    end
    return rawget(metatable, "_descriptors") or ({})
end
local function __TS__Delete(target, key)
    local descriptors = __TS__ObjectGetOwnPropertyDescriptors(target)
    local descriptor = descriptors[key]
    if descriptor then
        if not descriptor.configurable then
            error(
                ((("Cannot delete property " .. tostring(key)) .. " of ") .. tostring(target)) .. ".",
                0
            )
        end
        descriptors[key] = nil
        return true
    end
    if target[key] ~= nil then
        target[key] = nil
        return true
    end
    return false
end
---]] Lua Library inline imports

local ____exports = {}
local L_debug = _G.debug
local console = {}
do
    local color_codes = {reset = "\027[0m", trace = "\027[34m", debug = "\027[36m", info = "\027[32m", warn = "\027[33m", error = "\027[31m", fatal = "\027[35m"}
    local _isWindows
    local function isWindows()
        if isWindows == nil then
            _isWindows = (loadstring or load)("type(package) == 'table' and type(package.config) == 'string' and package.config:sub(1,1) == '\\'")()
        end
        return _isWindows
    end
    local function dumpString(_, obj)
        if type(obj) == "table" then
            if __TS__ArrayIsArray(obj) then
                if #obj > 0 then
                    local result = "["
                    __TS__ArrayForEach(
                        obj,
                        function(____, value)
                            result = result .. (dumpString(nil, value) .. ", ")
                        end
                    )
                    return string.sub(result, 1, -3) .. "]"
                else
                    return "[]"
                end
            else
                local result = "{"
                local empty = true
                for key in pairs(obj) do
                    local value = obj[key]
                    result = result .. (((dumpString(nil, key) .. ": ") .. dumpString(nil, value)) .. ", ")
                    empty = false
                end
                return ((empty and result) or string.sub(result, 1, -3)) .. "}"
            end
        else
            if type(obj) == "string" then
                return ("\"" .. obj) .. "\""
            end
            if type(obj) == "nil" then
                return "undefined"
            end
            if ((type(obj) == "function") or (type(obj) == "thread")) or (type(obj) == "userdata") then
                return ("<" .. tostring(obj)) .. ">"
            end
            return tostring(obj)
        end
    end
    local indent = 0
    local indent_symbol = "    "
    local function printInfo(_, info_type, ...)
        local contents = {...}
        local all_content = ""
        for ____, content in ipairs(contents) do
            all_content = all_content .. ((((type(content) == "string") and content) or dumpString(nil, content)) .. "\t")
        end
        local color = (isWindows() and "") or (color_codes[info_type] or "")
        local reset = (isWindows() and "") or color_codes.reset
        print(
            string.rep(indent_symbol, indent) .. ((((((((color .. "[") .. string.upper(info_type)) .. " ") .. os.date("%X")) .. "] >>>") .. tostring(reset)) .. " ") .. all_content)
        )
    end
    function console.assert(_, assertion, ...)
        local messages = {...}
        if assertion then
            return
        end
        local color = (isWindows() and "") or color_codes.error
        local reset = (isWindows() and "") or color_codes.reset
        print(
            (tostring(color) .. L_debug.traceback(
                "Assertion failed: " .. (function()
                    if #messages > 0 then
                        local result = ""
                        do
                            local i = 0
                            while i < #messages do
                                result = result .. (dumpString(nil, messages[i + 1]) .. ", ")
                                i = i + 1
                            end
                        end
                        return string.sub(result, 1, -3)
                    else
                        return "(no messages)"
                    end
                end)(),
                2
            )) .. tostring(reset)
        )
    end
    function console.clear()
        if not os.execute("clear") then
            if not os.execute("cls") then
                do
                    local i = 0
                    while i < 256 do
                        print("\n\n")
                        i = i + 1
                    end
                end
            end
        end
        print("[Console was cleared]")
    end
    local count_storage = {}
    function console.count(_, label)
        if label == nil then
            label = "default"
        end
        local caller = L_debug.getinfo(2)
        local label_src = label .. ((caller and (caller.source .. tostring(caller.currentline))) or "")
        if not count_storage[label_src] then
            count_storage[label_src] = 0
        end
        count_storage[label_src] = count_storage[label_src] + 1
        print(
            (label .. ": ") .. tostring(count_storage[label_src])
        )
    end
    function console.countReset(_, label)
        if label == nil then
            label = "default"
        end
        for label_src in pairs(count_storage) do
            if {
                string.match(label_src, "^" .. label)
            } then
                count_storage[label_src] = 0
            end
        end
    end
    function console.debug(_, ...)
        printInfo(nil, "debug", ...)
    end
    function console.error(_, ...)
        printInfo(nil, "error", ...)
    end
    function console.group()
        indent = indent + 1
    end
    function console.groupEnd()
        indent = math.max(0, indent - 1)
    end
    function console.info(_, ...)
        printInfo(nil, "info", ...)
    end
    function console.log(_, ...)
        printInfo(nil, "log", ...)
    end
    local timers
    function console.time(_, label)
        if label == nil then
            label = "default"
        end
        if timers[label] then
            printInfo(nil, "warn", ("Timer \"" .. label) .. "\" already exists")
            return
        end
        timers[label] = os.clock()
    end
    function console.timeLog(_, label)
        if label == nil then
            label = "default"
        end
        if not timers[label] then
            printInfo(nil, "warn", ("Timer \"" .. label) .. "\" does not exist")
            return
        end
        print(
            (label .. ": ") .. tostring(
                os.clock() - timers[label]
            )
        )
    end
    function console.timeEnd(_, label)
        if label == nil then
            label = "default"
        end
        console.timeLog(nil, label)
        __TS__Delete(timers, label)
    end
    function console.trace(_, ...)
        local objs = {...}
        print(
            L_debug.traceback(
                (function()
                    if #objs > 0 then
                        local result = ""
                        do
                            local i = 0
                            while i < #objs do
                                result = result .. (dumpString(nil, objs[i + 1]) .. ", ")
                                i = i + 1
                            end
                        end
                        return ">>> " .. string.sub(result, 1, -3)
                    else
                        return "[Console required the traceback]"
                    end
                end)(),
                2
            )
        )
    end
    function console.warn(_, ...)
        printInfo(nil, "warn", ...)
    end
end
____exports.default = console
return ____exports
