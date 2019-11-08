async function main(){
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
    let url:any = new URL("http://eth/?" + hash);
    var query = "?";
    url.searchParams.forEach((val, param) => {
        if (query.length > 1) { query += "&"; }
        switch(param) {
        case "release_tx":
        case "key":
            query += param + "=" + encodeURIComponent(val);
            break;

        default:
            throw "parameter not supported: " + param;
        }
    });

    let coinAddress = "..";
    let web3: any = {
        getBalance: async function() { return 10; },
        getLastTransaction: async function() { return { timestamp: "2 days ago" }; },
    };
    let balance = await web3.getBalance(coinAddress);
    if (balance > 0) {
        var destination = "coin:eth" + query;
        console.log(destination);

        let claim = <HTMLAnchorElement>document.getElementById("claim");
        claim.href = destination;

        document.getElementById("claimed").remove();

        window.location.assign(destination);
    } else {
        let lastTransaction = await web3.getLastTransaction();
        document.getElementById("claimedDate").innerText = lastTransaction.timestamp;

        document.getElementById("available").remove();
    }

    document.getElementById("loading").remove();
}

main();
