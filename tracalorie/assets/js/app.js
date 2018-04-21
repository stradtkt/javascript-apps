//Storage Controller


//Item Controller

const ItemCtrl = (function() {
  const Item = function(id, name, calories) {
    this.id= id;
    this.name = name;
    this.calories = calories;
  }

  const data = {
    items: [
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Eggs', calories: 100},
      {id: 2, name: 'Cereal', calories: 1000},
    ],
    currentItem: null,
    totalCalories: 0
  }
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      if(data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      calories = parseInt(calories);
      

    },
    logData: function() {
      return data;
    }
  }

})();


//UI Controller
const UICtrl = (function() {

  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }

  return {
    populateItemList: function(items) {
      let html = '';
      items.forEach(function(item) {
        html += `
          <li class="collection-item" id="item-${item.id}"><b>${item.name}</b> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fal fa-pencil"></i>
            </a>
        </li>`;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    }, 
    getSelectors: function() {
      return UISelectors;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    }
  }
})();



//App Controller
const App = (function(ItemCtrl, UICtrl) {
  
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  const itemAddSubmit = function(e) {
    console.log('added');
    const input = UICtrl.getItemInput();
    
    if(input.name !== '' && input.calories !== '') {
      const newItem = Item.addItem(input.name, input.calories);
    }

    e.preventDefault();
  }

  return {
    init: function() {
      console.log('initializing app');
      const items = ItemCtrl.getItems();

      UICtrl.populateItemList(items);

      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

App.init();