
const objectReplacer = null;
const objectSpacing = 2;
const objectType = "object";
const readToken = "\n:";
const space = " ";

function stringArguments(functionArgs) {
    let output = "";

    for (let i = 0; i < functionArgs.length; ++i) {
        const arg = functionArgs[i];

        if (typeof (arg) === objectType) {
            output += JSON.stringify(arg, objectReplacer, objectSpacing);
        } else {
            output += arg;
        }

        output += space;
    }

    return output;
};

exports.error = function () {
    raster.printLine(stringArguments(arguments));
}

exports.warn = function() {
    raster.printLine(stringArguments(arguments));
}

exports.log = function () {
    raster.printLine(stringArguments(arguments));
}

exports.read = function () {
    const output = stringArguments(arguments) + readToken;
    raster.print(output);
    return raster.read();   
}