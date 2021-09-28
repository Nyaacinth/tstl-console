/** Console module */
declare namespace console {
    /**
     * Log a message and stack trace to console if the first argument is `false`
     * @param assertion Any boolean expression
     * @param messages Messages or objects to dump
     */
    function assert(assertion: boolean, ...messages: any[]): void;
    /** Clear the console */
    function clear(): void;
    /**
     * Log the number of times this line has been called with the given label
     * @param label Label, defaults to "default"
     */
    function count(label?: string): void;
    /**
     * Resets the value of the counter with the given label
     * @param label Label, defaults to "default"
     */
    function countReset(label?: string): void;
    /**
     * Outputs a message to the console with the log level `debug`
     * @param contents Contents to output
     */
    function debug(...contents: any[]): void;
    /**
     * Outputs an error message
     * @param contents Contents to output
     */
    function error(...contents: any[]): void;
    /** Creates a new inline group, indenting all following output by another level. To move back out a level, call `groupEnd()` */
    function group(): void;
    /** Exits the current inline group */
    function groupEnd(): void;
    /**
     * Informative logging of information
     * @param contents Contents to output
     */
    function info(...contents: any[]): void;
    /**
     * For general output of logging information
     * @param contents Contents to output
     */
    function log(...contents: any[]): void;
    /**
     * Starts a timer with a name specified as an input parameter
     * @param label Label, defaults to "default"
     */
    function time(label?: string): void;
    /**
     * Logs the value of the specified timer to the console
     * @param label Label, defaults to "default"
     */
    function timeLog(label?: string): void;
    /**
     * Stops the specified timer and logs the elapsed time in milliseconds since it started
     * @param label Label, defaults to "default"
     */
    function timeEnd(label?: string): void;
    /**
     * Outputs a stack traceback and dump objects
     * @param objs objects to dump
     */
    function trace(...objs: any[]): void;
    /**
     * Outputs a warning message
     * @param contents Contents to output
     */
    function warn(...contents: any[]): void;
}
export default console;
