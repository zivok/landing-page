export default function Interval(values = {}) {
    const {element, inf, sup} = values;
    this.inf = element ? element.offsetTop : inf;
    this.sup = element ? element.offsetTop + element.offsetHeight : sup;
}

Interval.prototype.includes = function(value) {
    return value >= this.inf && value <= this.sup;
}

Interval.prototype.displace = function(value) {
    this.inf += value;
    this.sup += value;
    return this;
}