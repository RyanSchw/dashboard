// be careful for https://www.typescriptlang.org/docs/handbook/enums.html#const-enum-pitfalls
enum WeatherDataType {
    // metadata
    DATETIME,

    // data
    TEMPERATURE,

    // descriptors
    ICON,
}

export default WeatherDataType;
