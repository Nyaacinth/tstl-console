let L_debug = globalThis["debug"]

/** Console module */
namespace console {
    /** ANSI Color Codes */
    const color_codes: {[type: string]: string | undefined} = {
        reset: "\027[0m",
        trace: "\027[34m",
        debug: "\027[36m",
        info: "\027[32m",
        warn: "\027[33m",
        error: "\027[31m",
        fatal: "\027[35m"
    }

    /** Cache of `isWindows()` */
    let _isWindows: boolean

    /** Check if running windows */
    function isWindows() {
        if (isWindows == undefined) {
            _isWindows = (loadstring ?? load)("type(package) == 'table' and type(package.config) == 'string' and package.config:sub(1,1) == '\\'")[0]!()
        }
        return _isWindows
    }

    /**
     * Dump objects to string
     * @param obj Object to dump
     */
    function dumpString(obj: unknown) {
        if (type(obj) == "table") {
            if (Array.isArray(obj)) {
                if (obj.length > 0) {
                    let result = "["
                    obj.forEach((value) => {
                        result += dumpString(value) + ", "
                    })
                    return string.sub(result, 1, -3) + "]"
                } else {
                    return "[]"
                }
            } else {
                let result = "{"
                let empty = true
                for (let key in obj as any) {
                    let value = (obj as any)[key]
                    result += `${dumpString(key)}: ${dumpString(value)}, `
                    empty = false
                }
                return (empty ? result : string.sub(result, 1, -3)) + "}"
            }
        } else {
            if (typeof obj == "string") {
                return '"' + obj + '"'
            }
            if (type(obj) == "nil") {
                return "undefined"
            }
            if (type(obj) == "function" || type(obj) == "thread" || type(obj) == "userdata") {
                return "<" + tostring(obj) + ">"
            }
            return tostring(obj)
        }
    }

    /** Indent, for `group()` and `groupEnd()` usage */
    let indent = 0

    /** Indent Symbol to Repeat */
    let indent_symbol = "    "

    /**
     * Print formated info
     * @param info_type Info type, label and color code
     * @param contents Contents to print
     */
    function printInfo(info_type: string, ...contents: unknown[]) {
        let all_content = ""
        for (let content of contents) {
            all_content += (typeof content == "string" ? content : dumpString(content)) + "\t"
        }
        let color = isWindows() ? "" : color_codes[info_type] ?? ""
        let reset = isWindows() ? "" : color_codes.reset
        print(string.rep(indent_symbol, indent) + `${color}[${info_type.toUpperCase()} ${os.date("%X")}] >>>${reset} ${all_content}`)
    }

    /**
     * Log a message and stack trace to console if the first argument is `false`
     * @param assertion Any boolean expression
     * @param messages Messages or objects to dump
     */
    export function assert(assertion: boolean, ...messages: any[]) {
        if (assertion) {
            return
        }
        let color = isWindows() ? "" : color_codes.error
        let reset = isWindows() ? "" : color_codes.reset
        print(
            color +
                L_debug.traceback(
                    "Assertion failed: " +
                        (() => {
                            if (messages.length > 0) {
                                let result = ""
                                for (let i = 0; i < messages.length; i++) {
                                    result += dumpString(messages[i]) + ", "
                                }
                                return string.sub(result, 1, -3)
                            } else {
                                return "(no messages)"
                            }
                        })(),
                    2
                ) +
                reset
        )
    }

    /** Clear the console */
    export function clear() {
        if (!os.execute("clear")) {
            if (!os.execute("cls")) {
                for (let i = 0; i < 256; i++) {
                    print("\n\n")
                }
            }
        }
        print("[Console was cleared]")
    }

    /** Counters */
    let count_storage: {[label_src: string]: number} = {}

    /**
     * Log the number of times this line has been called with the given label
     * @param label Label, defaults to "default"
     */
    export function count(label: string = "default") {
        let caller = L_debug.getinfo(2)
        let label_src = label + (caller ? caller.source + caller.currentline.toString() : "")
        if (!count_storage[label_src]) {
            count_storage[label_src] = 0
        }
        count_storage[label_src] += 1
        print(`${label}: ${count_storage[label_src]}`)
    }

    /**
     * Resets the value of the counter with the given label
     * @param label Label, defaults to "default"
     */
    export function countReset(label: string = "default") {
        for (let label_src in count_storage) {
            if (string.match(label_src, "^" + label)) {
                count_storage[label_src] = 0
            }
        }
    }

    /**
     * Outputs a message to the console with the log level `debug`
     * @param contents Contents to output
     */
    export function debug(...contents: any[]) {
        printInfo("debug", ...contents)
    }

    /**
     * Outputs an error message
     * @param contents Contents to output
     */
    export function error(...contents: any[]) {
        printInfo("error", ...contents)
    }

    /** Creates a new inline group, indenting all following output by another level. To move back out a level, call `groupEnd()` */
    export function group() {
        indent += 1
    }

    /** Exits the current inline group */
    export function groupEnd() {
        indent = math.max(0, indent - 1)
    }

    /**
     * Informative logging of information
     * @param contents Contents to output
     */
    export function info(...contents: any[]) {
        printInfo("info", ...contents)
    }

    /**
     * For general output of logging information
     * @param contents Contents to output
     */
    export function log(...contents: any[]) {
        printInfo("log", ...contents)
    }

    /** Timers */
    let timers: {[name: string]: number}

    /**
     * Starts a timer with a name specified as an input parameter
     * @param label Label, defaults to "default"
     */
    export function time(label: string = "default") {
        if (timers[label]) {
            printInfo("warn", `Timer "${label}" already exists`)
            return
        }
        timers[label] = os.clock()
    }

    /**
     * Logs the value of the specified timer to the console
     * @param label Label, defaults to "default"
     */
    export function timeLog(label: string = "default") {
        if (!timers[label]) {
            printInfo("warn", `Timer "${label}" does not exist`)
            return
        }
        print(label + ": " + (os.clock() - timers[label]).toString())
    }

    /**
     * Stops the specified timer and logs the elapsed time in milliseconds since it started
     * @param label Label, defaults to "default"
     */
    export function timeEnd(label: string = "default") {
        timeLog(label)
        delete timers[label]
    }

    /**
     * Outputs a stack traceback and dump objects
     * @param objs objects to dump
     */
    export function trace(...objs: any[]) {
        print(
            L_debug.traceback(
                (() => {
                    if (objs.length > 0) {
                        let result = ""
                        for (let i = 0; i < objs.length; i++) {
                            result += dumpString(objs[i]) + ", "
                        }
                        return ">>> " + string.sub(result, 1, -3)
                    } else {
                        return "[Console required the traceback]"
                    }
                })(),
                2
            )
        )
    }

    /**
     * Outputs a warning message
     * @param contents Contents to output
     */
    export function warn(...contents: any[]) {
        printInfo("warn", ...contents)
    }
}

export default console
