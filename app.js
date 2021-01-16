//Storage controller
const StorageController = (function () {


})();

//Product controller
const ProductController = (function () {

    //private
    const Product = function (id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;

    }

    const data = {
        products: [


            { id: 0, name: 'Monitor', price: 100 },
            { id: 1, name: 'RAM', price: 300 },
            { id: 2, name: 'Klavye', price: 50 },
            { id: 3, name: 'Mouse', price: 40 }
        ],
        selectedProduct: null,
        totalPrice: 0
    }

    //public
    return {
        getProducts: function () {
            return data.products;

        },
        getData: function () {
            return data;
        },
        addProduct: function (name, price) {
            let id;

            if (data.products.length > 0) {
                id = data.products[data.products.length - 1].id + 1;
            }
            else {
                id = 0;
            }

            const newProduct = new Product(id, name, price);
            data.products.push(newProduct);
            return newProduct;
        },

        getTotal: function () {
            let total = 0;
            data.products.forEach(function (item) {

                total += item.price;
            });
            data.totalPrice = total;
            return data.totalPrice;
        },
        getProductById: function (id) {
            let product = null;

            data.products.forEach(function (prd) {
                if (prd.id == id) {
                    product = prd;
                }
            })
            return product;

        },

        deleteProduct : function(){
            data.products.forEach(function(prd,index){
                if(prd.id == product.id){
                    data.products.splice(index ,1);
                }

            });

        },


        setCurrentProduct: function (product) {
            data.selectedProduct = product;
        },
        getCurrentProduct: function () {
            return data.selectedProduct;
        },
        updateProduct: function (name, priice) {
            let product = null;
            data.products.forEach(function (prd) {
                if (prd.id == data.selectedProduct.id) {
                    prd.name = name;
                    prd.price = price;
                    product = prd;
                }

            });

            return product;

        }

    }

})();

//UI controller
const UIController = (function () {
    const Selectors = {
        productList: "#item-list",
        addButton: ".addBtn",
        updateButton: ".updateBtn",
        deleteButton: ".deleteBtn",
        cancelButton: ".cancelBtn",
        productName: "#productName",
        productPrice: "#productPrice",
        totalTL: "#total-tl",
        totalDolar: "#total-dolar",
        productListItems: "#item-list tr"

    }


    return {
        createProductsList: function (products) {
            let html = '';

            products.forEach(prd => {
                html += `
                </tr>
                <tr>
                   <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td> ${prd.price} $</td>
                    <td class="text-right"> 
                    <i class="far fa-edit edit-product"></i></td>
                </tr>
                `;
            });
            document.querySelector(Selectors.productList).innerHTML = html;
        },
        getSelectors: function () {
            return Selectors;
        },
        addProduct: function (prd) {
            var item = products.forEach(prd => {
                html += `
                </tr>
                <tr>
                   <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td> ${prd.price} $</td>
                    <td class="text-right"> 
                    <i class="far fa-edit edit-product"></i></td>
                </tr>
                `;
            });
            document.querySelector(Selectors.productsList).innerHTML += item;
        },

        clearInputs: function () {
            document.querySelector(Selectors.productName).value = '';
            document.querySelector(Selector.productPrice).value = '';
        },

        clearWarnings :function (){
            const items =document.querySelectorAll(Selectors.productListItems);
            items.forEach(function(item){
                if(item.classList.contains('bg-warning')){
                    item.classList.remove('bg-warning');
                }

            });
        },
        showTotal: function (total) {
            document.querySelector(Selectors.totalDolar).textContent = total;
            document.querySelector(Selectors.totalTL).textContent = total * 7.4;
        },
        addProductToForm: function () {
            const selectedProduct = ProductController.getCurrentProduct();
            document.querySelector(Selectors.productName).value =
                selectedProduct.name();
            document.querySelector(Selectors.productPrice).value =
                selectedProduct.price();

        },

        addingState: function () {

            UIController.clearWarnings();
            UIController.clearInputs();
            document.querySelector(Selectors.addButton).style.display = "inline";
            document.querySelector(Selectors.updateButton).style.display = "none";
            document.querySelector(Selectors.deleteButton).style.display = "none";
            document.querySelector(Selectors.cancelButton).style.display = "none";
        },
        editState: function (tr) {

            tr.classList.add('bg-warning');
            document.querySelector(Selectors.addButton).style.display = "none";
            document.querySelector(Selectors.updateButton).style.display = "inline";
            document.querySelector(Selectors.deleteButton).style.display = "inline";
            document.querySelector(Selectors.cancelButton).style.display = "inline";
        },

        //update ui
        updateProduct: function (prd) {

            let updateItem = null;
            let items = document.querySelectorAll(Selectors.productsListItems);
            items.forEach(function (item) {
                if (item.classList.contains('bg-warning')) {
                    item.children[1].textContent = prd.name;
                    item.children[2].textContent = prd.price + '$';
                    updateItem = items;
                }
            });


            return updateItem;


        },
        //delete ui
        deleteProduct :function(){
            let items= document.querySelectorAll(Selectors.productListItems);
            items.forEach(function(item){
                if(item.classList.contains='bg-warnings'){
                    item.remove();
                }
            })
        }



    }


})();

