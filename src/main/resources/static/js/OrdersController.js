var orders = [{
        "order_id": 1,
        "table_id": 1,
        "products": [{
                "product": "PIZZA",
                "quantity": 3,
                "price": "$10000"
            },
            {
                "product": "HOTDOG",
                "quantity": 1,
                "price": "$3000"
            },
            {
                "product": "COKE",
                "quantity": 4,
                "price": "$1300"
            }
        ]
    },
    {
        "order_id": 2,
        "table_id": 2,
        "products": [{
                "product": "PIZZA",
                "quantity": 3,
                "price": "$15.000"
            },
            {
                "product": "HAMBURGER",
                "quantity": 1,
                "price": "$12.300"
            }
        ]
    }];


// adds an order (a new table below the existing Order 1 table)
function addOrder() {
    var body = document.getElementsByTagName('main')[0];
    for (var ord = 0; ord < orders.length; ord++) {
        var tbl = document.createElement('table');
        tbl.setAttribute('id', 't' + orders[0].table_id);
        tbl.setAttribute('class', 'table table-bordered table-striped table-sm table-dark');

        var cap = document.createElement('caption');
        tex = document.createTextNode('Order #' + orders[ord].table_id);
        cap.appendChild(tex);
        tbl.appendChild(cap);

        var thd = document.createElement('thead');
        thd.setAttribute('class', 'thead-light');
        var trh = document.createElement('tr');
        for (var h = 0; h < 3; h++) {
            var th = document.createElement('th');
            th.setAttribute('scope', 'col');
            switch (h) {
                case 0:
                    th.appendChild(document.createTextNode('Product'));
                    break;
                case 1:
                    th.appendChild(document.createTextNode('Quantity'));
                    break;
                case 2:
                    th.appendChild(document.createTextNode('Price'));
                    break;
            }
            trh.appendChild(th);
        }
        thd.appendChild(trh);
        tbl.appendChild(thd);

        var tbdy = document.createElement('tbody');
        var elem = Object.values(orders[ord].products);
        for (var i = 0; i < elem.length; i++) {
            var tr = document.createElement('tr');
            for (var key in elem[i]) {
                var td = document.createElement('td');
                if (elem[i].hasOwnProperty(key)) {
                    td.appendChild(document.createTextNode(elem[i][key]));
                    tr.appendChild(td);
                }
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);


        body.appendChild(tbl);


        //alert('A new order has been added!');
        console.log("Added table t" + orders[ord].table_id + " ->", tbl);
    }
    
}

// removes an order table with a given id
function deleteOrder(id) {
    var tbl = document.getElementById('t' + id);
    tbl.parentNode.removeChild(tbl);
    alert('Order #' + id + ' was removed!');
    console.log("Deleted table -> ", tbl);
}

// loads the orders (creates the HTML tables) from a mocked list of orders
function loadOrders() {
    addOrder();
    axios.get("/orders")
            .then(function (response) {
                console.log(response.data);
                for (var k in response.data) {
                    if (response.data.hasOwnProperty(k)) {
                        console.log(k);
                    } 
                }
            })
            .catch(function (error) {
                console.log("There is a problem with our servers. We apologize for the inconvince, please try again later");
            });

}
        