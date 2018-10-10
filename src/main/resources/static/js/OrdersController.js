/*var orders = [{
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
*/
var orders = new Array();


// adds an order (a new table below the most recent table)
function addOrder() {

    
}

// removes an order table with a given id
function deleteOrder(id) {
    var tbl = document.getElementById('t' + id);
    tbl.parentNode.removeChild(tbl);
    console.log("Deleted table t" + id + " ->", tbl);
}

// loads the orders from the Orders API and loads the orders from the server
function loadOrders() {
    axios.get('/orders')
      .then(function (response) {
		orders = response.data;
		
		var body = document.getElementsByTagName('main')[0];
		for (var ord in orders) {
			var tbl = document.createElement('table');
			tbl.setAttribute('id', 't' + ord);
			tbl.setAttribute('class', 'table table-bordered table-striped table-sm table-dark');

			var cap = document.createElement('caption');
			tex = document.createTextNode('Order #' + ord);
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
			
			var keys = ["PIZZA", 3, "10000", "HOTDOG", 1, "3000", "COKE", 4, "1300"];
			//var keys = Object.keys(orders[ord].orderAmountsMap);  // ["PIZZA", "HOTDOG", "COKE"]
			//var values = Object.values(orders[ord].orderAmountsMap);  // [3, 1, 4]
			var values = [3,1,4];
			
			/*for (var k = 0; k < values.length; k++) {
				keys.splice(2*k+1, 0, values[k]);  // ["PIZZA", "3", "HOTDOG", "1", "COKE", "4"]
			}
			console.log(keys);
			*/
			
			var p = 0;
			for (var i = 0; i < values.length; i++) {
				var tr = document.createElement('tr');
				while (p < 3 * (i + 1)){
					var td = document.createElement('td');
					td.appendChild(document.createTextNode(keys[p]));
					tr.appendChild(td);
					p++;
				}
				tbdy.appendChild(tr);
			}
			tbl.appendChild(tbdy);
			
			body.appendChild(tbl);

			console.log("Loaded table t" + ord + " ->", tbl);
		}
      })
      .catch(function (error) {
        console.log("There is a problem with our servers. We apologize for the inconvenience, please try again later");
      });

}
        