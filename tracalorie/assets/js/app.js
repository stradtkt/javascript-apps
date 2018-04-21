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
    logData: function() {
      return data;
    }
  }

})();


//UI Controller
const UICtrl = (function() {

  const UISelectors = {
    itemList: '#item-list'
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
    }
  }
})();



//App Controller
const App = (function(ItemCtrl, UICtrl) {
  

  return {
    init: function() {
      console.log('initializing app');
      const items = ItemCtrl.getItems();

      UICtrl.populateItemList(items);
    }
  }
})(ItemCtrl, UICtrl);

App.init();