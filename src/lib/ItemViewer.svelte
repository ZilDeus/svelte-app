<script>
  import Slider from "../lib/Slider.svelte"
  import Dropdown from "../lib/Dropdown.svelte";
  import Input from "./Input.svelte";

  export let menuItems = null;

  var calories = 100;
  var protien = 100;
  var amount = 50;

  var Cratio = 2;
  var Pratio = 2;

  var isSelected = false;
  var selectedItem;
  var itemName = "";

  const selectItemCallback = (item) => {
    isSelected = true;
    selectedItem = item;
    itemName = item.Name;
    Cratio = item.Cratio;
    Pratio = item.Pratio;
    amount = item.Unit.length<=3?100:1;
    calories = (amount * Cratio).toFixed(1);
    protien = (amount * Pratio).toFixed(1);
  };
</script>

<Dropdown {menuItems} callback={selectItemCallback} />
{#if isSelected}
  <dev class="block text-center my-5 space-y-5 mx-auto w-80">
    <h2 class="text-indigo-600">{itemName}</h2>
    <Input
      class="hidden"
      label={null}
      name="item-name"
      type="text"
      value={itemName}
    />
    <Input
      class="hidden"
      label={null}
      name="item-calories"
      type="text"
      value={calories}
    />
    <Input
      class="hidden"
      label={null}
      name="item-protien"
      type="text"
      value={protien}
    />
    <Input
      class="hidden"
      label={null}
      name="item-amount"
      type="text"
      value={amount}
    />
    <Slider InitialValue={calories} Name="سعرات" Unit="Kcal" Max=1000 onChange={(e)=>{calories = e; amount = (calories / Cratio).toFixed(1); protien = (amount * Pratio).toFixed(1); }}/>
    <br/>
    <Slider InitialValue={protien} Name="بروتين" Unit="g" Max=1000  onChange={(e)=>{protien = e; amount = (protien / Pratio).toFixed(1); calories = (amount * Cratio).toFixed(1);}}/>
    <br/>
    <Slider InitialValue={amount} Name="كمية" Unit={selectedItem.Unit} Max=1000 onChange={(e)=>{amount = e; calories = (amount * Cratio).toFixed(1); protien = (amount * Pratio).toFixed(1); }}/>
    <br/>
    <slot/>
  </dev>
{/if}
