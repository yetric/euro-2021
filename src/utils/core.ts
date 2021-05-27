export const chunks = (arr: any[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

export const dateToAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
export const calculateBmi = (weight: any, heightCm: number) => {
    return !isNaN(parseInt(weight)) && !isNaN(heightCm)
        ? Math.round(parseInt(weight) / (((heightCm / 100) * heightCm) / 100))
        : null;
};

export const median = (array: any[]) => {
    array = array.sort();
    if (array.length % 2 === 0) {
        // array with even number elements
        return (array[array.length / 2] + array[array.length / 2 - 1]) / 2;
    } else {
        return array[(array.length - 1) / 2]; // array with odd number elements
    }
};

export const groupLength = (length: number) => {
    if (length < 170) {
        return "- 170";
    } else if (length >= 170 && length < 175) {
        return "170 - 174";
    } else if (length >= 175 && length < 180) {
        return "175 - 179";
    } else if (length >= 180 && length < 185) {
        return "180 - 184";
    } else if (length >= 185 && length < 190) {
        return "185 - 189";
    } else if (length >= 190 && length < 195) {
        return "190 - 194";
    } else if (length >= 195 && length < 200) {
        return "195 - 199";
    } else if (length >= 200) {
        return "200 -";
    }
    return "-";
};

export const groupAge = (age: number) => {
    if (age < 20) {
        return "- 20";
    } else if (age >= 20 && age < 25) {
        return "20 - 24";
    } else if (age >= 25 && age < 30) {
        return "25 - 29";
    } else if (age >= 30 && age < 35) {
        return "30 - 34";
    } else if (age >= 35 && age < 40) {
        return "35 - 39";
    } else if (age >= 40) {
        return "40 -";
    }
    return "-";
};

export const groupWeight = (weight: number) => {
    if (weight < 70) {
        return "- 70";
    } else if (weight >= 70 && weight < 75) {
        return "70 - 74";
    } else if (weight >= 75 && weight < 80) {
        return "75 - 79";
    } else if (weight >= 80 && weight < 85) {
        return "80 - 84";
    } else if (weight >= 85 && weight < 90) {
        return "85 - 89";
    } else if (weight >= 90) {
        return "90 -";
    }
    return "-";
};

export const sortObjectByKeyName = (obj: any) => {
    return Object.keys(obj)
        .sort()
        .reduce(function (result: any, key: any) {
            result[key] = obj[key];
            return result;
        }, {});
};

export const isValidNumber = (val: number | null) => val && !isNaN(val) && isFinite(val);
