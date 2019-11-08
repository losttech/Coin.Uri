function main(){
    if (!window.location.hash || window.location.hash == '#') {
        return;
    }

    var hash = window.location.hash;
    if (hash.startsWith("#")) {
        hash = hash.substr(1);
    }
    if (hash.startsWith("eth?")){
        hash = hash.substr(4);
    } else {
        console.error("only ETH is supported");
        return;
    }
    let url = new URL("http://eth/?" + hash);
    var query = "?";
    url.searchParams.forEach((val, param) => {
        if (query.length > 1) { query += "&"; }
        switch(param) {
        case "tx":
        case "key":
            query += param + "=" + encodeURIComponent(val);
            break;

        default:
            throw "parameter not supported: " + param;
        }
    });

    var destination = "coin:eth" + query;
    console.log(destination);
    window.location.assign(destination);
}

main();
