export function formToJson(f){
    let object = {};
    f.forEach((value,key) => object[key]=value);
    let json = JSON.stringify(object) ;
    return json ;
}
