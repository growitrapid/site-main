

/**
 * @description Format a date to a string
 * 
 * 'y' => full year (2021)
 * 'yy' => short year (21)
 * 'yyyy' => full year (2021)
 * 
 * 'M' => month (1)
 * 'MM' => month (01) leading zero
 * 'MMM' => month (Jan)
 * 'MMMM' => month (January)
 * 
 * 'd' => day (1)
 * 'dd' => day (01) leading zero
 * 'df' => day (1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th)
 * 'ddd' => day (Mon)
 * 'dddd' => day (Monday)
 * 
 * 'H' => hour (0-23)
 * 'HH' => hour (00-23) leading zero
 * 
 * 'h' => hour (0-12)
 * 'hh' => hour (00-12) leading zero
 * 
 * 'm' => minute (0-59)
 * 'mm' => minute (00-59) leading zero
 * 
 * 's' => second (0-59)
 * 'ss' => second (00-59) leading zero
 * 
 * 'f' => millisecond (0-9) single digit
 * 'ff' => millisecond (00-99) double digit
 * 'fff' => millisecond (000-999) triple digit
 * 
 * 'T' => AM/PM (A/P)
 * 'TT' => AM/PM (AM/PM)
 * 
 * 't' => am/pm (a/p)
 * 'tt' => am/pm (am/pm)
 * 
 * 'K' => timezone (+05:30)
 * 
 * @param date {Date}
 * @param format {string}
 * @param utc {boolean}
 * @returns 
 */
export default function formatDate(date: Date, format: string, utc?: boolean) {
    var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i: number, len?: number) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }

    // y, M, d, H, h, m, s, f, T, t, tz, day

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])\$yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])\$yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])\$y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])\$MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])\$MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])\$MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])\$M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])\$dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])\$ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])\$dd/g, "$1" + ii(d));
    let th = "th"
    if (d - (Math.floor(d / 10) * 10) === 1) {
        th = "st"
    }
    if (d - (Math.floor(d / 10) * 10) === 2) {
        th = "nd"
    }
    if (d - (Math.floor(d / 10) * 10) === 3) {
        th = "rd"
    }
    format = format.replace(/(^|[^\\])\$df/g, "$1" + d + th);
    format = format.replace(/(^|[^\\])\$d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])\$HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])\$H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])\$hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])\$h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])\$mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])\$m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])\$ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])\$s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])\$fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])\$ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])\$f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])\$TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])\$T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])\$tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])\$t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])\$K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
};
