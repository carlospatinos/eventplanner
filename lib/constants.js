const parseDate = (str) => {
    if (!/^(\d){8}$/.test(str)) return "invalid date";
    var y = str.substr(0, 4),
        m = str.substr(4, 2),
        d = str.substr(6, 2);
    return new Date(y, m, d);
};

STATUS = {
    STATUS_CONFIRMED: 'confirmed',
    STATUS_DECLINED: 'declined',
    STATUS_ARRIVED: 'arrived',
    STATUS_ARRIVED: 'pending',
}

FROZEN_STATUS = Object.freeze(STATUS)

module.exports = FROZEN_STATUS;

