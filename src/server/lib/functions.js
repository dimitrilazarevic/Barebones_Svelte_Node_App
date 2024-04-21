function generateString(length) 
{
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';

    for ( let i = 0; i < length; i++ ) 
    {
        result += 
        characters
        .charAt
        (Math.floor
            (Math.random() * charactersLength)
        );
    }
    return result;
}

function filterEmptyFields(object) 
{
    for (const key in object) 
    {
        if (object[key] == '') 
        {
            delete object[key];
        }
    }
    return object
}

module.exports = { generateString, filterEmptyFields };