//App controller
const App = (function (ProductCtrl, UICtrl) {
    const UISelectors = UICtrl.getSelectors();
    //Loqd Evet Listeners
    const loadEventListeners = function () {
        //edit product
        document.querySelector(UISelectors.productsList).addEventListener('click', productEditClick);

        //add product event
        document.querySelector(UISelectors.addButton).addEventListener('click', productAddSubmit);

        //edit product submit
        document.querySelector(UISelectors.updateButton).addEventListener('click'.editProductSubmit);

        //cancel button click
        document.querySelector(UISelector.cancelButton).addEventListener('click', cancelUpdate);

        //delete button click
        document.querySelector(UISelectors.deleteButton).addEventListener('click',deleteProductSubmit);
    }


    const editProductSubmit = function (e) {
        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;
        if (productName !== '' && productPrice !== '') {

            //update product
            const updateProduct = ProductCtrl.updateProduct(productName, productPrice);

            //update ui
            let item = UICtrl.updateProduct(updateProduct);

            //get total
            const total = ProductCtrl.getTotal();

            //show total
            UICtrl.showTotal(total);
            UICtrl.addingState();

        }

        e.preventDefault();
    }

    const productAddSubmit = function (e) {
        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {
            //add product
            const newProduct = ProductCtrl.addProduct(productName, productPrice);
            UIController.addProduct(newProduct);
            //clear inputs
            UIController.clearInputs();

            //get total
            const total = ProductCtrl.getTotal();

            //show total
            UICtrl.showTotal(total);




        }

        e.preventDefault();
    }

    const productEditClick = function (e) {
        if (e.target.classList.contains('edit-product')) {
            const id =
                e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

            //get selected product
            const product = ProductCtrl.getProductById(id);

            //set current product
            ProductCtrl.setCurrentProduct(product);

            //add product UI
            UICtrl.addProductToForm();
            UICtrl.clearWarnings();
        }


        e.preventDefault();
    }

    const cancelUpdate = function(e){
        UICtrl.addingState();
        UICtrl.clearWarnings();


        e.preventDefault();
    }
    const deleteProductSubmit = function(e){
        //get selected product
        const selectedProduct= ProductCtrl.getCurrentProduct();

        //delete product
        ProductCtrl.deleteProduct(selectedProduct);
        //delete ui
        UICtrl.deleteProduct();
         //get total
         const total = ProductCtrl.getTotal();

         //show total
         UICtrl.showTotal(total);
         UICtrl.addingState();



        e.preventDefault();
    }




    return {
        init: function () {
            console.log('starting app...');
            const products = ProductController.getProducts();

            UICtrl.createProductsList(products);
            //load event listenners
            loadEventListeners();

            UICtrl.addingState();

            UICtrl.editState(e.taarget.parentNode.parentNode);
        }
    }


})(ProductController, UIController);

App.init();
