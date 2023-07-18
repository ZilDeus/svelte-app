<script>
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
      class="text-black"
      label="calories"
      id="calories"
      name="item-calories"
      type="number"
      bind:value={calories}
      onInput={(e) => {
        if(e.target.value.length === 0) e.target.value = "1"
        calories = parseFloat(e.target.value);
        amount = (calories / Cratio).toFixed(1);
        protien = (amount * Pratio).toFixed(1);
      }}
    />

    <Input
      class="text-black"
      label="protien"
      id="protien"
      name="item-protien"
      type="number"
      bind:value={protien}
      onInput={(e) => {
        if(e.target.value.length === 0) e.target.value = "1"
        protien = parseFloat(e.target.value);
        amount = (protien / Pratio).toFixed(1);
        calories = (amount * Cratio).toFixed(1);
      }}
    />

    <Input
      class="text-black"
      label="amount in ({selectedItem.Unit})"
      id="amount"
      name="item-amount"
      type="number"
      bind:value={amount}
      onInput={(e) => {
        if(e.target.value.length === 0) e.target.value = "1"
        amount = parseFloat(e.target.value);
        calories = (amount * Cratio).toFixed(1);
        protien = (amount * Pratio).toFixed(1);
      }}
    />
    <slot/>
  </dev>
{/if}
