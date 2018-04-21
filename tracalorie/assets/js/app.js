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
      // {id: 0, name: 'Steak Dinner', calories: 1200},
      // {id: 1, name: 'Eggs', calories: 100},
      // {id: 2, name: 'Cereal', calories: 1000},
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
      newItem = new Item(ID, name, calories);
      data.items.push(newItem);
      return newItem;
      

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
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn'
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
    },
    addListItem: function(item) {
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `<b>${item.name}</b> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fal fa-pencil"></i>
      </a>`;

      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
      document.querySelector(UISelectors.itemList).style.display = 'block';
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    getTotalCalories: function() {
      let total = 0;
      //loop through items and add calories
      data.items.forEach(function(item) {
        total += item.calories;
      });
      //set total calories
      data.totalCalories = total;
      return data.totalCalories;
    }
  }
})();



//App Controller
const App = (function(ItemCtrl, UICtrl) {
  
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    //edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
  }

  const itemAddSubmit = function(e) {
    console.log('added');
    const input = UICtrl.getItemInput();
    
    if(input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem);
      
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
      //clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  const itemUpdateSubmit = function(e) {
    if(e.target.classList.contains('edit-item')) {
      //get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode;
    }
    e.preventDefault();
  }

  return {
    init: function() {
      //clear edit state/set initial state
      UICtrl.clearEditState();
      console.log('initializing app');
      const items = ItemCtrl.getItems();

      if(items.length === 0) {
        UICtrl.hideList();
      } else {
        UICtrl.populateItemList(items);
      }
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

App.init();